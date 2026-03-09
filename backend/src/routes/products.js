const express = require('express');
const router = express.Router();
const { verifyAccessToken, requireRole } = require('../middlewares/auth');
const productController = require('../controllers/productController');

// -------------------------------------
// PUBLIC ROUTES (STATIC FIRST)
// -------------------------------------

// Latest products (static route)
router.get('/latest', productController.getlatestProducts);

// Product list (with filters)
router.get('/', productController.getProducts);

// Get product by ID (dynamic — must be last in public routes)
router.get('/:id', productController.getById);

// -------------------------------------
// ADMIN ROUTES (AUTH REQUIRED)
// -------------------------------------

// Create product with multiple images
router.post('/', 
  verifyAccessToken, 
  requireRole('admin'), 
  productController.create
);

// Update product + upload additional images
router.put('/:id', 
  verifyAccessToken, 
  requireRole('admin'), 
  productController.update
);

// Delete product
router.delete('/:id', 
  verifyAccessToken, 
  requireRole('admin'), 
  productController.remove
);

// -------------------------------------
// REVIEWS (AUTH USERS)
// -------------------------------------

// Create review
router.post('/:id/reviews', 
  verifyAccessToken, 
  productController.createReview
);

// Update review
router.put('/:id/reviews', 
  verifyAccessToken, 
  productController.updateReview
);

// Delete review
router.delete('/:id/reviews', 
  verifyAccessToken, 
  productController.deleteReview
);

module.exports = router;
