require("dotenv").config();
const express=require('express')
const cors=require('cors')
const app=express();
const connectDB=require('./config/db')
const userRoutes=require('./routes/UserRoutes.js')
const ProductRoutes=require('./routes/ProductRoutes.js')
const CartRoutes=require('./routes/CartRoutes.js')
const checkoutRoutes=require('./routes/checkoutRoute.js')
const orderRoutes=require('./routes/orderRoutes.js')
const uploadRoutes=require('./routes/uploadRoutes.js')
app.use(express.json());
app.use(cors());
console.log("JWT_SECRET:", process.env.JWT_SECRET);



const PORT=process.env.PORT || 9001;
// connect to mongodb database
connectDB();
app.get('/',(req,res)=>{
    res.send("WELCOME TO SHOPSPHERE")
})
// APi routes
app.use('/api/users',userRoutes)
app.use('/api/products',ProductRoutes)
app.use('/api/cart',CartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})