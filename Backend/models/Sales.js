const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  itemName: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  profit: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', saleSchema);
