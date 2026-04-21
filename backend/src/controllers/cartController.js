const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json({ cart: user.cart });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, qty = 1, size } = req.body;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if item with SAME productId AND SAME size exists
    const item = user.cart.find(
      (i) => i.product?.toString() === productId && i.size === size
    );

    if (item) {
      item.qty = item.qty + qty;
    } else {
      user.cart.push({
        product: productId,
        qty,
        size,
        price: product.price,
        title: product.title,
        image: product.images?.[0] || null,
      });
    }
    await user.save();
    res.json({  success: true,cart: user.cart ,message:'Product added to cart' });
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cart.find((i) => i.product?.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    item.qty = qty;
    await user.save();
    res.json({ message: 'Item updated', cart:user.cart});
  } catch (err) {
      return res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((i) => i.product?.toString() !== productId);
    await user.save();
    res.json({ message: 'Item removed from cart', cart:user.cart});
  } catch (err) {
      return res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.clearCart=async(req,res,next)=>{
  try{
    const user=await User.findById(req.user._id);
    user.cart=[];
    await user.save();
    res.json({message:'Cart cleared'});
  }catch(err){
      return res.status(500).json({ message: err.message });
    next(err);
  }
}

// Wishlist
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
      return res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (user.wishlist.map(String).includes(productId)) return res.status(400).json({ message: 'Already in wishlist' });
    user.wishlist.push(productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
      return res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter((p) => p.toString() !== productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
      return res.status(500).json({ message: err.message });
    next(err);
  }
};
