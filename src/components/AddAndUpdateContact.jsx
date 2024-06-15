import React from 'react'
import Modal from './Modal'
import { Field, Form, Formik } from 'formik'

export default function AddAndUpdateContact({onClose, onOpen, isOpen, children}) {
  return (
    <div>
        <Modal onClose={onClose} onOpen={onOpen} isOpen={isOpen} >
           <Formik>
           <Form className='flex flex-col gap-4'>

              <div className='flex flex-col'>
              <label htmlFor='name'>Name</label>
              <Field name="name" className="h-10 border rounded-lg p-2"></Field>
              </div>

              <div className='flex flex-col'>
              <label htmlFor='phone'>Phone</label>
              <Field name="phone" className="h-10 border rounded-lg p-2"></Field>
              </div>

              <div className='flex flex-col'>
              <label htmlFor='email'>Email</label>
              <Field name="email" className="h-10 border rounded-lg p-2"></Field>
              </div>


              <div className='flex flex-col'>
              <label htmlFor='gender'>Gender</label>
              <Field name="gender" className="h-10 border rounded-lg p-2" ></Field>
              </div>

              <button className='bg-blue-900 px-4 py-2 rounded-md text-white max-w-[100%] m-auto'>Add Contact</button>
            </Form>
           </Formik>
        </Modal>
    </div>
  )
}
