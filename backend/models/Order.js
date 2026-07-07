const mongoose = require('mongoose');  // ✅ only once

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
