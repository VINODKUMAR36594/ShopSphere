import React, { useEffect, useState } from 'react'
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
    const [quanity,setQuantity]=useState(1);
    const [isButtonDisable,setIsButtonDisabled]=useState(false)
    useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
        setMainImage(selectedProduct.images[0].url);
    }
}, []);

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
                    <img src={mainImage} alt="Main Product" className='w-full h-auto objext-cover rounded-lg' />
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
                            onClick={()=>SetSelectedSize(size)} className= {`px-4 py-2 rounded border ${selectedSize===size?"bg-black text-white":} `}>{size}</button>
                        ))}
                    </div>
                </div>
                {/* Quantity */}
                <div className='mb-6'>
                    <p className='text-gray-700'>Quantity:</p>
                    <div className='flex items-center space-x-4 mt-2'>
                        <button className='px-2 py-1 bg-ggray-200 rounded text-lg'>-</button>
                        <span className='text-lg'>1</span>
                                                <button className='px-2 py-1 bg-ggray-200 rounded text-lg'>+</button>

                    </div>
                </div>
                <button className='bg-black text-white py-2 px-6 rounded w-full mb-4'>ADD TO CART</button>
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
        </div>
        
    </div>
  )
}

export default ProductDetails
