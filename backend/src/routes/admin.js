const express = require('express');
const router = express.Router();
const { verifyAccessToken, requireRole } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.use(verifyAccessToken, requireRole('admin'));

router.get('/dashboard-stats', adminController.getStats);
router.get('/orders', adminController.listOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);
router.put('/orders/:id/assign-delivery', adminController.assignDelivery);
router.get('/users', adminController.listUsers);
router.get('/products', adminController.listProducts);
router.post('/create-delivery-boy', adminController.createDeliveryBoy);
router.get('/delivery-boys', adminController.getAllDeliveryBoys);

// Coupons
router.get('/coupons', adminController.listCoupons);
router.post('/coupons', adminController.createCoupon);
router.delete('/coupons/:id', adminController.deleteCoupon);

module.exports = router;
