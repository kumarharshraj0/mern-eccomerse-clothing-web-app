const Order = require('../models/Order');

exports.listAssignedOrders = async (req, res, next) => {
  try {
    console.log("LOGGED-IN DELIVERY BOY:", req.user);

    const orders = await Order.find({
      deliveryAssignedTo: req.user._id
    }).sort({ createdAt: -1 });

    console.log("FOUND ORDERS:", orders);

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user');
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (!order.deliveryAssignedTo?.equals(req.user._id)) return res.status(403).json({ message: 'Not assigned' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (!order.deliveryAssignedTo?.equals(req.user._id)) return res.status(403).json({ message: 'Not assigned' });
    order.status = status;
    await order.save();
    res.status(200).json({order, message: 'Status updated' });
  } catch (err) {
    restatus(500).json({ message: err.message });
    next(err);
  }
};

exports.verifyOtpByDelivery = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const order = await Order.findById(req.params.id).populate('user');
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (!order.deliveryAssignedTo?.equals(req.user._id)) return res.status(403).json({ message: 'Not assigned' });
    if (order.deliveryOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    order.deliveryOtpVerified = true;
    order.status = 'delivered';
    await order.save();
    res.json({ message: 'Delivery confirmed' });
  } catch (err) {
    next(err);
  }
};


exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    /* --------------------------- DATE RANGES --------------------------- */

    // Today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Week (last 7 days)
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    // Month (last 30 days)
    const monthStart = new Date();
    monthStart.setDate(monthStart.getDate() - 30);

    /* ---------------------- OVERALL STAT COUNTS ----------------------- */
    const totalDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
    });

    const pendingDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
      status: { $in: ["packed", "out for delivery"] },
    });

    const completedDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
      status: "delivered",
    });

    /* ---------------------- TODAY'S STAT COUNTS ----------------------- */
    const todayDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    const todayCompleted = await Order.countDocuments({
      deliveryAssignedTo: userId,
      status: "delivered",
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    /* ---------------------- WEEKLY STAT COUNTS ------------------------ */
    const weeklyDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
      createdAt: { $gte: weekStart },
    });

    const weeklyCompleted = await Order.countDocuments({
      deliveryAssignedTo: userId,
      status: "delivered",
      createdAt: { $gte: weekStart },
    });

    /* ---------------------- MONTHLY STAT COUNTS ----------------------- */
    const monthlyDeliveries = await Order.countDocuments({
      deliveryAssignedTo: userId,
      createdAt: { $gte: monthStart },
    });

    const monthlyCompleted = await Order.countDocuments({
      deliveryAssignedTo: userId,
      status: "delivered",
      createdAt: { $gte: monthStart },
    });

    /* --------------------------- RESPONSE ----------------------------- */
    res.status(200).json({
      success: true,
      stats: {
        overall: {
          totalDeliveries,
          pendingDeliveries,
          completedDeliveries,
        },
        today: {
          total: todayDeliveries,
          completed: todayCompleted,
        },
        weekly: {
          total: weeklyDeliveries,
          completed: weeklyCompleted,
        },
        monthly: {
          total: monthlyDeliveries,
          completed: monthlyCompleted,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
