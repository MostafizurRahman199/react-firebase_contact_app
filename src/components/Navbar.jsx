import { CiSearch } from 'react-icons/ci';
import { db } from '../config/firebase';
import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { collection, getDoc } from 'firebase/firestore';

export default function Navbar({setContacts,contacts,isOpen, onOpen}) {


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
   
   <div className="bg-white gap-2 my-2 items-center text-xl font-medium fixed top-0 left-98 w-[350px] z-200 h-24">
     <div className='flex justify-center' >
     <img src="/logos_firebase.svg" alt="logo firebase" />
     <h1>Firebase Contact App</h1>
     </div>
   
    <div className="flex  relative items-center mt-2">
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
    </div>
    </div>
   </>
  );
}
