const express=require('express')
const cart=require("../models/Cart")
const Product=reuqire('../models/Product')
const {protect} =require('../middleaware/authMiddleaware')


const router=express.Router();
// helper fuction
const getCart=async (userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId})
    }
    else if(guestId){
        return await Cart.findOne({guestId});
    }
    return null;

}

router.post('/',async (req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        const product=await Product.findById(productId)
        if(!product) return res.status(404).json({message:"product not found"});
        let cart=await getCart(userId,guestId);
        // if carrt exist update it
        if(!cart){
            const productIndex=cart.products.findIndex((p)=>
            p.productId.toString()===productId && p.size===size && p.color===color);
            if(productIndex>-1){
                cart.products[productIndex].quantity+=quantity;
            }
            else{
                // product not presnet so add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.image,
                    price:product.price,
                    size,
                    color,
                    quantity
                })
            }
            // caluclate total prcie
            cart.totalPrice=cart.products.reduce((acc,item)=> acc+item.price*item.quantity,0)
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            const newCart=await cart.create({
                userId:userId? userId : undefined,
                guestId: guestId?guestId : "guest_"+new Date().getTime(),
                products:[
                    {
                        productId,
                        name:productname,
                        image:product
                    }
                ]
            })
        }
    } catch (error) {
        
    }
})