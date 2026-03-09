import { useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  ShoppingBag,
  Package,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyOrders() {
  const { orders, fetchMyOrders, loading, cancelOrder, returnOrder } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const getStatusConfig = (status) => {
    const config = {
      pending: { color: "text-amber-500 bg-amber-50 border-amber-100", icon: Clock },
      paid: { color: "text-blue-500 bg-blue-50 border-blue-100", icon: CheckCircle2 },
      shipped: { color: "text-indigo-500 bg-indigo-50 border-indigo-100", icon: Truck },
      delivered: { color: "text-green-500 bg-green-50 border-green-100", icon: CheckCircle2 },
      cancelled: { color: "text-red-500 bg-red-50 border-red-100", icon: Search },
      returning: { color: "text-orange-500 bg-orange-50 border-orange-100", icon: Clock },
      returned: { color: "text-slate-500 bg-slate-50 border-slate-100", icon: Package },
    };
    return config[status.toLowerCase()] || config.pending;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Package size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Acquisition Archive</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">My Orders</h1>
            <p className="text-slate-500 font-medium font-serif italic text-lg">Tracking your curated collection of premium assets</p>
          </div>

          <div className="flex bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
            <div className="px-6 py-2 border-r border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Orders</p>
              <p className="text-xl font-black text-slate-900">{orders.length}</p>
            </div>
            <div className="px-6 py-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Duty</p>
              <p className="text-xl font-black text-primary">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retrieving Secure Archive...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
              <ShoppingBag size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">No acquisitions found</h2>
              <p className="text-slate-400 font-medium font-serif italic max-w-xs mx-auto">Initialize your collection by exploring our premier catalog</p>
            </div>
            <Button size="lg" onClick={() => navigate("/shop")} className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3">
              Begin Exploration <ArrowRight size={16} />
            </Button>
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {orders.map((order, idx) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">

                    <div className="space-y-6 flex-1">
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge className={`${statusConfig.color} border font-black uppercase tracking-[0.2em] text-[8px] h-8 px-4 rounded-full flex items-center gap-2`}>
                          <StatusIcon size={12} /> {order.status}
                        </Badge>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Ref ID: {order._id.slice(-12).toUpperCase()}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition Date</p>
                          <p className="font-bold text-slate-900 line-clamp-1">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
                          <p className="font-black text-slate-900 text-lg">₹{order.total.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset Count</p>
                          <p className="font-bold text-slate-900">{order.items?.length} Unique Items</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Status</p>
                          <p className={`font-bold uppercase text-[10px] ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>{order.paymentStatus}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                      {(['created', 'paid', 'packed'].includes(order.status.toLowerCase())) && (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this order?")) {
                              cancelOrder(order._id);
                            }
                          }}
                          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all border border-red-100 lg:border-none"
                        >
                          Cancel Order
                        </Button>
                      )}
                      {(order.status.toLowerCase() === 'delivered') && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to return this order?")) {
                              returnOrder(order._id);
                            }
                          }}
                          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 transition-all"
                        >
                          Return Order
                        </Button>
                      )}
                      <Button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-none"
                      >
                        Technical Details
                      </Button>
                      <Button
                        onClick={() => navigate(`/order-success/${order._id}`)}
                        className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 bg-slate-900 text-white hover:scale-[1.05] transition-all shadow-xl shadow-slate-200"
                      >
                        Status Pipeline <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
