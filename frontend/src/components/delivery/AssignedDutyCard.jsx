import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AssignedDutyCard = ({ i, order, config, loadingOrderId, handleStatusChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col"
    >
      <div className="p-8 space-y-8 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Transmission ID</p>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-tight">#{order._id.slice(-8)}</h3>
          </div>
          <Badge className={`${config.color} rounded-lg px-3 py-1 text-[9px] font-semibold uppercase tracking-widest shadow-none border-none`}>
            <config.icon size={10} className="mr-1.5" />
            {config.label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                <User size={16} />
              </div>
              <div>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Recipient</p>
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-tight">{order.user?.name || "Citizen"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Coordinates</p>
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-tight truncate">{order.shippingDetails?.address || "Restricted Info"}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Valuation</p>
              <p className="text-lg font-semibold text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Protocol</p>
              <div className="flex items-center gap-1.5 text-indigo-600">
                <CreditCard size={10} />
                <span className="text-[10px] font-semibold uppercase tracking-widest">Prepaid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 pt-4 border-t border-slate-50 bg-slate-50/20 flex gap-4">
        {order.status !== "delivered" ? (
          <>
            <Button
              size="lg"
              variant="outline"
              disabled={loadingOrderId === order._id || order.status === "shipped"}
              onClick={() => handleStatusChange(order._id, "shipped")}
              className="flex-1 h-16 rounded-2xl border-slate-200 font-semibold uppercase tracking-widest text-[10px] hover:bg-white transition-all gap-2"
            >
              <Truck size={14} /> Initiate Transit
            </Button>
            <Button
              size="lg"
              disabled={loadingOrderId === order._id || order.status !== "shipped"}
              onClick={() => handleStatusChange(order._id, "delivered")}
              className="flex-1 h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all gap-2"
            >
              <CheckCircle2 size={14} /> Confirm Delivery
            </Button>
          </>
        ) : (
          <div className="w-full flex items-center justify-center py-4 gap-3 text-emerald-600">
            <CheckCircle2 size={18} />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Duty Successfully Finalized</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AssignedDutyCard;


