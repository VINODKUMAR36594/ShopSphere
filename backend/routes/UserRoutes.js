const express=require("express")
const User=require('../models/User.js')
const jwt=require("jsonwebtoken")
const { protect } = require("../middleware/authMiddleware");
const router=express.Router();

// @route Post/api/users/register

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email})
        if(user) return res.status(400).json({ message:"user already exits"});
        user=new User({name ,email,password})
        await user.save()
        const payload={user:{id:user._id,role:user.role}};

        // Sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"12h"},(err,token)=>{
            if(err) throw err;
            res.status(201).json({
                token,
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
            })
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error1")
    }
})


router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;

        // ✅ SEND TOKEN
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// route for user profiles

router.get("/profile",protect,async (req,res)=>{
    res.json(req.user);
})


module.exports=router;