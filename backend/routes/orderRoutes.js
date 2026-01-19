const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//get request
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
  .sort({ createdAt: -1 });
  res.json(orders)
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"Server Error"})
    // r
  }
}
)




router.get("/:id",protect,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(!order){
            return res.status(404).json({message:"Order not found"});

            
        }
        return res.json(order)
        //returnn full order details sucess

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
        
    }
})
module.exports=router;