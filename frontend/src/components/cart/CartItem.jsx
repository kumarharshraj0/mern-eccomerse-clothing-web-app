import React from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CartItem = ({ item, idx, isSheet, updateQuantity, removeFromCart }) => {
  const productId = item.product?._id || item.product;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 lg:gap-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
    >
      {/* Image */}
      <div className={`relative w-full ${isSheet ? "sm:w-24" : "sm:w-40"} aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-slate-50 shrink-0`}>
        <img
          src={item?.image?.url || item?.image || item?.product?.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-2 lg:space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 lg:space-y-1">
              <h3 className={`${isSheet ? "text-sm" : "text-lg lg:text-xl"} font-semibold text-slate-900 tracking-tight leading-tight line-clamp-2`}>{item.title}</h3>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">₹{item.price.toLocaleString()}</p>
            </div>
            <button onClick={() => removeFromCart(productId)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
              <Trash2 size={16} />
            </button>
          </div>
          {!isSheet && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg border-0 text-[10px]">In Stock</Badge>
              {item.size && <Badge variant="outline" className="text-slate-400 font-semibold border-slate-200 text-[10px]">Size: {item.size}</Badge>}
            </div>
          )}
        </div>

        {/* Controls Area */}
        <div className={`flex items-center justify-between mt-4 ${isSheet ? "mt-2" : "mt-8"}`}>
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg lg:rounded-xl p-0.5 shrink-0">
            <button
              onClick={() => updateQuantity(productId, Math.max(1, item.qty - 1))}
              className={`${isSheet ? "w-7 h-7" : "w-10 h-10"} flex items-center justify-center hover:bg-white rounded-md lg:rounded-lg transition-colors`}
            >
              <Minus size={isSheet ? 12 : 16} />
            </button>
            <span className={`${isSheet ? "w-6 text-xs" : "w-10 text-sm"} text-center font-semibold`}>{item.qty}</span>
            <button
              onClick={() => updateQuantity(productId, item.qty + 1)}
              className={`${isSheet ? "w-7 h-7" : "w-10 h-10"} flex items-center justify-center hover:bg-white rounded-md lg:rounded-lg transition-colors`}
            >
              <Plus size={isSheet ? 12 : 16} />
            </button>
          </div>
          <p className={`${isSheet ? "text-base" : "text-xl lg:text-2xl"} font-semibold text-slate-900 tracking-tight`}>
            ₹{(item.price * item.qty).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;


