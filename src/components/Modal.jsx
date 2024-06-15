import React from 'react'
import { createPortal } from 'react-dom'

export default function Modal({onClose, onOpen, isOpen, children}) {
  return createPortal(
   <>
   
  {
    isOpen && 
   <div className='pt-0 mt-0 '>
    <div className='relative m-auto pt-0 mt-0 mb-2 z-50 max-w-[370px]  min-h-[200px] bg-white rounded-lg p-4 '>
        
        <div className='flex justify-end'>
         <p onClick={()=>onClose()} className='cursor-pointer pt-2'>❌</p>
        </div> 

        {children}
    </div>
    <div className='z-40 absolute top-0 h-screen w-screen backdrop-blur' onClick={()=>onClose()}/>
   
   </div>
  }
   </>, document.getElementById("root-modal")
  )
}
