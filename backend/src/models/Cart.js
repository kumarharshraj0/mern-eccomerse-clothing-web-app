const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: { type: Number, default: 1 },
  price: Number,
  title: String,
  image: Object
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    items: [cartItemSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
