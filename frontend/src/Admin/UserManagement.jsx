import React from 'react'
import {useState} from 'react'
const UserManagement = () => {
    const users=[
        {
            _id:123,
            name:"Vinod Kumar",
            email:"vinod@gmail.com",
            role:"admin",
        },
         {
            _id:45,
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
    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormData({
            name:"",
            email:"",
            password:"",
            role:""
        })
        // console.log(formData)
    }
    const handleRoleChange=(userId,newRole)=>{
        console.log({id:userId ,role:newRole});
        
    }
    const handleDeleteUser=(userId)=>{
        if(window.confirm("Are you sure want to delete this user?")){
            console.log("deleting user with id",userId);
        }

    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className="text-2xl font-bold mb-6">
            User Management
        </h2>
        {/* New User form */}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4'>Add new User</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange}
                    className='w-full p-2 border rounded'
                    required />
                </div>
                 <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange}
                    className='w-full p-2 border rounded'
                    required />
                </div>
                 <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">Password</label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange}
                    className='w-full p-2 border rounded'
                    required />
                </div>
                 <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">Role</label>
                    <select name="role" value={formData.role} id="" onChange={handleChange}
                    className='w-full p-2 border rounded'>
                        <option value="customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Add User</button>
            </form>
        </div>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th  className='py-3 px-4 '>Name</th>
                        <th  className='py-3 px-4 '>Email</th>
                        <th  className='py-3 px-4 '>Role</th>
                        <th  className='py-3 px-4 '>Actions</th>


                    </tr>

                </thead>
                <tbody>
                    {users.map((user)=>{
                        return(<tr key={user._id} className='border-b hover:bg-gray-50'>
                            <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
                            <td className='p-4 '>{user.email}</td>
                             <td className='p-4 '>
                                <select name="role" value={user.role}  onChange={(e)=> handleRoleChange(user._id,e.target.value)} className='p-2 border rounded'>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                             </td>
                             <td className='p-4'>
                                <button onClick={()=> handleDeleteUser(user._id)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Delete</button>
                             </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserManagement
