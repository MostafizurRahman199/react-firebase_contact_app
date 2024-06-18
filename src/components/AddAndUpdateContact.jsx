import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const constactSchema = Yup.object().shape({

  name:Yup.string().required("Name is required"),
  email:Yup.string().email("Invalid email").required("Email is required"),
  phone:Yup.string().required("Phone is required"),
  gender:Yup.string().required("Gender is required"),

})


export default function AddAndUpdateContact({
  onClose,
  onOpen,
  isOpen,
  children,
  setOpen,
  isUpdate,
  
  
  contact = {}, // Provide a default empty object

}) {

  console.log(isOpen);
  // console.log(isFlag);
  const addContact = async (contact) => {
    try {
      const dataRef = collection(db, "react_contacts");
      await addDoc(dataRef, contact);
      setOpen(false);
     
      toast.success("Contact Added Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateContact = async (contact, id) => {
    try {
      const dataRef = doc(db, "react_contacts", id);
      await updateDoc(dataRef, contact);
      setOpen(false);
    
      toast.success("Contact updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Modal onClose={onClose} onOpen={onOpen} isOpen={isOpen}  >
        <Formik
        validationSchema={constactSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name ,
                  phone: contact.phone ,
                  email: contact.email ,
                  gender: contact.gender ,
                }
              : {
                  name: "",
                  phone: "",
                  email: "",
                  gender: "",
                }
          }
          onSubmit={(values) => {
            isUpdate
              ? updateContact(values, contact.id)
              : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border rounded-lg p-2 text-violet-900"></Field>
              <div className="text-red-500 text-sm">
                <ErrorMessage name="name"></ErrorMessage>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <Field name="phone" className="h-10 border rounded-lg p-2  text-violet-900"></Field>
              <div className="text-red-500 text-sm">
                <ErrorMessage name="phone"></ErrorMessage>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border rounded-lg p-2  text-violet-900"></Field>
              <div className="text-red-500 text-sm">
                <ErrorMessage name="email"></ErrorMessage>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender">Gender</label>
              <Field name="gender" className="h-10 border rounded-lg p-2  text-violet-900"></Field>
              <div className="text-red-500 text-sm">
                <ErrorMessage name="gender"></ErrorMessage>
              </div>
            </div>

            <button
              className="text-blue-900 px-4 py-2 rounded-md bg-white max-w-[100%] m-auto"
              type="submit"
            >
              {isUpdate ? "Update Contact" : "Add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
