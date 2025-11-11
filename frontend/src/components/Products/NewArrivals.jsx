import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const newArrivals = [
    { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: 'https://picsum.photos/500/500?random=1', altText: "Stylish Jacket" }] },
    { _id: "3", name: "Modern Coat", price: 150, images: [{ url: 'https://picsum.photos/500/500?random=3', altText: "Modern Coat" }] },
    { _id: "4", name: "Casual Hoodie", price: 90, images: [{ url: 'https://picsum.photos/500/500?random=4', altText: "Casual Hoodie" }] },
    { _id: "5", name: "Winter Jacket", price: 200, images: [{ url: 'https://picsum.photos/500/500?random=5', altText: "Winter Jacket" }] },
    { _id: "6", name: "Denim Shirt", price: 80, images: [{ url: 'https://picsum.photos/500/500?random=6', altText: "Denim Shirt" }] },
    { _id: "7", name: "Leather Blazer", price: 300, images: [{ url: 'https://picsum.photos/500/500?random=7', altText: "Leather Blazer" }] },
    { _id: "8", name: "Classic Trench", price: 250, images: [{ url: 'https://picsum.photos/500/500?random=8', altText: "Classic Trench" }] },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="p-2 rounded border bg-white shadow hover:bg-gray-100"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="p-2 rounded border bg-white shadow hover:bg-gray-100"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="container mx-auto overflow-x-auto flex space-x-6 pb-4">
        {newArrivals.map((product) => (
          <div key={product._id} className="relative min-w-[250px] rounded-lg overflow-hidden shadow-md">
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[350px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm text-white p-4">
              <Link to={`/product/${product._id}`} className="block hover:underline">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
