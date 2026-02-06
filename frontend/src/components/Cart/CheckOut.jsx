import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton'


import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { createCheckout } from '../../redux/slices/checkoutSlice'

const CheckOut = () => {

  const navigate = useNavigate()

  
  const dispatch = useDispatch()

  const { cart, loading, error } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  })

  const [checkOutId, setCheckOutId] = useState(null)

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      )

      if (response.status === 200) {
        await handleFinalizeCheckout(checkOutId)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 
  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      )

      if (response.status === 200) {
        // ❌ spelling fix
        navigate("/order-confirmation")
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <p>Loading..</p>
  if (error) return <p>Error: {error}</p>

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is empty</p> // ❌ typo fix
  }

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/")
    }
  }, [cart, navigate])

  const handleCreateCheckOut = async (e) => {
    e.preventDefault()

    // ❌ cart.length → cart.products.length
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice
        })
      )

      if (res.payload && res.payload._id) {
        setCheckOutId(res.payload._id)
      }
    }
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>

      {/* LEFT SECTION — FORM (UNCHANGED) */}
      <div className='bg-white rounded-lg p-6'>
        <h2 className='text-2xl uppercase mb-6'>CheckOut</h2>

        <form onSubmit={handleCreateCheckOut}>
  <h3 className="text-lg mb-4">Contact Details</h3>

  <div className="mb-4">
    <label className="block text-gray-700">Email</label>
    <input
      type="email"
      value={user?.email || ""}
      disabled
      className="w-full p-2 border rounded"
    />
  </div>

  <h3 className="text-lg mb-4">Delivery</h3>

  <div className="mb-4 grid grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700">First Name</label>
      <input
        type="text"
        required
        className="w-full p-2 border rounded"
        value={shippingAddress.firstName}
        onChange={(e) =>
          setShippingAddress({ ...shippingAddress, firstName: e.target.value })
        }
      />
    </div>

    <div>
      <label className="block text-gray-700">Last Name</label>
      <input
        type="text"
        required
        className="w-full p-2 border rounded"
        value={shippingAddress.lastName}
        onChange={(e) =>
          setShippingAddress({ ...shippingAddress, lastName: e.target.value })
        }
      />
    </div>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Address</label>
    <input
      type="text"
      required
      className="w-full p-2 border rounded"
      value={shippingAddress.address}
      onChange={(e) =>
        setShippingAddress({ ...shippingAddress, address: e.target.value })
      }
    />
  </div>

  <div className="mb-4 grid grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700">City</label>
      <input
        type="text"
        required
        className="w-full p-2 border rounded"
        value={shippingAddress.city}
        onChange={(e) =>
          setShippingAddress({ ...shippingAddress, city: e.target.value })
        }
      />
    </div>

    <div>
      <label className="block text-gray-700">Postal Code</label>
      <input
        type="text"
        required
        className="w-full p-2 border rounded"
        value={shippingAddress.postalCode}
        onChange={(e) =>
          setShippingAddress({
            ...shippingAddress,
            postalCode: e.target.value,
          })
        }
      />
    </div>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Country</label>
    <input
      type="text"
      required
      className="w-full p-2 border rounded"
      value={shippingAddress.country}
      onChange={(e) =>
        setShippingAddress({ ...shippingAddress, country: e.target.value })
      }
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Phone Number</label>
    <input
      type="text"
      required
      className="w-full p-2 border rounded"
      value={shippingAddress.phone}
      onChange={(e) =>
        setShippingAddress({ ...shippingAddress, phone: e.target.value })
      }
    />
  </div>

  <div className="mt-6">
    {!checkOutId ? (
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded"
      >
        Continue to Payment
      </button>
    ) : (
      <div>
        <h3 className="text-lg mb-4">Pay with Paypal</h3>
        <PaypalButton
          amount={cart.totalPrice}
          onSuccess={handlePaymentSuccess}
          onError={() => alert("Payment Failed. Try Again.")}
        />
      </div>
    )}
  </div>
</form>

      </div>

      {/* RIGHT SECTION — SUMMARY */}
      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>

        {cart.products.map((product, index) => (
          <div key={index} className='flex items-start justify-between py-2 border-b'>
            <img
              src={product.image}
              alt={product.name}
              className='w-20 h-24 object-cover mr-4'
            />
            <div>
              <h3>{product.name}</h3>
              <p>Size: {product.size}</p>
              <p>Color: {product.color}</p>
              <p>${product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}

        <div className='flex justify-between mt-4'>
          <p>Total</p>
          <p>${cart.totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
