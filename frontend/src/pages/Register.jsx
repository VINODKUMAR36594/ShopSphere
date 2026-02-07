import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import registerImage from "../assets/register.webp";
import { registerUser, loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // 🔁 Redirect path
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // 🌊 Redirect AFTER login state is fully ready
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!user || !token) return;

    const redirectPath = isCheckoutRedirect ? "/checkout" : "/";

    if (cart?.products?.length > 0 && guestId) {
      dispatch(mergeCart({ guestId }))
        .unwrap()
        .then(() => {
          navigate(redirectPath);
        })
        .catch(() => {
          navigate(redirectPath);
        });
    } else {
      navigate(redirectPath);
    }
  }, [user, dispatch, navigate, cart, guestId, isCheckoutRedirect]);

  // 📝 Register → Login (WAIT properly)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      await dispatch(loginUser({ email, password })).unwrap();
      // ❌ no navigate here — useEffect handles it
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-semibold">Rabbit</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">
            Create your account
          </h2>

          <p className="text-center mb-6 text-gray-600">
            Join us and start shopping
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading? "Loading...": "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <img
          src={registerImage}
          alt="Register"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;