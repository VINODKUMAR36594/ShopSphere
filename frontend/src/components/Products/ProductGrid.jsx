import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products = [], loading = false, error = null }) => {
  // 1️⃣ loading state
  if (loading) return <p>Loading...</p>

  // 2️⃣ error state
  if (error) return <p>Error: {error}</p>

  // 3️⃣ safety check
  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center">No products available</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        if (!product) return null

        const imageUrl = product.images?.[0]?.url

        return (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                {imageUrl ? (
                  <img
  src={
    product.images?.[0]?.url ||
    `https://picsum.photos/400/600?random=${product._id}`
  }
  alt={product.name}
  className="w-full h-full object-cover rounded-lg"
/>

                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              <h3 className="text-sm mb-2">{product.name}</h3>
              <p className="text-gray-400 font-medium text-sm">
                ${product.price}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductGrid
