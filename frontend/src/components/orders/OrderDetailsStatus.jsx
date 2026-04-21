import React from "react";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const OrderDetailsStatus = ({ order, statusConfig }) => {
  const StatusIcon = statusConfig.icon;
  const statusSteps = ['Authorized', 'Processing', 'In Transit', 'Fulfillment'];
  const statusLevels = ['pending', 'paid', 'shipped', 'delivered'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 lg:p-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <Badge className={`${statusConfig.color} border font-semibold uppercase tracking-[0.2em] text-[10px] h-10 px-6 rounded-full flex items-center gap-2`}>
            <StatusIcon size={14} /> {statusConfig.label}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Order Execution</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span className="text-xs font-semibold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-slate-100" />
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="text-xs font-semibold uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1 text-center">Final Asset Value</p>
          <p className="text-3xl font-semibold text-primary tracking-tighter">₹{order.total.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
        {statusSteps.map((step, i) => {
          const isActive = i <= statusLevels.indexOf(order.status.toLowerCase());
          return (
            <div key={i} className="space-y-3">
              <div className={`h-1.5 rounded-full transition-colors duration-1000 ${isActive ? 'bg-primary' : 'bg-slate-100'}`} />
              <p className={`text-[9px] font-semibold uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{step}</p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default OrderDetailsStatus;


