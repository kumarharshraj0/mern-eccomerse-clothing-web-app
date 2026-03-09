const express = require('express');
const router = express.Router();
const { verifyAccessToken, requireRole } = require('../middlewares/auth');
const deliveryController = require('../controllers/deliveryController');

router.use(verifyAccessToken, requireRole('deliveryBoy'));

router.get('/assigned', deliveryController.listAssignedOrders);
router.get('/orders/:id', deliveryController.getOrder);
router.post('/orders/:id/update-status', deliveryController.updateStatus); // body: status
router.post('/orders/:id/verify-otp', deliveryController.verifyOtpByDelivery); // check OTP entered by user/delivery
router.get('/deliveryBoyStats', deliveryController.getStats);
module.exports = router;
