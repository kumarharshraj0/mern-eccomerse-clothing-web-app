import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";


import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/button";

import ProductCard from "@/components/ProductCard";

const LatestProducts = () => {
  const { latestProducts, getLatestProducts, loadingLatest } = useProducts();
  const { addToCart } = useCart();
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
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
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-slate-900 uppercase">
            The Latest <span className="text-primary">Drop</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            Our most recent additions to the collection, curated for the modern wardrobe.
          </p>
        </div>
        <Link
          to="/shop"
          className="group flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-900">View All</span>
          <ShoppingBag size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid with Framer Motion */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8">
        {latestProducts.slice(0, 10).map((product, idx) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard
              product={product}
              onNavigate={handleProductClick}
              onAddToCart={() => addToCart(product._id, 1)}
              onToggleWishlist={() =>
                isInWishlist(product._id)
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product._id)
              }
              isWishlisted={isInWishlist(product._id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;


