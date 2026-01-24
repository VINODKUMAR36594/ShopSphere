import React from 'react'
import {Link} from 'react-router-dom'
const ProductGrid = ({ products = [], loading, error }) => {
    if (loading) return <p className='text-center p-4'>Loading...</p>
    if (error) return <p className='text-center p-4 text-red-600'>Error: {error}</p>
    if (!products?.length) return <p className='text-center p-4'>No products found.</p>

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products.map((product, index) => (
                <Link key={product._id || index} to={`/product/${product._id}`} className='block'>
                    <div className='bg-white p-4 rounded-lg'>
                        <div className='w-full h-96 mb-4'>
                            <img
                                src={product.images?.[0]?.url || '/placeholder.png'}
                                alt={product.images?.[0]?.altText || product.name}
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h3 className='text-sm mb-2'>{product.name}</h3>
                        <p className='text-gray-400 font-medium text-sm tracking-tighter'>₹{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid