import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

import { useParams } from "react-router-dom";
import { fetchProductsDetails, fetchSimilarProducts } from "../../redux/slices/productSlice";

const ProductDetails = ({productId}) => {
  // const {id}=useParams()

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, SetSelectedSize] = useState("");
  const [selectedColor, SetSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisabled] = useState(false);
  // const 

  const dispatch = useDispatch();
  const { id } = useParams();

  // ✅ FIX: get product from redux store
  const { selectedProduct, loading, error,similarProducts } = useSelector(
    (state) => state.products
  );
  const {userId,guestId}=useSelector((state)=>state.auth)

  // ✅ FIX: fetch product by id (PERMANENT)
//  const { id: routeId } = useParams();
const finalId = productId || id;

useEffect(() => {
  if (finalId) {
    dispatch(fetchProductsDetails(finalId));
    dispatch(fetchSimilarProducts({ id: finalId }));
  }
}, [dispatch, finalId]);

  // ✅ FIX: update image after product loads
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);
  // const productFEcthId=productId || id;

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    // ✅ FIX: real add to cart dispatch
    dispatch(
      addToCart({
        productId: selectedProduct._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
      })
    ).then(()=>{
      toast.success("Product added toc cart",{
        duration:1000,
      })
    }).finally(()=>{
      setIsButtonDisabled(false)
    })
  }

   
  

  // ✅ FIX: safety checks
  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!selectedProduct) return null;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {selectedProduct.orginalPrice && (
              <p className="line-through text-gray-500">
                {selectedProduct.orginalPrice}
              </p>
            )}

            <p className="text-xl mb-2">${selectedProduct.price}</p>
            <p className="text-gray-600 mb-4">
              {selectedProduct.description}
            </p>

            {/* Colors */}
            <div className="mb-4">
              <p>Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => SetSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p>Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => SetSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p>Quantity:</p>
              <div className="flex items-center gap-4">
                <button onClick={() => handleQuantityChange("minus")}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("plus")}>+</button>
              </div>
            </div>

            <button
              disabled={isButtonDisable}
              onClick={handleAddToCart}
              className={`w-full py-2 bg-black text-white rounded ${
                isButtonDisable ? "opacity-50" : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisable ? "Adding..." : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
