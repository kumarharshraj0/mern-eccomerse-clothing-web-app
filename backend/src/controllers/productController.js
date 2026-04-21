const Product = require('../models/Product');
const Review = require('../models/Review');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');
const Order = require('../models/Order');


// Create product (admin)
exports.create = async (req, res, next) => {
  try {
    const { images, ...payload } = req.body;

    // Add creator id
    payload.createdBy = req.user._id;

    // Create product first (without images)
    const product = await Product.create(payload);

    // If images provided → upload to cloudinary
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadedImages = [];

      for (const base64Image of images) {
        const uploadRes = await cloudinary.uploader.upload(base64Image, {
          folder: `products/${product._id}`,
          quality: "auto"
        });

        uploadedImages.push({
          public_id: uploadRes.public_id,
          url: uploadRes.secure_url
        });
      }

      // Add images to product
      product.images.push(...uploadedImages);
      await product.save();
    }

    return res.status(201).json(product);

  } catch (err) {
    next(err);
  }
};


exports.update = async (req, res, next) => {
  try {
    const { images, ...payload } = req.body;

    // 1️⃣ Find product first
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    // 2️⃣ Update normal fields
    Object.assign(product, payload);

    // 3️⃣ Handle new image uploads if images exist
    if (images && Array.isArray(images) && images.length > 0) {
      const newUploads = [];

      for (const base64Image of images) {
        const uploadRes = await cloudinary.uploader.upload(base64Image, {
          folder: `products/${product._id}`,
          quality: "auto",
        });

        newUploads.push({
          public_id: uploadRes.public_id,
          url: uploadRes.secure_url,
        });
      }

      // 🔥 Add new images while keeping old images
      product.images.push(...newUploads);
    }

    // 4️⃣ Save updated product
    await product.save();

    res.json({message: ' product Updated', product});

  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
};


exports.remove = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
     res.status(500).json({ message: err.message });
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
     res.status(500).json({ message: err.message });
    next(err);
  }
};

// Listing with filters
/* =====================================================
   🔥 LIST PRODUCTS (SEARCH + FILTERS + SORT)
===================================================== */

exports.getProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      brand,
      color,
      size,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    const filter = {};

    /* 🔍 SEARCH */
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }

    /* 🧩 MULTI FILTERS */
    if (category) filter.category = { $in: category.split(",") };
    if (brand) filter.brand = { $in: brand.split(",") };
    if (color) filter.colors = { $in: color.split(",") };
    if (size) filter.sizes = { $in: size.split(",") };

    /* 💰 PRICE */
    filter.price = {
      $gte: Number(minPrice) || 0,
      $lte: Number(maxPrice) || 50000,
    };

    /* 🔃 SORT */
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;
    if (sort === "rating") sortOption.rating = -1;
    if (sort === "popularity") sortOption.numReviews = -1;

    /* 📄 PAGINATION */
    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    res.json({
      products,
      pagination: {
        page: currentPage,
        limit: perPage,
        total,
        totalPages: Math.ceil(total / perPage),
        hasNextPage: skip + products.length < total,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};











exports.getlatestProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json(products);
  } catch (err) {
    next(err);
  }
};






// upload images for product (admin)
// ------------------------------

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};


// Reviews: create/update/delete by owner
exports.createReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment, title } = req.body;
    const userId = req.user._id;

    /* ------------------------------------------------
       1️⃣ Check: user ne product buy kiya hai ya nahi
  
    /* ------------------------------------------------
       2️⃣ Check: duplicate review
    ------------------------------------------------- */
    const existing = await Review.findOne({
      product: productId,
      user: userId
    });

    if (existing) {
      return res.status(400).json({
        message: 'You already reviewed this product'
      });
    }

    /* ------------------------------------------------
       3️⃣ Create review
    ------------------------------------------------- */
    const review = await Review.create({
      product: productId,
      user: userId,
      rating,
      comment,
      title
    });

    /* ------------------------------------------------
       4️⃣ Recalculate product rating
    ------------------------------------------------- */
    const stats = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: '$product',
          avg: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    const { avg, count } = stats[0] || {
      avg: rating,
      count: 1
    };

    await Product.findByIdAndUpdate(productId, {
      rating: avg,
      reviewsCount: count
    });

    res.status(201).json(review);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate review' });
    }
    next(err);
  }
};


exports.updateReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment, title } = req.body;
    const userId = req.user._id;

    const review = await Review.findOneAndUpdate({ product: productId, user: userId }, { rating, comment, title }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const stats = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const { avg, count } = stats[0] || { avg: rating, count: 1 };
    await Product.findByIdAndUpdate(productId, { rating: avg, reviewsCount: count });

    res.json(review);
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user._id;

    const review = await Review.findOneAndDelete({ product: productId, user: userId });
    if (!review) return res.status(404).json({ message: 'Not found' });

    const stats = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const { avg = 0, count = 0 } = stats[0] || {};
    await Product.findByIdAndUpdate(productId, { rating: avg, reviewsCount: count });

    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
