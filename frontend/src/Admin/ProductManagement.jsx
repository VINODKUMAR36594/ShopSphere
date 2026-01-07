import React from 'react'
import {Link} from 'react-router-dom'
const  ProductManagement = () => {
    const products=[
        {
            _id:123,
            name:"Shirt",
            price:123,
            sku:"12345677",
        },
    ];
    const handleDelete=(id)=>{
        if(window.confirm("Are You sure you want to delete  the Products?")){
            console.log("Delete Product with if:",id);
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>
            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Price</th>
                            <th className='py-3 px-4'>sku</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length>0? (products.map((product)=>
                            <tr key={products._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                <td className='p-4 font-small text-gray-900 whitespace-nowrap'>
                                    {product.name}
                                </td>
                                <td className='p-4'>${product.price}</td>
                                <td className='p-4'>{product.sku}</td>
                                <td className='p-4'>
                                    <Link to={`/admin/products/${product._id}/edit`}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 ">Edit</Link>
                                    <button onClick={()=>handleDelete(product._id)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 '>Delete</button>
                                </td>
                            </tr>
                        )):(
                            <tr>
                                <td colSpan={4} className='p-4 text-center text-gray-500'>No  Products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </h2>
      
    </div>
  )
}

export default  ProductManagement
