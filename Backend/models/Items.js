const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true }, // Total quantity added initially
  availableQuantity: { type: Number, required: true },
  lowStockAlert: { type: Number, default: 10 },
});

module.exports = mongoose.model('Item', ItemSchema);
