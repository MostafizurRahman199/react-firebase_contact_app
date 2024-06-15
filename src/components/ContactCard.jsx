import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

export default function ContactCard({contact}) {
  return (
    <div className="flex bg-violet-900 rounded-lg text-white items-center justify-around mt-4 p-1" key={contact.id}>
    <IoIosContact  className="text-4xl"/>
    <div>
      <h1 className="text-xl font-semibold">{contact.name}</h1>
      <p>{contact.email}</p>
    </div>
    <div className="flex text-3xl cursor-pointer">
    <FaRegEdit className="text-green-400" />
    <MdDelete className="text-red-700" />
    </div>
  </div>
  )
}
