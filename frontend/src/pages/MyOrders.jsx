import React, { useEffect, useState } from 'react'

const MyOrders = () => {
    const [orders,setOrders]=useState([]);
    useEffect   (()=>{
        setTimeout(()=>{
            const mockOrders=[
                {
                    _id:"12345",
                    createAt:new Date(),
                    shippingAddress:{city:"New York ",country:"USA"},
                    orderItems:[
                        {
                          name:  "Product 1",
                          image:"https://picsum.photos/500/500?random=1",

                        },

                    ],
                    totalPrice:100,
                    isPaid:true,
                }
            ]
        })
    })
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders