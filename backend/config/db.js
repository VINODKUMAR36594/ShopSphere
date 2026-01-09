const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected sucessfully");

    }
    catch(err){
        console.error("Mongosse conection failed",err);
        process.exit(1);
    }
}
module.exports = connectDB;