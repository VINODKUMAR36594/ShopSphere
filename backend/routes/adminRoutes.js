const express=require('express')
const  User=require('../models/User')
const {protect,admin}=require("../middleware/authMiddleware")

const router=express.Router();


router.get('/',protect,admin,async (req,res)=>{
    try {
        const users=await User.find({});
        res.json(users);        
    } catch (error) {
        console.error(error);

    }
    
})


//POST REQUEST
router.post("/",protect,admin,async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User ALready Exists"})
        }
        // /new User Creations
        user=new User({
            name,
            email,
            password,
            role:role || "customer"
        })
        await user.save();
        res.status(201).json({message:"Created"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
        
    }
})


//update user details

router.put("/:id", protect, admin, async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { name, email, password, role } = req.body;

    // update fields only if sent
    if (name) user.name = name;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    // 🔐 password update (bcrypt will hash via pre-save hook)
    if (password) {
      user.password = password;
    }

    // admin-only role update
    if (role) {
      user.role = role === "admin" ? "admin" : "customer";
    }

    await user.save();

    res.json({ 
      message: "User Updated Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
//deleet 
router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"Done Deleted"})
        }
        else{
            res.status(404).json({message:"user not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
})
    
module.exports=router;










