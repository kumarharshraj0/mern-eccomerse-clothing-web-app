const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const templates = require('../utils/emailTemplates');
const Coupon = require('../models/Coupon');

exports.getStats = async (req, res, next) => {
  try {
    // TOTAL SALES & PAID ORDERS
    const [totalSalesAgg] = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
          ordersCount: { $sum: 1 }
        }
      }
    ]);

    // COUNT DELIVERY BOYS ONLY
    const deliveryBoyCount = await User.countDocuments({
      roles: { $in: ["deliveryBoy"] }
    });

    // COUNT PRODUCTS
    const productsCount = await Product.countDocuments();

    // ORDERS GROUPED BY STATUS
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // MONTHLY SALES (Last 12 Months)
    const monthlySales = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" }, // group by month
          total: { $sum: "$total" }
        }
      },
      { $sort: { "_id": 1 } } // sort by month ascending
    ]);

    // WEEKLY SALES (Last 4 Weeks)
    const weeklySales = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $week: "$createdAt" }, // group by week number
          total: { $sum: "$total" }
        }
      },
      { $sort: { "_id": 1 } } // sort by week
    ]);

    // RESPONSE
    res.json({
      totalSales: totalSalesAgg?.totalSales || 0,
      ordersCount: totalSalesAgg?.ordersCount || 0,
      deliveryBoyCount,
      productsCount,
      ordersByStatus,
      monthlySales,
      weeklySales
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};


exports.listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user').populate('deliveryAssignedTo');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Status update email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: order.user.email,
      subject: templates.orderStatusUpdate(order, status).subject,
      html: templates.orderStatusUpdate(order, status).html,
    });

    // Handle restocking on cancellation/return from admin side
    if (['cancelled', 'returned'].includes(status.toLowerCase())) {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.qty, popularity: -item.qty }
        });
      }
    }

    // OTP on shipped
    if (status.toLowerCase() === "shipped") {
      order.deliveryOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await order.save();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: order.user.email,
        subject: templates.deliveryOtp(order.deliveryOtp).subject,
        html: templates.deliveryOtp(order.deliveryOtp).html,
      });
    }

    return res.status(200).json({
      message: " order Status updated",
      order,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};



exports.assignDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deliveryUserId } = req.body;
    const deliveryUser = await User.findById(deliveryUserId);
    if (!deliveryUser || !deliveryUser.roles.includes('deliveryBoy')) return res.status(400).json({ message: 'Invalid delivery user' });
    const order = await Order.findByIdAndUpdate(id, { deliveryAssignedTo: deliveryUserId }, { new: true }).populate('user').populate('deliveryAssignedTo');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: deliveryUser.email,
      subject: `New delivery assigned: Order ${order._id}`,
      html: `<p>You have been assigned to deliver order ${order._id}.</p>`
    });

    res.json({ message: 'Delivery assigned', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password -refreshTokens');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.listProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};




exports.createDeliveryBoy = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already in use' });

    user = new User({
      name,
      email,
      password,
      roles: ['deliveryBoy'],  // FIXED ROLE
      isVerified: true         // Delivery Boys mostly auto-verified
    });

    await user.save();

    res.json({ message: 'Delivery Boy account created successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getAllDeliveryBoys = async (req, res, next) => {
  try {
    const deliveryBoys = await User.find({ roles: 'deliveryBoy' });
    res.json(deliveryBoys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// COUPON MANAGEMENT
exports.createCoupon = async (req, res, next) => {
  try {
    const { code, discount, expiryDate, usageLimit } = req.body;
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: 'Coupon code already exists' });

    const coupon = new Coupon({
      code,
      discount,
      expiryDate,
      usageLimit
    });

    await coupon.save();
    res.json({ message: 'Coupon created successfully', coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



