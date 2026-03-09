import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LatestProducts = () => {
  const { latestProducts, getLatestProducts, loadingLatest } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const navigate = useNavigate();

  useEffect(() => {
    getLatestProducts();
  }, []);

  const handleProductClick = (id) => navigate(`/products/${id}`);

  if (loadingLatest) {
    return (
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-[2rem]" />
              <div className="space-y-2 px-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!latestProducts?.length) return null;

  return (
    <div className="space-y-12">
      {/* Premium Heading Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <Zap size={20} className="fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Fresh Arrivals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            The Latest <span className="text-primary italic font-serif normal-case">Drop</span>
          </h2>
          <p className="text-slate-500 font-medium font-serif italic text-lg max-w-xl">
            Our most recent additions to the collection, curated for the modern wardrobe.
          </p>
        </div>
        <Link
          to="/shop"
          className="group flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Explore Entire Vault</span>
          <ShoppingBag size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid with Framer Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {latestProducts.slice(0, 10).map((product, idx) => {
          const inStock = product.stock > 0;
          const isLiked = isInWishlist(product._id);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/50 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden flex flex-col h-full">

                {/* Image Section */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 mb-6">
                  <Badge className="absolute top-4 left-4 z-10 bg-primary/90 backdrop-blur-md text-white border-none rounded-lg px-3 py-1 text-[8px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                    NEW RELEASE
                  </Badge>

                  <img
                    src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-12 w-12 bg-white shadow-xl hover:scale-110 active:scale-95 transition-transform"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <Eye size={18} className="text-slate-900" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-12 w-12 bg-white shadow-xl hover:scale-110 active:scale-95 transition-transform"
                      onClick={() =>
                        isLiked ? removeFromWishlist(product._id) : addToWishlist(product._id)
                      }
                    >
                      <Heart size={18} className={isLiked ? "text-red-500 fill-red-500" : "text-slate-900"} />
                    </Button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-2 space-y-2 flex-1 flex flex-col">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">
                    {product.brand || "ESSENTIALS COLLECTION"}
                  </p>

                  <h4
                    onClick={() => handleProductClick(product._id)}
                    className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {product.title}
                  </h4>

                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < Math.round(product.rating || 0) ? "text-primary fill-primary" : "text-slate-200 fill-slate-200"}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 ml-1">({product.numReviews || 0})</span>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 italic">
                    <p className="text-xl font-black text-slate-900 tracking-tighter">₹{product.price.toLocaleString()}</p>
                    <Button
                      size="sm"
                      disabled={!inStock}
                      onClick={() => addToCart(product._id, 1)}
                      className="rounded-xl h-9 px-4 font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
                    >
                      {inStock ? "Secure Item" : "Awaiting Stock"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestProducts;
