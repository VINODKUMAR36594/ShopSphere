import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // 🛡️ Protect route if cart is empty
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // 🧾 Create checkout
  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      ).unwrap();

      setCheckoutId(res._id);
    } catch (err) {
      console.error("Checkout creation failed", err);
    }
  };

  // 💳 Payment success
  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          checkoutId,
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  // 📦 Finalize checkout → create order
  const handleFinalizeCheckout = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (err) {
      console.error("Finalize checkout failed", err);
    }
  };

  const handlePaymentError = (err) => {
    console.error("Payment failed:", err);
    alert("Payment failed. Please try again.");
  };

  // 🌀 UI States
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Your cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full p-2 border rounded mb-6"
            disabled
          />

          <h3 className="text-lg mb-4">Delivery</h3>

          {[
            ["First Name", "firstName"],
            ["Last Name", "lastName"],
            ["Address", "address"],
            ["City", "city"],
            ["Postal Code", "postalCode"],
            ["Country", "country"],
            ["Phone", "phone"],
          ].map(([label, key]) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700">{label}</label>
              <input
                type="text"
                required
                value={shippingAddress[key]}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    [key]: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

          {!checkoutId ? (
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded mt-4"
            >
              Continue to Payment
            </button>
          ) : (
            <>
              <h3 className="text-lg mt-6 mb-4">Pay with PayPal</h3>
              <PayPalButton
                amount={cart.totalPrice}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </>
          )}
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.products.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-start border-b py-4"
          >
            <div className="flex">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4"
              />
              <div>
                <h4>{product.name}</h4>
                <p className="text-gray-500">Size: {product.size}</p>
                <p className="text-gray-500">Color: {product.color}</p>
              </div>
            </div>
            <p>${product.price}</p>
          </div>
        ))}

        <div className="flex justify-between mt-4 text-lg">
          <p>Total</p>
          <p>${cart.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;