

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CreateProduct from '../components/products/CreateProduct';
import Users from '../components/users/Users';

const SideBar = () => {

  useEffect(() => {
    setOpen(true)
  }, [])
  
  
   const [open, setOpen] = useState(false)

   const [showCreateProduct, setShowCreateProduct] = useState(false)
   const [showUsers, setShowUsers] = useState(false)

   const handleProduct = () => {
      setShowCreateProduct(true)
      setShowUsers(false)
      setOpen(false)
   };

   const handleUsers = () => {
      setShowUsers(true)
      setShowCreateProduct(false)
      setOpen(false)
   };
   

   return (
      <>
     <div className='bg-white py-3 px-0 rounded fixed top-0 left-0 right-0 shadow-md ml-40 mt-4 w-20 h-12'>
       <button className='' onClick={() => setOpen(true)}> SideBar
        
       </button>
 
       <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>
 
       <div className={`${open ? "w-80" : "w-0"} bg-cyan-600 min-h-screen fixed top-0 left-0 transition-all duration-300`}>
         <div className={`${!open && "hidden"} pt-3`}>
           <button className='ml-4 text-white mb-14' onClick={() => setOpen(false)}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
           <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'> <button onClick={handleProduct} > Create Product
            </button> </div>
           <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'><button onClick={handleUsers} > Show Users
            </button></div>
           <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Link 3</div>
           <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Link 4</div>
           <div className='text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2'>Link 5</div>
         </div>
       </div>
     </div>

<div className="p-4 sm:ml-64">
   <div className="p-4">
      
      {
         showCreateProduct ? <CreateProduct/> : ''
        }
     
        {
          showUsers ? <Users/> : ''
        }
      
   </div>
</div>

</>
  )
}

export default SideBar