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
                          name:  "Product 1"
                        }
                    ]
                }
            ]
        })
    })
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders