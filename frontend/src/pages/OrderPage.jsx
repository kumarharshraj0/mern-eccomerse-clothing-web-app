import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import {
  Package,
  MapPin,
  CreditCard,
  ChevronLeft,
  Clock,
  CheckCircle2,
  Truck,
  Box,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, loading } = useOrders();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;
    const loadOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        console.log("Order fetch error", err);
      }
    };
    loadOrder();
  }, [id, getOrder]);

  const getStatusConfig = (status) => {
    const config = {
      pending: { color: "text-amber-500 bg-amber-50 border-amber-100", icon: Clock, label: "Processing Order" },
      paid: { color: "text-blue-500 bg-blue-50 border-blue-100", icon: CheckCircle2, label: "Payment Confirmed" },
      shipped: { color: "text-indigo-500 bg-indigo-50 border-indigo-100", icon: Truck, label: "In Transit" },
      delivered: { color: "text-green-500 bg-green-50 border-green-100", icon: CheckCircle2, label: "Fulfillment Complete" },
      cancelled: { color: "text-red-500 bg-red-50 border-red-100", icon: Box, label: "Order Voided" },
    };
    return config[status?.toLowerCase()] || config.pending;
  };

  if (loading && !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) return null;

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* Navigation & Breadcrumb */}
        <nav className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/my-orders")}
            className="rounded-xl h-12 gap-2 text-slate-500 hover:text-slate-900 transition-colors px-0 hover:bg-transparent"
          >
            <ArrowLeft size={18} /> Back to Acquisitions
          </Button>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Technical Briefing // OID-{order._id.slice(-6).toUpperCase()}</p>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

          <div className="space-y-8">
            {/* Status Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 lg:p-12"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4">
                  <Badge className={`${statusConfig.color} border font-black uppercase tracking-[0.2em] text-[10px] h-10 px-6 rounded-full flex items-center gap-2`}>
                    <StatusIcon size={14} /> {statusConfig.label}
                  </Badge>
                  <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Order Execution</h1>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span className="text-xs font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4 bg-slate-100" />
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span className="text-xs font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Final Asset Value</p>
                  <p className="text-3xl font-black text-primary tracking-tighter">₹{order.total.toLocaleString()}</p>
                </div>
              </div>

              {/* simulated tracking steps */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
                {['Authorized', 'Processing', 'In Transit', 'Fulfillment'].map((step, i) => {
                  const isActive = i <= (['pending', 'paid', 'shipped', 'delivered'].indexOf(order.status.toLowerCase()));
                  return (
                    <div key={i} className="space-y-3">
                      <div className={`h-1.5 rounded-full transition-colors duration-1000 ${isActive ? 'bg-primary' : 'bg-slate-100'}`} />
                      <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{step}</p>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Asset List */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
            >
              <div className="p-10 lg:p-12 border-b border-slate-50">
                <h3 className="text-xl font-black uppercase tracking-tight">Acquired Assets</h3>
              </div>

              <div className="p-10 lg:p-12 space-y-8">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-8 group">
                    <div className="w-full sm:w-32 aspect-square rounded-2xl bg-slate-50 overflow-hidden border border-slate-50 transition-all group-hover:shadow-lg">
                      <img src={item.image?.url || item.image || item.product?.images?.[0]?.url} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">{item.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Serial: {item.product?._id || 'UNIDENTIFIED'}</p>
                        </div>
                        <p className="text-xl font-black text-slate-900">₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="h-8 rounded-lg border-slate-100 text-slate-400 font-bold px-3">Unit: ₹{item.price.toLocaleString()}</Badge>
                        <Badge variant="outline" className="h-8 rounded-lg border-slate-100 text-slate-400 font-bold px-3">Quantity: {item.qty}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <aside className="space-y-8">
            {/* Logistics Card */}
            <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Logistics Hub</h3>
              </div>

              <div className="space-y-1 font-bold text-slate-900 text-sm leading-relaxed">
                <p>{order.shippingAddress?.fullName}</p>
                <p className="text-slate-400 font-medium">{order.shippingAddress?.street}</p>
                <p className="text-slate-400 font-medium">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2 flex items-center gap-2"><ShieldCheck size={12} /> Encrypted Contact: {order.shippingAddress?.phone}</p>
              </div>
            </section>

            {/* Payment Audit */}
            <section className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
                <CreditCard size={180} />
              </div>
              <div className="relative z-10 space-y-6 text-center">
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Financial Ledger</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Secure Payment</h3>
                </div>
                <div className="py-4 px-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Method</span>
                  <span className="font-black uppercase text-xs">{order.paymentMethod}</span>
                </div>
                <div className="py-4 px-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Ledger Status</span>
                  <Badge className={`${order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-amber-500'} text-white font-black uppercase text-[8px] h-6 border-0`}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white hover:text-slate-900 font-black uppercase tracking-widest text-[9px] gap-2">
                  <ExternalLink size={14} /> View Invoice Receipt
                </Button>
              </div>
            </section>
          </aside>

        </div>
      </div>
    </div>
  );
}
