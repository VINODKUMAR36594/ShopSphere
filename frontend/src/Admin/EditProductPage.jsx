import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  fetchProductDetails,
  updateProduct
} from '../redux/slices/adminProductSlice'

const EditProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.adminProducts
  )

  const [productsData, setProductsData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: []
  })

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (selectedProduct) {
      setProductsData(selectedProduct)
    }
  }, [selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductsData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ✅ FIXED: async + FormData + syntax
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      setUploading(true)

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setProductsData(prevData => ({
        ...prevData,
        images: [
          ...prevData.images,
          { url: data.imageUrl, altText: "" }
        ],
      }))

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ id, productsData }))
    navigate("/admin/products")
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading product</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productsData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productsData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}

          <div className="flex gap-4 mt-4">
            {productsData.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt="Product"
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
            ))}
          </div>
        </div>

        <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
