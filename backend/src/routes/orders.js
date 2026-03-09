const express = require('express');
const router = express.Router();
const { verifyAccessToken, requireRole } = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

router.post('/', verifyAccessToken, orderController.createOrder);
router.get('/:id', verifyAccessToken, orderController.getOrder);
router.post('/:id/pay', verifyAccessToken, orderController.verifyPayment); // webhook-style verify
router.get('/', verifyAccessToken, orderController.listMyOrders);
router.post('/:id/confirm-delivery', verifyAccessToken, orderController.confirmDeliveryWithOtp);
router.post('/:id/return', verifyAccessToken, orderController.returnOrder);
router.post('/:id/cancel', verifyAccessToken, orderController.cancelOrder);
module.exports = router;
