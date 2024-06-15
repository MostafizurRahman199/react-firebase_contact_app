import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddAndUpdateContact from "./AddAndUpdateContact";

export default function ContactCard({ contact }) {

  const { isOpen, setOpen, onOpen, onClose } = useDisclouse();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "react_contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <>
   
   {
    isOpen === false ?  <div
    className="flex bg-violet-900 rounded-lg text-white items-center justify-around mt-4 p-1 hover:translate-x-2 trasition duration-75 hover:bg-violet-800"
    key={contact.id}
  >
    {contact.gender === "male" ? (
      <p className="text-4xl">👦</p>
    ) : (
      <p className="text-4xl">👧</p>
    )}

    <div>
      <h1 className="text-xl font-semibold">{contact.name}</h1>
      <p>{contact.phone}</p>
      <p>{contact.email}</p>
    </div>
    <div className="flex text-3xl cursor-pointer gap-2">
      <p onClick={() => onOpen()}>
        <img src="/public/edit.png" className="size-7" alt="" />
      </p>

      <p className="text-xl" onClick={() => deleteContact(contact.id)}>
        ❌
      </p>
    </div>
  </div>
:
    <AddAndUpdateContact onClose={onClose} onOpen={onOpen} isOpen={isOpen} setOpen={setOpen} isUpdate={1} contact={contact}></AddAndUpdateContact>
   }
   </>
  );
}
