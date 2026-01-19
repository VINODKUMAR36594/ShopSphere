const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// helper function
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  }
  if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Add item to cart (user or guest)
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "ProductId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);

    // ✅ IF CART EXISTS → UPDATE
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    }

    // ✅ IF CART DOES NOT EXIST → CREATE NEW
    const newCart = await Cart.create({
      user: userId ? userId : undefined,
      guestId: guestId ? guestId : `guest_${Date.now()}`,
      products: [
        {
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
    });

    res.status(201).json(newCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get cart by userId or guestId
router.put("/", async (req, res) => {
  try {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity > 0) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.splice(productIndex, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// deleteing products from productts

router.delete('/',async(req,res)=>{
    const {productId,size,color,guestId,userId}=req.body;
    try {
        let cart=await getCart(userId,guestId);
        if(!cart){
            return res.status(404).json({message:"cart not found"})
        }
        const productIndex=cart.products.findIndex((p)=>p.productId.toString()==productId && p.size===size && p.color===color)
        if(productIndex>-1){
            cart.products.splice(productIndex,1);
        
        cart.totalPrice=cart.products.reduce((acc,item)=>acc+ietm.price*item.quantity,0)
        await cart.save();
        return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message:"Product not found in cart"});
                }
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server errror"})
        
    }
})


// for user display
router.get("/", async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    // validation
    if (!userId && !guestId) {
      return res.status(400).json({
        message: "userId or guestId is required"
      });
    }

    const cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
//route post /api/art/merge
router.post("/merge", async (req, res) => {
  
    const { guestId } = req.body;
    try {
      const guestCart=await Cart.findOne({guestId});
      const userCart=await Cart.findOne({user:req.user._id});
      if(guestCart){
        if(guestCart.products.length==0){
          return res.status(400).json({message:"guest cart is empty"});
        }
        if(userCart){
          guestCart.products.forEach((guestItem)=>{
            const productIndex=userCart.products.findIndex(
              (item)=>
                item.productId.toString()===guestItem.productId.toString() && item.size ===guesrItem.size && item.color
            )
            if(productIndex>-1){
              userCart.products[productIndex].quantity +=guestItem.quantity;
            }
            else{
              userCart.products.push(guestItem)
            }
          })
          userCart.totalPrice=userCart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
          await userCart.save();
          try {
            await Cart.findOneAndDelete({guestId});
          } catch (error) {
            console.log("error deleting guet=esr cart",error);

          }
          res.status(200).json(userCart);
        }
        else{
          guestCart.user=req.user._id;
          guestCart.guestId=undefined;
          await guestCart.save();
          res.status(200).json(guestCart);
        }
      }
      else{
        if(userCart){
          return res.status(200).json(userCart);
        }
        res.status(404).json({message:"Guest Cart not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message:"Server Error"});
    }
  }
)
module.exports = router;

