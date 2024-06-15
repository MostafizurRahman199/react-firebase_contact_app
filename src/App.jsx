import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoIosPersonAdd } from "react-icons/io";
import { MdDelete, MdDeleteOutline, MdPersonAddAlt } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { collection, getDocs } from "firebase/firestore";
// import { collection, getDoc } from 'firebase/firestore';
import { IoIosContact } from "react-icons/io";
import { db } from "./config/firebase";
import { FaRegEdit } from "react-icons/fa";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

function App() {

  const [isOpen, setOpen] = useState(false);
  
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = await collection(db, "react_contacts");

        const contactsSnapshot = await getDocs(contactsRef);

        const contactList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setContacts(contactList);
      } catch (error) {}
    };

    getContacts();
  }, []);


  const onOpen = ()=>{
    setOpen(true);
  }

  const onClose = ()=>{
    setOpen(false)
  }

  return (
   <>
    <div className="max-w-[370px] mx-auto px-4 ">
      <Navbar></Navbar>
      <div className="flex  relative items-center">
        <CiSearch className="text-white text-3xl font-semibold absolute ml-1" />
        <input placeholder="Search Contact"
          type="text"
          className="border border-white rounded-md h-10 bg-transparent flex-grow text-white pl-9"
        />
        <div className="text-5xl text-white pl-2 ">
          {/* <IoIosAddCircleOutline /> */}
          <p className="size-9 cursor-pointer" onClick={()=>onOpen()}><img src="/public/add-user (1).png" alt="" /></p>
        </div>
      </div>

    {
      isOpen === false ?   <div>
      {contacts.map((contact) => (
     <ContactCard key={contact.id} contact={contact}></ContactCard>
      ))}
    </div>
    : <AddAndUpdateContact onClose={onClose} onOpen={onOpen} isOpen={isOpen}></AddAndUpdateContact>
    }
    </div>
  
  
   </>
  );
}

export default App;
