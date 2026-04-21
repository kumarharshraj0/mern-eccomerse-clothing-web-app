import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptyOrdersState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
    >
      <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
        <ShoppingBag size={48} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tighter text-slate-900 uppercase">No orders yet</h2>
        <p className="text-slate-400 font-medium max-w-xs mx-auto">Start shopping to see your orders here</p>
      </div>
      <Button 
        size="lg" 
        onClick={() => navigate("/shop")} 
        className="h-16 px-10 rounded-2xl font-semibold uppercase tracking-widest text-[10px] gap-3 shadow-2xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all"
      >
        Begin Shopping <ArrowRight size={16} />
      </Button>
    </motion.div>
  );
};

export default EmptyOrdersState;


