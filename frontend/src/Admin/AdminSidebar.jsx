import React from 'react'
import {Link,NavLink,useNavigate} from 'react-router-dom'
import {FaUser,FaBoxOpen, FaClipboardList, FaStore} from 'react-icons/fa6'
import {FaSignOutAlt} from 'react-icons/fa'
const AdminSidebar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    navigate('/')
  }
  return (
    <div className='p-6 '>
      <div className='mb-6'>
        <Link to='/admin' className='text-2xl font-medium '>ShopSphere</Link>
      </div>
      <h2 className='text-xl font-medium mb-6 text-center '>Admin DashBoard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to='/admin/users' className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"bg-gray-300 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaUser/>
        <span>Users</span>
        </NavLink>
        <NavLink to='/admin/products' className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"bg-gray-300 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaBoxOpen/>
        <span>products</span>
        </NavLink>
        <NavLink to='/admin/orders' className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"bg-gray-300 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaClipboardList/>
        <span>
          orders</span>
        </NavLink>
        <NavLink to='/' className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"bg-gray-300 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "} >
        <FaStore/>
        <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout} className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2'>
          <FaSignOutAlt/>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
