import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";

export default function ContactCard({ contact }) {
  return (
    <div
      className="flex bg-violet-900 rounded-lg text-white items-center justify-around mt-4 p-1"
      key={contact.id}
    >
      {/* <BiSolidContact className="text-4xl" /> */}
      {
        contact.gender === "male" ? <p className="text-4xl">👦</p> :
        <p  className="text-4xl">👧</p>
      }
      {/* <IoIosContact /> */}
      <div>
        <h1 className="text-xl font-semibold">{contact.name}</h1>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
      </div>
      <div className="flex text-3xl cursor-pointer gap-2">

        {/* <FaRegEdit className="text-white-400 hover:text-green-300 transition duration-200" /> */}

        <p><img src="/public/edit.png" className="size-7" alt="" /></p>

        {/* <MdDelete className="text-white-400 transition duration-200 hover:text-red-400" /> */}

        <p className="text-xl">❌</p>
        
      </div>
    </div>
  );
}
