import { Link } from "react-router-dom";

const BestSellerCard = ({ product }) => {
  if (!product) return null;

  const imageUrl =
    product.images?.[0]?.url ||
    `https://picsum.photos/400/500?random=${product._id}`;

  return (
    <div className="flex justify-center">
      <Link to={`/product/${product._id}`} className="block">
        <div className="bg-white p-4 rounded-lg shadow max-w-sm">
          <div className="w-full h-80 mb-4">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 mt-1">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default BestSellerCard;
