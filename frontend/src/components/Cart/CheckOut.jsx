import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const cart={
    products:[
        {
            name:"Stylish Jacket",
            size:"M",
            color:"Black",
            price:120,
            image:"https://picsum.photos/150?random=37",
        },
        {
            name:" Jacket",
            size:"M",
            color:"Blue",
            price:122,
            image:"https://picsum.photos/150?random=73"
        }

    ],
    totalPrice:242,
};
const CheckOut = () => {
    const navigate=useNavigate();
    const [shippingAddress,setShippingAddress]=useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalCode:"",
        couuntry:"",
        phone:""
    });
  return (

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
        {/* Left Section */}
        <div className='bg-white rounded-lg p-6 '>
            <h2 className='text-2xl uppercase mb-6'>CheckOut</h2>
            <form >
                <h3 className='text-lg mb-4'>Contact Details</h3>
                <div className='mb-4'>
                    <label className="block text-gray-700">Email</label>
                    <input type="email"  value='user@example.com' className='w-full p-2 border rounded'disabled />
                </div>
                <h3 className='text-lg mb-4'>Delivery</h3>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div >
                        <label className="block text-gray-700 ">First Name</label>
                        <input type="text"  className='w-full p-2 border rounded' required value={shippingAddress.firstName} onChange={(e)=>{
                            setShippingAddress({...shippingAddress,firstName:e.target.value,})
                        }}/>
                    </div>
                </div>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div >
                        <label className="block text-gray-700 ">Last Name</label>
                        <input type="text"  className='w-full p-2 border rounded' required value={shippingAddress.lastName} onChange={(e)=>{
                            setShippingAddress({...shippingAddress,lastName:e.target.value,})
                        }}/>
                    </div>
                </div>
                <div></div>
            </form>
        </div>
      
    </div>
  )
}

export default CheckOut
