import React from 'react'
const selectedProduct={
    name:"Stylish Jacket",
    price:120,
    orginalPrice:150,
    description:"this is a stylish jacket perfcet for any ocasion",
    brand:"FashionBrand",
    material:"Leather",
    sizes:["s","m","l","xl"],
    colors:["red","black"],
    images:[
        {
            url:"https://picsum.photos/500/500?random=1",
            altText:"Stylish Jacket 1",

        },
    ]
}
const ProductDetails = () => {
  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* Left Thumbnails */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProduct.images.map((image,index)=>(
                        <img  key={index}
                         src={image.url} alt={image.altText || `Thumbnail ${index}`} 
                         className='w-20 h-20 object-cover  rounded-lg cursor-pointer border' />
                    ))}
                </div>
                {/* Main Image */}
                <div className='md:w-1/2'>
                <div className='mb-4'>
                    <img src={selectedProduct.images[0]?.url} alt="Main Product" className='w-full h-auto objext-cover rounded-lg' />
                </div>
                </div>
                {/* Moie Thumbnails */}
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
                            <button key={color} className='w-8 h-8 rounded-full border'
                            style={{backgroundColor:color.toLocaleLowerCase()}}
                            ></button>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ProductDetails
