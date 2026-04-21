import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const OrderSuccessHero = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="w-32 h-32 bg-primary rounded-[3rem] mx-auto flex items-center justify-center text-white shadow-2xl shadow-primary/40 relative"
      >
        <CheckCircle2 size={64} strokeWidth={2.5} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary rounded-[3rem] -z-10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-center gap-2 text-primary">
          <Sparkles size={16} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Order Confirmed</span>
          <Sparkles size={16} />
        </div>
        <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-slate-900 uppercase leading-[0.9]">Order<br /><span className="text-primary">Confirmed!</span></h1>
        <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto pt-4 font-serif">Your order has been placed and is being processed.</p>
      </motion.div>
    </div>
  );
};

export default OrderSuccessHero;


