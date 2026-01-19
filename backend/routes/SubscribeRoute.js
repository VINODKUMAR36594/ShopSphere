const express=require('express')
const Subscriber = require('../models/Subscriber')
const router=express.Router()
//add routes



router.post('/subscribe',async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"})
    }
    try {
        let subscriber=await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"Email is Already Subscribred"})
        }
        // not subsrcibed new one
        subscriber=new Subscriber({email});
        await subscriber.save();
        res.status(201).json({message:"Donee!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
        
    }
})
module.exports=router;