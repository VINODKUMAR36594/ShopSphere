import React from 'react'
import {IoMdClose} from "react-icons/io"
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const CartDrawer = ({drawerOpen,toggleCartDrawer}) => {
  // const [drawerOpen,setDrawerOpen]=useState(true);
  // const toggleCartDrawer=()=>{
  //   setDrawerOpen(!drawerOpen);
  // }
  const navigate=useNavigate();
  const {user,guestId}=useSelector((state)=>state.auth)
  const {cart} =useSelector((state)=> state.cart)
  const userId=user? user._id:null;
  const handleCheckOut=()=>{
    if(!user){

      navigate("/login?redirect=checkout");
    }
    else{
      navigate("/checkout")
    }

  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0 ":"translate-x-full"}`}>
      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer}>
          <IoMdClose className='h-6 w-6 text-gray-600 '/>
        </button>
      </div>
      {/* Cart contenst area */}
      <div className='flex-grow p-4 overflow-y-auto '>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        {cart && cart?.products?.length >0 ?( <CartContents cart={cart} userId={userId} guestId={guestId}/>):(<p>Your Cart is Empty...</p>)}
       
      </div>
     
      <div className='p-4 bg-white sticky bottom-0 '>
       { cart && cart?.products?.length>0 && (<><button onClick={handleCheckOut} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>CheckOut</button>
        <p className='text-sm tracking-tighter text-gray-500 mt-2'>
          Shipping ,taxes and discount codes cacluated at checkout.
        </p></>)}
        
      </div>
    </div>
  )
}

export default CartDrawer
