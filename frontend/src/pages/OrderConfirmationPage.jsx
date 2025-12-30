import React from 'react'
const checkout={
    _id:"1234",
    createdAt: new Date(),
    checkoutItems:[
        {
            productId:"1",
            name:"Jacket",
            color:"black",
            size:"M",
            price:120,
            quantity:2,
            image:"https://picsum.photos/150?random=1",
        },

    ],
    shippingAddress:{
        address:"123 fashion Street",
        city:"New York",
        country:"USA",
    },
};
const OrderConfirmationPage = () => {
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
            Thank you for Your Order!
        </h1>
      {checkout && (
        <div className='p-6 rounded-lg border'>
            <div className='flex justify-between mb-20'>
                {/* order Id and Date */}

            </div>
            <h2 className='text-xl font-semibold'>
                Order Id:{checkout._id}
            </h2>
            <p className='text-gray-500'>
                Order date:{new Date(checkout.createdAt).toLocaleDateString()}
            </p>
        </div>
      )}
      
    </div>
  )
}

export default  OrderConfirmationPage
