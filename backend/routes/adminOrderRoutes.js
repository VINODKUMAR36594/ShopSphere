const express=require('express')
const Order=require('../models/Order')
const {protect,admin}=require('../middleware/authMiddleware')
const router=express.Router()



router.get('/',protect,admin,async(requestAnimationFrame,res)=>{
    try {
        const orders=await Order.find({}).populate("user","name email")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})



router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id);
        if(order){
            order.status=req.body.status || order.status;
            order.isDelivered=req.body.status==='Delivered'?true:order.isDelivered;
            order.deliveredAt=req.body.status==='Delivered'?Date.now():order.deliveredAt;
            const updatedOrder=await order.save();
            res.json(updatedOrder)
        }
        else{
            res.status(404).json({message:"Order not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Sever Error"})
        
    }
})



//route for deleting a orders
router.delete('/:id',protect,admin,async (req,res)=>{
    try {
        const order=await Order.findById(req.params.id)
        if(order){
            await order.deleteOne();
            res.json({message:"DOne"})
        }
        else{
            res.json({message:"NOT FOUND"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Errr"})
    }
})
module.exports=router