import React from "react";
import { motion } from "framer-motion";
import { User, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATUS_CONFIG } from "@/constants/adminOrders";

const OrderCard = ({ order, i, onManage }) => {
  const Config = STATUS_CONFIG[order.status] || STATUS_CONFIG.created;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all p-8 flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Transmission ID</p>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-tight truncate max-w-[150px]">#{order._id.slice(-8)}</h3>
        </div>
        <Badge className={`${Config.color} rounded-lg px-3 py-1 text-[9px] font-semibold uppercase tracking_widest shadow-none border-none`}>
          <Config.icon size={10} className="mr-1.5" />
          {Config.label}
        </Badge>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            <User size={14} />
          </div>
          <div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Originator</p>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-tight">{order.user?.firstName} {order.user?.lastName}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
          <div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Valuation</p>
            <p className="text-lg font-semibold text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Sync Time</p>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Truck size={12} />
          </div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
            {order.deliveryAssignedTo ? order.deliveryAssignedTo.name : "Unassigned"}
          </p>
        </div>
        <Button size="sm" onClick={() => onManage(order)} className="bg-slate-900 rounded-xl text-white font-semibold uppercase tracking-widest text-[9px] px-4 hover:scale-[1.02] active:scale-95 transition-all">
          Manage
        </Button>
      </div>
    </motion.div>
  );
};

export default OrderCard;


