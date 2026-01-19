require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔐 JWT Token:", token);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);
      
      req.user = await User.findById(decoded.user.id).select("-password");
      console.log("👤 User:", req.user);
      
      next(); // VERY IMPORTANT
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};
// Middleware
const admin=(req,res,next)=>{
  if(req.user && req.user.role==='admin'){
    next();
    }
    else{
      res.status(403).json({message:"Not authorized as an admin"})
    }
  };
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  module.exports = { protect,admin };
