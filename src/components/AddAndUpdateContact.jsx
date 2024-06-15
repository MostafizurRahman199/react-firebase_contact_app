import React from "react";
import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function AddAndUpdateContact({
  onClose,
  onOpen,
  isOpen,
  children,
  setOpen,
  isUpdate,
  contact,
}) {
  const addContact = async (contact) => {
    try {
      const dataRef = collection(db, "react_contacts");
      await addDoc(dataRef, contact);
      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const dataRef = doc(db, "react_contacts", id);
      await updateDoc(dataRef, contact);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
        <Formik
          initialValues={
            isUpdate === 1
              ? {
                  name: contact.name,
                  phone: contact.phone,
                  email: contact.email,
                  gender: contact.gender,
                }
              : {
                  name: "",
                  phone: "",
                  email: "",
                  gender: "",
                }
          }
          onSubmit={(values) => {
            isUpdate === 1
              ? updateContact(values, contact.id)
              : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border rounded-lg p-2"></Field>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <Field
                name="phone"
                className="h-10 border rounded-lg p-2"
              ></Field>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className="h-10 border rounded-lg p-2"
              ></Field>
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender">Gender</label>
              <Field
                name="gender"
                className="h-10 border rounded-lg p-2"
              ></Field>
            </div>

            <button
              className="bg-blue-900 px-4 py-2 rounded-md text-white max-w-[100%] m-auto"
              type="submit"
            >
              {isUpdate === 1 ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
