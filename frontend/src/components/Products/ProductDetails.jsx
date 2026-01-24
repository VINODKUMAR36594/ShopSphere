import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import ProductGrid from './ProductGrid'
import { fetchProductDetails, fetchSimilarProducts, clearProductDetails, clearSimilarProducts } from '../../../slices/productSlice'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { productDetails: selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products)
    const [mainImage, setMainImage] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [isButtonDisable, setIsButtonDisable] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id))
            dispatch(fetchSimilarProducts(id))
        }
        return () => {
            dispatch(clearProductDetails())
            dispatch(clearSimilarProducts())
        }
    }, [id, dispatch])

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [selectedProduct])
const handleQuantityChange = (action) => {
    if (action === 'plus') setQuantity((prev) => prev + 1)
    if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1)
}
const handleAddToCart=()=>{
    if(!selectedSize || !selectedColor){
        toast.error("Please select a size and color before adding to cart",{
            duration:1000,
        });
        return;
    }
    setIsButtonDisable(true);
    setTimeout(() => {
        toast.success('Product added to Cart', { duration: 1000 });
        setIsButtonDisable(false);
    }, 500);
}

    if (loading && !selectedProduct) {
        return <div className='p-6 text-center'>Loading product...</div>;
    }
    if (error) {
        return <div className='p-6 text-center text-red-600'>{error}</div>;
    }
    if (!selectedProduct) {
        return <div className='p-6 text-center'>Product not found.</div>;
    }

    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    {/* Left Thumbnails */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {selectedProduct.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-black' : 'border-gray-300'}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainImage || selectedProduct.images?.[0]?.url} alt='Main Product' className='w-full h-auto object-cover rounded-lg' />
                        </div>
                    </div>
                    {/* Mobile Thumbnails */}
                    <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4' />
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
                        {selectedProduct.discountPrice && (
                            <p className='text-lg text-gray-600 mb-1 line-through'>₹{selectedProduct.discountPrice}</p>
                        )}
                        <p className='text-xl text-gray-500 mb-2'>₹{selectedProduct.price}</p>
                        <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProduct.colors?.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-4 border-black' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Size:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProduct.sizes?.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded border ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-6'>
                            <p className='text-gray-700'>Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button onClick={() => handleQuantityChange('minus')} className='px-2 py-1 bg-gray-200 rounded text-lg'>-</button>
                                <span className='text-lg'>{quantity}</span>
                                <button onClick={() => handleQuantityChange('plus')} className='px-2 py-1 bg-gray-200 rounded text-lg'>+</button>
                            </div>
                        </div>
                        <button
                            disabled={isButtonDisable}
                            onClick={handleAddToCart}
                            className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisable ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'}`}
                        >
                            {isButtonDisable ? 'Adding..' : 'ADD TO CART'}
                        </button>
                        <div className='mt-10 text-gray-700'>
                            <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    {selectedProduct.brand && (
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>
                                    )}
                                    {selectedProduct.material && (
                                        <tr>
                                            <td className='py-1'>Material</td>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                    <ProductGrid products={similarProducts || []} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails
