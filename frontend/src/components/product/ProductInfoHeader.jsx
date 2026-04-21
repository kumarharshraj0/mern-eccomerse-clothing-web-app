import React from "react";
import { Star, Zap } from "lucide-react";

const ProductInfoHeader = ({ product, reviewsCount }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          <span className="hover:text-primary transition-colors cursor-pointer">{product.brand}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
        </nav>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-green-600">Active Listing</span>
        </div>
      </div>

      <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-slate-900 uppercase leading-[0.9]">
        {product.title}
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-400">(4.0 / 5.0)</span>
        <span className="w-px h-4 bg-slate-200"></span>
        <span className="text-sm font-semibold text-slate-900 border-b-2 border-primary/20">{reviewsCount} Reviews</span>
      </div>

      <div className="flex items-baseline gap-4">
        <span className="text-5xl font-semibold text-slate-900">₹{product.price?.toLocaleString()}</span>
        {product.oldPrice && (
          <span className="text-2xl text-slate-400 line-through font-semibold">₹{product.oldPrice.toLocaleString()}</span>
        )}
      </div>

      <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfoHeader;


