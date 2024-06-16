import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { MdDelete, MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { collection, getDoc } from 'firebase/firestore';
import { IoIosContact } from "react-icons/io";
import { db } from "./config/firebase";
import { FaRegEdit } from "react-icons/fa";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isOpen, setOpen, onOpen, onClose } = useDisclouse();
  const [contacts, setContacts] = useState([]);
  const [isUpdate , setUpdate] = useState(false);
  console.log("is open app ", isOpen);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = await collection(db, "react_contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactList);
          return contactList;
        });
      } catch (error) {}
    };

    getContacts();
  }, []);

  const filterContact = async (e) => {
    const value = e.target.value;

    const contactsRef = await collection(db, "react_contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const searchContact = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(searchContact);
      return searchContact;
    });
  };

  return (
    <>
    
      <div className="max-w-[370px] mx-auto px-4 py-24">
        <Navbar setContacts={setContacts} contacts={contacts} isOpen={isOpen} onOpen={onOpen}></Navbar>
        {/* <div className="flex  relative items-center mt-24">
          <CiSearch className="text-violet-700 text-3xl font-extrabold absolute ml-1" />
          <input
            onChange={filterContact}
            placeholder="Search Contact"
            type="text"
            className="border border-violet-700 rounded-md h-10 bg-transparent flex-grow text-violet-700 text-xl pl-9  placeholder-white  focus:border-white focus:ring-2 focus:ring-violet-700 focus:outline-none"
          />
          <div className="text-5xl text-white pl-2">
            <p
              className="size-9 cursor-pointer  hover:translate-y-1  hover:transition hover:duration-300 transform-gpu "
              onClick={() => onOpen()}
            >
              <img src="/public/add-user (1).png" alt="add user logo" />
            </p>
          </div>
        </div> */}

        {(isOpen === false && isUpdate ===false) ? (
          <div>
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                setContacts={setContacts}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                setOpen={setOpen}
                setUpdate={setUpdate}
                isUpdate={isUpdate}
              ></ContactCard>
            ))}
          </div>
        ) : (
          <AddAndUpdateContact
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            setOpen={setOpen}
            isUpdate={isUpdate}
          ></AddAndUpdateContact>
        )}
      </div>
      {/* <ToastContainer position="bottom-center" /> */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
