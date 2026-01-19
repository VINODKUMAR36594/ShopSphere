import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch new arrivals");
        }

        const data = await response.json();
        setNewArrivals(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-7.5 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded border bg-white shadow hover:bg-gray-100"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded border bg-white shadow hover:bg-gray-100"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Products */}
      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-auto flex space-x-6 pb-4"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="relative min-w-62.5 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.name}
              className="w-full h-87.5 object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <Link to={`/product/${product._id}`} className="hover:underline">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
