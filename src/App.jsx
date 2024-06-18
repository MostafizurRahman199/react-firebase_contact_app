import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { MdDelete, MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isOpen, setOpen, onOpen, onClose } = useDisclouse();
  const [contacts, setContacts] = useState([]);
  const [isFlag, setFlag] = useState(false);
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
      } catch (error) {
        console.error(error);
      }
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
       

        {isOpen== false ? (
          <div>
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                setContacts={setContacts}
                onOpen={onOpen}
                onClose={onClose}
                setOpen={setOpen}
                setFlag={setFlag}
                isFlag={isFlag}
              />
            ))}
          </div>
        ) : (
          <AddAndUpdateContact
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            setOpen={setOpen}
            setFlag={setFlag}
            isFlag={isFlag}
            
          />
        )}
      </div>
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
