import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptyWishlist = ({ isSheet }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center space-y-6 ${isSheet ? "p-6" : "py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20"}`}
    >
      <div className={`${isSheet ? "w-16 h-16" : "w-24 h-24"} bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 relative`}>
        <Heart size={isSheet ? 32 : 48} />
      </div>
      <div className="space-y-2">
        <h2 className={`${isSheet ? "text-lg" : "text-2xl"} font-semibold tracking-tighter uppercase`}>Your Wishlist is Empty</h2>
        <p className="text-slate-400 text-xs font-medium font-serif max-w-xs mx-auto">Save items you love for later.</p>
      </div>
      <Button 
        size={isSheet ? "sm" : "xl"} 
        onClick={() => navigate("/shop")} 
        className="rounded-2xl font-semibold uppercase tracking-widest text-[10px] gap-2 bg-slate-900 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        Browse Collection <ArrowRight size={14} />
      </Button>
    </motion.div>
  );
};

export default EmptyWishlist;


