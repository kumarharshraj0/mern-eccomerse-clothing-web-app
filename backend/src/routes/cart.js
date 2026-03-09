const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/auth');
const cartController = require('../controllers/cartController');

router.get('/', verifyAccessToken, cartController.getCart);
router.post('/add', verifyAccessToken, cartController.addToCart);
router.put('/update/:productId', verifyAccessToken, cartController.updateCartItem);
router.delete('/remove/:productId', verifyAccessToken, cartController.removeCartItem);
router.delete('/clear', verifyAccessToken, cartController.clearCart);

// wishlist
router.get('/wishlist', verifyAccessToken, cartController.getWishlist);
router.post('/wishlist/add', verifyAccessToken, cartController.addToWishlist);
router.delete('/wishlist/remove/:productId', verifyAccessToken, cartController.removeFromWishlist);

module.exports = router;
