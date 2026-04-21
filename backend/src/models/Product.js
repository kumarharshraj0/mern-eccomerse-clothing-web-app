const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  public_id: String,
  url: String
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: 'text' },
   
    price: { type: Number, required: true },
    category: { type: String, index: true },
  description:{ type: String, index: true },
    brand: { type: String, index: true },
    images: [imageSchema],
    colors: [String],
    sizes: [String],
    color: String, // Legacy support
    size: String,  // Legacy support
    
    stock: { type: Number, default: 0 },
    sku: String,
    attributes: Object,
    reviewsCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', brand: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
