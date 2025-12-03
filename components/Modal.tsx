'use client'
import React, { Fragment, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}
const Modal = ({productId}: Props) => {
     let [isOpen, setIsOpen] = useState(false)
     const [isSubmitting, setIsSubmitting] = useState(false)
     const [email, setEmail] = useState('')


     const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault()
         setIsSubmitting(true)
         //add userEmail to product's users array in database
         await addUserEmailToProduct(email, productId)
         setIsSubmitting(false)
         setEmail('')
         closeModal()
     }

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

  return (
    <>
    <button onClick={openModal} type='button' className='px-24 py-4 bg-black font-semibold text-2xl text-white rounded-xl hover:bg-gray-800 transition-colors flex'>
        Track
    </button>
   <Transition show={isOpen} appear as={Fragment}>
  <Dialog as='div' onClose={closeModal} className="relative z-10">
    
    {/* Backdrop */}
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60" />
    </Transition.Child>

    {/* Dialog positioning */}
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        
        {/* Dialog panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            {/* Your dialog content goes here */}
            <Dialog.Title className="text-lg font-medium">
              Modal Title
            </Dialog.Title>
            
            <div className="mt-2">
              <div className='flex justify-between'>
                 <div className='p-3 border border-gray-200 rounded-10'>
                    <Image src='/share.png' alt={'df'} width={20} height={20}/>
                 </div>
                 <Image 
                  src='/close-icon.png' 
                  alt={'df'} 
                  height={10}
                  width={10}
                   onClick={closeModal} 
                   className='cursor-pointer'
                   />
              </div>
              <h4 className='text-secondary text-lg leading-[24px] font-semibold mt-4' >Stay updated with the pricing in your inbox</h4>
            <p className='text-sm text-gray-600 mt-2'> Never miss the bargain again with our timely alerts!</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col mt-5'>
                <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email Address</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your email'
                    required
                />
                <button 
                    type='submit' 
                    className='mt-4 px-4 py-2 bg-black/90 text-white rounded-md hover:bg-gray-700 transition-colors'
                >
                    {isSubmitting ? 'Tracking...' : 'Track'}
                </button>
            </form>
          </Dialog.Panel>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
        <div>
            test
        </div>
        </Transition.Child>


        
      </div>
    </div>
    
  </Dialog>
</Transition>
    
    </>
  )
}

export default Modal