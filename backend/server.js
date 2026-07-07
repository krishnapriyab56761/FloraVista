const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// MongoDB Connection
// -------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/plantNursery')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// -------------------------------
// Models
// -------------------------------
const Plant = require('./models/Plant');
const Order = require('./models/Order');

// -------------------------------
// Plant Routes
// -------------------------------

// Get first 15 plants
app.get('/plants', async (req, res) => {
  try {
    const plants = await Plant.find().limit(15);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all plants
app.get('/plants/all', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new plant
app.post('/plants', async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.json({ message: "Plant added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete plant
app.delete('/plants/:id', async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: "Plant deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------
// Order Routes
// -------------------------------

// Place new order
app.post('/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders (with plant details)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("plantId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (generic)

app.put("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: 'after' } 
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Approve order
app.put('/orders/:id/approve', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.json({ message: "Order approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject order
app.put('/orders/:id/reject', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.json({ message: "Order rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order
app.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------
// Start Server
// -------------------------------
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
