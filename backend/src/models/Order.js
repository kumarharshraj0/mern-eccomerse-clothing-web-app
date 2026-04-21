const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  price: Number,
  qty: Number,
  size: String,
  image: Object
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItemSchema],
    subtotal: Number,
    shipping: Number,
    taxes: Number,
    total: Number,
    paymentMethod: String,
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
      type: String,
      enum: ['created', 'paid', 'packed', 'shipped', 'delivered', 'cancelled', 'returning', 'returned'],
      default: 'created'
    },
    deliveryAssignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliveryOtp: String,
    deliveryOtpVerified: { type: Boolean, default: false },
    shippingAddress: Object,
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
