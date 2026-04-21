import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderCard = ({ idx, order, statusConfig, cancelOrder, returnOrder }) => {
  const navigate = useNavigate();
  const StatusIcon = statusConfig.icon;

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(order._id);
    }
  };

  const handleReturn = () => {
    if (window.confirm("Are you sure you want to return this order?")) {
      returnOrder(order._id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group"
    >
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-6 flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <Badge className={`${statusConfig.color} border font-semibold uppercase tracking-[0.2em] text-[8px] h-8 px-4 rounded-full flex items-center gap-2`}>
              <StatusIcon size={12} /> {order.status}
            </Badge>
            <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em]">Ref ID: {order._id.slice(-12).toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Order Date</p>
              <p className="font-semibold text-slate-900 line-clamp-1">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total</p>
              <p className="font-semibold text-slate-900 text-lg">₹{order.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Items</p>
              <p className="font-semibold text-slate-900">{order.items?.length} Assets</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Payment Status</p>
              <p className={`font-semibold uppercase text-[10px] ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>{order.paymentStatus}</p>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
          {(['created', 'paid', 'packed'].includes(order.status.toLowerCase())) && (
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="h-14 px-8 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all border border-red-100 lg:border-none"
            >
              Cancel Order
            </Button>
          )}
          {(order.status.toLowerCase() === 'delivered') && (
            <Button
              variant="outline"
              onClick={handleReturn}
              className="h-14 px-8 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 transition-all"
            >
              Return Order
            </Button>
          )}
          <Button
            onClick={() => navigate(`/orders/${order._id}`)}
            className="h-14 px-8 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-none"
          >
            View Details
          </Button>
          <Button
            onClick={() => navigate(`/order-success/${order._id}`)}
            className="h-14 px-8 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 bg-slate-900 text-white hover:scale-[1.05] transition-all shadow-xl shadow-slate-200"
          >
            Track Order <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;


