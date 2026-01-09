const mongoose=require('mongoose')
const dotenv=require('dotenv')
 
const Product=require('./models/Product')
const User=require('./models/User')
const products=require('./data/products')
const Cart=require('./models/Cart')
dotenv.config();


mongoose.connect(process.env.MONGO_URI)


const seedData=async ()=>{
    try {
        // Clear Existing Data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        // creat a deafult admin user


        const createdUser =await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
        });
        // Assign default userid to each producs
        const userID=createdUser._id;
        const sampleProducts=products.map((product)=>{
            return {...product,user:userID};
        })

        await Product.insertMany(sampleProducts);
        console.log("Product data seeded succesfully!");
        process.exit();

    } catch (error) {
        console.error("Eroor seeding the data",error)
        process.exit(1);
    }
}
seedData();