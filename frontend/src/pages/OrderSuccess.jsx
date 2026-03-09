import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "../context/OrderContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getOrder } = useOrders();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError("Unable to retrieve technical confirmation.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, getOrder]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error || !order)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500">
          <Package size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Confirmation Error</h2>
        <p className="text-slate-500 font-medium font-serif italic max-w-xs mx-auto">{error}</p>
        <Button onClick={() => navigate("/")} className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px]">Return to Base</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-12 lg:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center space-y-12 relative z-10">

        {/* Success Animation Header */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Acquisition Verified</span>
              <Sparkles size={16} />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">Success.<br /><span className="text-primary italic font-serif lowercase">confirmed.</span></h1>
            <p className="text-slate-500 font-medium font-serif italic text-lg max-w-sm mx-auto pt-4">Your premium selection has been registered in our global fulfillment network.</p>
          </motion.div>
        </div>

        {/* Order Briefing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 rounded-[3rem] border border-slate-100 p-10 lg:p-12 text-left space-y-8 shadow-2xl shadow-slate-200/50"
        >
          <div className="flex justify-between items-start border-b border-slate-200/50 pb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Order ID</p>
              <p className="text-xl font-black text-slate-900 tracking-tighter uppercase">{order._id.slice(-16)}</p>
            </div>
            <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-100 font-black uppercase tracking-widest text-[8px] h-8 px-4 rounded-full">Secure Entry</Badge>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold text-slate-900 uppercase text-xs">{order.status}</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Settlement</p>
              <p className={`font-bold uppercase text-xs ${order.paymentStatus === 'paid' ? 'text-blue-500' : 'text-amber-500'}`}>{order.paymentStatus}</p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Final Clearance</p>
              <p className="text-xl font-black text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-colors" onClick={() => navigate(`/orders/${order._id}`)}>
            <div className="flex items-center gap-4">
              <Package size={20} className="text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-900">Detailed Logistics Briefing</span>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
          </div>
        </motion.div>

        {/* Global Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button
            size="xl"
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:scale-[1.05] transition-all gap-3"
          >
            Continue Exploration <ArrowRight size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/my-orders")}
            className="w-full sm:w-auto h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            Access Acquisitions
          </Button>
        </motion.div>

        {/* Security Footer */}
        <div className="pt-12 flex items-center justify-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          <ShieldCheck size={14} /> Global Transaction Protection Active
        </div>

      </div>
    </div>
  );
}
