import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid'
const similarProduct=[
    {
        _id:1,
        name:"product 1",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=1"
        }],


    },
    {
        _id:2,
        name:"product 2",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=2"
        }],


    },
    {
        _id:3,
        name:"product 3",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=3"
        }],


    },
    {
        _id:4,
        name:"product 4",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=4"
        }],


    },
]
const selectedProduct={
    name:"Stylish Jacket",
    price:120,
    orginalPrice:150,
    description:"this is a stylish jacket perfcet for any ocasion",
    brand:"FashionBrand",
    material:"Leather",
    sizes:["S","M","L","XL"],
    colors:["red","black"],
    images: [
  {
    url: "https://picsum.photos/500/500?random=1",
    altText: "Stylish Jacket 1",
  },
  {
    url: "https://picsum.photos/500/500?random=2",
    altText: "Stylish Jacket 2",
  }
]

}
const ProductDetails = () => {
    const [mainImage,setMainImage]=useState('');
    const [selectedSize,SetSelectedSize]=useState("");
    const [selectedColor,SetSelectedColor]=useState("");
    const [quantity,setQuantity]=useState(1);
    const [isButtonDisable,setIsButtonDisabled]=useState(false)
    useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
        setMainImage(selectedProduct.images[0].url);
    }
}, []);
const handleQuantityChange=(action)=>
{
    if(action==="plus"){
        setQuantity((prev)=>prev+1);
    }
    if(action==="minus" && quantity>1){
        setQuantity((prev)=>prev-1);
    }
}
const handleAddToCart=()=>{
    if(!selectedSize || !selectedColor){
        toast.error("Please select a size and color before adding to cart",{
        duration:1000,
    });
    return;

      
}
setIsButtonDisabled(true);
setTimeout(()=>{
    toast.success("Product added to Cart",{
        duration:1000,
    });
    setIsButtonDisabled(false);
},500);
}


  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* Left Thumbnails */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image,index)=>(
                        <img  key={index}
                         src={image.url} alt={image.altText || `Thumbnail ${index}`} 
                         className={`w-20 h-20 object-cover  rounded-lg cursor-pointer border ${mainImage === image.url? "border-black" : "border-gray"}`}
                         onClick={()=>setMainImage(image.url)} />
                    ))}
                </div>
                {/* Main Image */}
                <div className='md:w-1/2'>
                <div className='mb-4'>
                    <img src={mainImage} alt="Main Product" className='w-full h-auto object-cover rounded-lg' />
                </div>
                </div>
                {/* Mobile Thumbnails */}
                <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4 '>

                </div>
                <div className='md:w-1/2 md:ml-10'>
                <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                    {selectedProduct.name}
                </h1>
                <p className='text-lg text-gray-600 mb-1 line-through'>
                    {selectedProduct.orginalPrice && `${selectedProduct.orginalPrice}`}
                </p>
                <p className='text-xl text-gray-500 mb-2'>
                    ${selectedProduct.price}
                </p>
                <p className='text-gray-600 mb-4'>
                    {selectedProduct.description}
                </p>
                <div className='mb-4 '>
                    <p className='text-gray-700 '>Color:</p>
                    <div className='flex gap-2 mt-2'>
                        {selectedProduct.colors.map((color)=>(
                            <button key={color} 
                            onClick={()=>SetSelectedColor(color)}
                            
                            className={`w-8 h-8 rounded-full border ${selectedColor===color?"border-4 border-black":"border-gray-300"}`}
                            style={{backgroundColor:color.toLocaleLowerCase()}}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className='mb-4'>
                    <p className='text-black-700'>Size:</p>
                    <div className='flex gap-2 mt-2'>
                        {selectedProduct.sizes.map((size)=>(
                            <button key={size}
                            onClick={()=>SetSelectedSize(size)} className= {`px-4 py-2 rounded border ${selectedSize===size?"bg-black text-white":"bg-white-700"} `}>{size}</button>
                        ))}
                    </div>
                </div>
                {/* Quantity */}
                <div className='mb-6'>
                    <p className='text-gray-700'>Quantity:</p>
                    <div className='flex items-center space-x-4 mt-2'>
                        <button  onClick={()=>handleQuantityChange("minus")}  className='px-2 py-1 bg-ggray-200 rounded text-lg'>-</button>
                        <span className='text-lg'>{quantity}</span>
                                                <button  onClick={()=>handleQuantityChange("plus")}className='px-2 py-1 bg-ggray-200 rounded text-lg'>+</button>

                    </div>
                </div>
                <button disabled={isButtonDisable} onClick={handleAddToCart}  className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisable?"cursor-not-allowed opacity-50":"hover:bg-gray-900"}`}>{isButtonDisable?"Adding..":"ADD TO CART"}</button>
                <div className='mt-10 text-gray-700'>
                    <h3 className='text-xl font-boldmb-4'>Characteristics:</h3>
                    <table className='w-full text-left text-sm text-gray-600'>
                        <tbody>
                            <tr>
                                <td className='py-1'>Brand</td>
                                <td className='py-1 '>{selectedProduct.brand}</td>
                            </tr>
                            <tr>
                                <td className='py-1'>Material</td>
                                <td className='py-1 '>{selectedProduct.material}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div className='mt-20'>
                <h2 className='text-2xl text-center font-medium mb-4'>
                    You May Also Like
                </h2>
                <ProductGrid products={similarProduct}/>
            </div>
        </div>
        
    </div>
  )
}

export default ProductDetails
