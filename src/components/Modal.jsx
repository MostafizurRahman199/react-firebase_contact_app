import React from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ onClose, onOpen, isOpen, children,}) {
    console.log(isOpen);

const handleClose =()=>{
    onClose()
}

  return createPortal(
   <>
   
  {
    isOpen && 
   <div className='z-40 absolute top-0 h-screen w-screen backdrop-blur place-items-center mt-28'>
    <div className='shadow-lg relative border border-black m-auto pt-0 mt-0 mb-2 z-50 max-w-[370px]  min-h-[200px] bg-violet-900 rounded-lg p-4 text-white'>
        
        <div className='flex justify-end'>
         <p onClick={()=>handleClose()} className='cursor-pointer pt-2'>❌</p>
        </div> 

        {children}
    </div>
   
   </div>
  }
   </>, document.getElementById("root-modal")
  )
}
