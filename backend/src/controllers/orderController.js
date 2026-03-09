const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const transporter = require('../config/nodemailer');
const templates = require('../utils/emailTemplates');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;
    let subtotal = 0;
    const itemsDetailed = [];
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) return res.status(400).json({ message: 'Product not found' });
      if (product.stock < it.qty) return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      itemsDetailed.push({
        product: product._id,
        title: product.title,
        price: product.price,
        qty: it.qty,
        image: product.images[0] || null
      });
      subtotal += product.price * it.qty;
    }
    const shipping = 0;
    const taxes = 0;
    const total = subtotal + shipping + taxes;

    const order = await Order.create({
      user: req.user._id,
      items: itemsDetailed,
      subtotal,
      shipping,
      taxes,
      total,
      paymentMethod,
      status: 'created',
      shippingAddress,
      notes
    });

    for (const it of itemsDetailed) {
      await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty, popularity: it.qty } });
    }

    let razorpayOrder = null;
    if (paymentMethod === 'razorpay') {
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(total * 100),
        currency: 'INR',
        receipt: order._id.toString(),
        payment_capture: 1
      });
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: req.user.email,
      subject: templates.orderCreated(order).subject,
      html: templates.orderCreated(order).html
    });

    res.status(201).json({ order, razorpayOrder });
  } catch (err) {
    next(err);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order.razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      order.paymentStatus = 'failed';
      await order.save();
      return res.status(400).json({ message: 'Invalid signature' });
    }

    order.paymentStatus = 'paid';
    order.status = 'created';
    order.razorpayPaymentId = razorpayPaymentId;
    await order.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: order.user.email,
      subject: 'Payment successful',
      html: `<p>Your payment for order ${order._id} was successful.</p>`
    });

    res.json({ message: 'Payment verified', order });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product').populate('user');
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (!order.user._id.equals(req.user._id) && !req.user.roles.includes('admin') && !order.deliveryAssignedTo?.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.listMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};





exports.confirmDeliveryWithOtp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;
    const order = await Order.findById(id).populate('user');
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (!order.deliveryOtp) return res.status(400).json({ message: 'No OTP generated' });
    if (order.deliveryOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    order.deliveryOtpVerified = true;
    order.status = 'delivered';
    await order.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: order.user.email,
      subject: 'Order delivered',
      html: `<p>Your order ${order._id} is delivered. Thank you!</p>`
    });

    res.json({ message: 'Delivery confirmed' });
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!order.user.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    // Restricting cancellation to specific statuses
    const cancellableStatuses = ['created', 'paid', 'packed'];
    if (!cancellableStatuses.includes(order.status.toLowerCase())) {
      return res.status(400).json({ message: `Cannot cancel an order that is ${order.status}` });
    }

    order.status = 'cancelled';
    await order.save();

    // Restock elements
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.qty, popularity: -item.qty }
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: req.user.email,
      subject: templates.orderStatusUpdate(order, 'cancelled').subject,
      html: templates.orderStatusUpdate(order, 'cancelled').html
    });

    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    next(err);
  }
};

exports.returnOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!order.user.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    if (order.status.toLowerCase() !== 'delivered') {
      return res.status(400).json({ message: 'Only delivered orders can be returned' });
    }

    order.status = 'returned';
    await order.save();

    // Restock elements
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.qty, popularity: -item.qty }
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: req.user.email,
      subject: templates.orderStatusUpdate(order, 'returned').subject,
      html: templates.orderStatusUpdate(order, 'returned').html
    });

    res.json({ message: 'Order return initiated successfully', order });
  } catch (err) {
    next(err);
  }
};
