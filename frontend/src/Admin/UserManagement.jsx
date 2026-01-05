import React from 'react'
import {useState} from 'react'
const UserManagement = () => {
    const users=[
        {
            name:"Vinod Kumar",
            email:"vinod@gmail.com",
            role:"admin",
        },

    ]
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    })
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className="text-2xl font-bold mb-6">
            User Management
        </h2>
        {/* New User form */}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4'>Add new User</h3>
        </div>
      
    </div>
  )
}

export default UserManagement
