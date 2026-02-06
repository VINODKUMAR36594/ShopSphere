const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/* =====================================================
   GET ALL ORDERS (ADMIN)
   GET /api/admin/order
===================================================== */
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET ADMIN ORDERS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   UPDATE ORDER STATUS (ADMIN)
   PUT /api/admin/order/:id
===================================================== */
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) {
      order.status = status;

      if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = new Date();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   DELETE ORDER (ADMIN)
   DELETE /api/admin/order/:id
===================================================== */
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
