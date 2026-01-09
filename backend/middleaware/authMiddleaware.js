const jwt = require('jsonwebtoken');
const User = require("../models/User");

// middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select("-password");

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
// Middleaware
const admin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();
    }
    else{
        res.status(403).json({message:"Not authorized as an admin"})
    }
};


module.exports = { protect,admin };
