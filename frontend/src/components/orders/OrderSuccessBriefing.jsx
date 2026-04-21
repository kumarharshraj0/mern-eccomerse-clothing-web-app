import React from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrderSuccessBriefing = ({ order, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-slate-50 rounded-[3rem] border border-slate-100 p-10 lg:p-12 text-left space-y-8 shadow-2xl shadow-slate-200/50"
    >
      <div className="flex justify-between items-start border-b border-slate-200/50 pb-8">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Order ID</p>
          <p className="text-xl font-semibold text-slate-900 tracking-tighter uppercase">{order._id.slice(-16)}</p>
        </div>
        <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-100 font-semibold uppercase tracking-widest text-[8px] h-8 px-4 rounded-full">Confirmed</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-semibold text-slate-900 uppercase text-xs">{order.status}</span>
          </div>
        </div>
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Payment</p>
          <p className={`font-semibold uppercase text-xs ${order.paymentStatus === 'paid' ? 'text-blue-500' : 'text-amber-500'}`}>{order.paymentStatus}</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total</p>
          <p className="text-xl font-semibold text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
        </div>
      </div>

      <div 
        className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-colors" 
        onClick={() => navigate(`/orders/${order._id}`)}
      >
        <div className="flex items-center gap-4">
          <Package size={20} className="text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-900">View Order Details</span>
        </div>
        <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
      </div>
    </motion.div>
  );
};

export default OrderSuccessBriefing;


