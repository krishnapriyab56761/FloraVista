const mongoose = require('mongoose');
const plantSchema = new mongoose.Schema({
  name: String,
  category: String,
  care: String,
  price: Number,
  stock: Number
});
module.exports = mongoose.model('Plant', plantSchema);

