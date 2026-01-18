const express=require('express');;
const checkout=require('../models/Checkout')
const Cart=require('../models/Cart')
const Product=require('../models/Product')
const Order=require('../models/Order')
const {protect}=require('../middleaware/authMiddleaware');
const { route } = require('./CartRoutes');
const Checkout = require('../models/Checkout');

const router =express.Router()

route.post('/',protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"Not items in checkout"})
    }
    try {
        //new checkout session
        const newCheckout=await Checkout.create({
            user:re.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid:false
        })
        console.log(`Checkout created for user:${req.user._id}`);
        res.status(201).json(newCheckout);

    } catch (error) {
        console.error("Error creating checoout session",error);
        res.status(500).json({message:"Server Error"})
        
    }
})
//payroute

router.put("/:id/pay",protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    try{
        const checkout=await Checkout.findById(req.params.id)
        if(!checkout)
        {
            return res.status(404).json({message:'Checkout not found'})
        }
        if(paymentStatus){
            checkout.isPaid=true;
            checkout.paidAt=Date.now();
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            await checkout.save();
            console.log(`Checkout ${req.params.id} marked as paid.`);
            return res.json({message:"Payment successful",checkout})
        }  
        else{
            res.status(400).json({message:"Invalid Payment Status"});
        } 
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }

})




// 
