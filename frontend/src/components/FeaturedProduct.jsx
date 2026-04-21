import React, { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Star, Crown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedProduct = () => {
  const { products, getProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const navigate = useNavigate();

  /* -------- fetch all products -------- */
  useEffect(() => {
    getProducts({ all: true }, { forceReload: false });
  }, []);

  /* -------- top 6 premium products -------- */
  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 6);
  }, [products]);

  const handleProductClick = (id) => navigate(`/products/${id}`);

  if (loading) {
    return (
      <div className="space-y-12 mt-20">
        <div className="text-center space-y-4">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-14 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-[450px] w-full rounded-[3rem]" />
              <div className="space-y-3 px-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!featuredProducts.length) return null;

  return (
    <div className="mt-40 space-y-20">
      {/* Decorative Background Element */}
      <div className="absolute left-0 w-full h-[800px] bg-slate-50/50 -z-10 skew-y-1" />

      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary"
        >
          <Crown size={14} className="fill-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Elite Selection</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-semibold tracking-tighter text-slate-900 uppercase leading-[0.9]"
        >
          Featured <span className="text-primary">Premium</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg"
        >
          Discover luxury items crafted with precision and timeless elegance for the discerning individual.
        </motion.p>
      </div>

      {/* Grid with 3 Column Layout for Premium Feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {featuredProducts.map((product, idx) => {
          const isWishlisted = isInWishlist(product._id);
          const inStock = product.stock > 0;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full flex flex-col">
                {/* Image Container with Custom Border */}
                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden bg-white p-2 border border-slate-100 shadow-xl shadow-slate-200 transition-all duration-700 group-hover:shadow-primary/20 group-hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none rounded-full px-4 py-2 text-[8px] font-semibold tracking-widest uppercase shadow-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      LIMITED EDITION
                    </Badge>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => isWishlisted ? removeFromWishlist(product._id) : addToWishlist(product._id)}
                      className="rounded-full bg-white/50 backdrop-blur-md h-12 w-12 hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-lg"
                    >
                      <Heart className={isWishlisted ? "text-red-500 fill-red-500" : "text-slate-900"} size={20} />
                    </Button>
                  </div>

                  {/* Bottom Image Label */}
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <Button
                      onClick={() => handleProductClick(product._id)}
                      className="rounded-full bg-white text-slate-900 hover:bg-white hover:scale-105 active:scale-95 font-semibold uppercase tracking-widest text-[10px] h-12 px-8 shadow-2xl transition-all"
                    >
                      Learn More <ArrowUpRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="mt-8 px-6 space-y-4 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60">{product.brand || "DESIGNER LABEL"}</p>

                  <h3
                    onClick={() => handleProductClick(product._id)}
                    className="text-3xl font-semibold text-slate-900 tracking-tight cursor-pointer hover:text-primary transition-colors line-clamp-1 uppercase"
                  >
                    {product.title}
                  </h3>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.round(product.rating || 0) ? "text-primary fill-primary" : "text-slate-200 fill-slate-200"}
                        />
                      ))}
                      <span className="text-[10px] font-semibold text-slate-400">({product.numReviews})</span>
                    </div>

                    <div className="flex items-center justify-center gap-6 w-full pt-4 border-t border-slate-100">
                      <p className="text-3xl font-semibold text-slate-900 tracking-tighter">₹{product.price.toLocaleString()}</p>
                      <Button
                        disabled={!inStock}
                        onClick={() => addToCart(product._id, 1)}
                        className="rounded-2xl h-12 px-8 bg-slate-900 hover:bg-primary shadow-xl shadow-slate-200 hover:shadow-primary/30 transition-all active:scale-95 font-semibold tracking-widest uppercase text-[10px]"
                      >
                        {inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final Call to Action Link */}
      <div className="flex justify-center pt-20">
        <Link
          to="/shop"
          className="group relative inline-flex items-center gap-3 text-slate-400 hover:text-primary transition-colors"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.5em]">View Full Catalog</span>
          <div className="p-2 rounded-full border border-slate-200 group-hover:border-primary transition-colors">
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;


