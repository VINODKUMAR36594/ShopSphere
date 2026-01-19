const express = require("express");
const mongoose = require("mongoose");

const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const { protect } = require("../middleaware/authMiddleaware");

const router = express.Router();

/* =====================================================
   CREATE CHECKOUT
===================================================== */
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
      isFinalized: false,
    });

    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Create Checkout Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   PAY CHECKOUT
===================================================== */
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid checkout ID" });
    }

    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus !== "Paid") {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    checkout.isPaid = true;
    checkout.paidAt = new Date();
    checkout.paymentStatus = "Paid";
    checkout.paymentDetails = paymentDetails;

    await checkout.save();

    res.json({ message: "Payment successful", checkout });
  } catch (error) {
    console.error("Payment Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/* =====================================================
   FINALIZE CHECKOUT → CREATE ORDER
===================================================== */
router.post("/:id/finalize", protect, async (req, res) => {
    console.log("🔥 FINALIZE ROUTE HIT 🔥");
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid checkout ID" });
    }

    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout is not paid" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    // Create Order
    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentStatus: "Paid",
      paymentDetails: checkout.paymentDetails,
      isDelivered: false,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = new Date();
    await checkout.save();

    // Clear cart
    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json(order);
  } catch (error) {
    console.error("Finalize Error:", error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
