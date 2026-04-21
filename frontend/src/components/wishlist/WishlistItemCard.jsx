import React from "react";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WishlistItemCard = ({ item, idx, isSheet, removeFromWishlist, addToCart, navigate }) => {
  const product = item.product || item;
  const imageUrl = product?.images?.[0]?.url || product?.image?.url || product?.image || "/placeholder.png";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Area */}
      <div className={`${isSheet ? "aspect-square" : "aspect-[4/5]"} relative overflow-hidden bg-slate-50`}>
        <img
          src={imageUrl}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => removeFromWishlist(product._id)}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-red-500 shadow-lg hover:bg-white transition-all active:scale-95"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={`${isSheet ? "p-5" : "p-8 lg:p-10"} space-y-4 flex-1 flex flex-col`}>
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className={`${isSheet ? "text-base" : "text-xl"} font-semibold uppercase tracking-tight line-clamp-2 leading-none`}>{product?.title}</h3>
            <p className={`${isSheet ? "text-base" : "text-xl"} font-semibold text-primary tracking-tighter font-serif`}>₹{product?.price.toLocaleString()}</p>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">{product?.category || "Uncategorized"}</p>
        </div>

        <div className="pt-2 mt-auto space-y-2">
          <Button
            onClick={() => addToCart(product._id, 1)}
            className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[9px] gap-2 active:scale-95 transition-all"
          >
            <ShoppingCart size={14} /> Add to Cart
          </Button>
          {!isSheet && (
            <Button
              variant="ghost"
              onClick={() => navigate(`/products/${product._id}`)}
              className="w-full h-12 rounded-xl text-[9px] font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-900 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all font-sans"
            >
              Details <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItemCard;


