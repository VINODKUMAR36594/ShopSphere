require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const CartRoutes = require("./routes/CartRoutes");
const checkoutRoutes = require("./routes/checkoutRoute");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscriberRoute = require("./routes/SubscribeRoute");
const adminroutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO SHOPSPHERE");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoute);
app.use("/api/admin/users", adminroutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/order", adminOrderRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
