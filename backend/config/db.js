const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");

    }
    catch(err){
        console.error("Mongoose connection failed", err);
        process.exit(1);
    }
}
module.exports = connectDB;