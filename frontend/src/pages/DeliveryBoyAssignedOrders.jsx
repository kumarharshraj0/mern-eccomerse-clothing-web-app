import React, { useEffect, useState } from "react";
import { useDelivery } from "@/context/DeliveryBoyContext";
import {
  Package,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Truck,
  ChevronRight,
  Activity,
  Zap,
  Box,
  CreditCard
} from "lucide-react";
import DeliveryBoySidebar from "@/components/DeliveryBoySidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_CONFIG = {
  shipped: { label: "In Transit", color: "bg-blue-50 text-blue-600", icon: Truck },
  delivered: { label: "Finalized", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  packed: { label: "Deployment Ready", color: "bg-amber-50 text-amber-600", icon: Box },
};

const DeliveryBoyAssignedOrders = () => {
  const { assignedOrders, fetchAssignedOrders, updateOrderStatus } = useDelivery();
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      await fetchAssignedOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <div className="fixed inset-y-0 z-50">
        <DeliveryBoySidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-64 p-8 md:p-12 space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Package size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Module 01</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Fleet Duties</h1>
            <p className="text-slate-500 font-medium font-serif italic text-lg">Active fulfillment tasks & secure handovers</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[9px]">
              {assignedOrders.length} Duties Pending
            </Badge>
          </div>
        </header>

        {/* Duties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {assignedOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
                  <Zap size={40} />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No active duties assigned to your fleet ID</p>
              </motion.div>
            ) : (
              assignedOrders.map((order, i) => {
                const Config = STATUS_CONFIG[order.status] || { label: order.status, color: "bg-slate-100 text-slate-500", icon: Activity };
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col"
                  >
                    <div className="p-8 space-y-8 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Transmission ID</p>
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">#{order._id.slice(-8)}</h3>
                        </div>
                        <Badge className={`${Config.color} rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-none border-none`}>
                          <Config.icon size={10} className="mr-1.5" />
                          {Config.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <User size={16} />
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Recipient</p>
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{order.user?.name || "Citizen"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <MapPin size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Coordinates</p>
                              <p className="text-xs font-black text-slate-700 uppercase tracking-tight truncate">{order.shippingDetails?.address || "Restricted Info"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-50 space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valuation</p>
                            <p className="text-lg font-black text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                            <div className="flex items-center gap-1.5 text-indigo-600">
                              <CreditCard size={10} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Prepaid</span>
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
                            className="flex-1 h-16 rounded-2xl border-slate-200 font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all gap-2"
                          >
                            <Truck size={14} /> Initiate Transit
                          </Button>
                          <Button
                            size="lg"
                            disabled={loadingOrderId === order._id || order.status !== "shipped"}
                            onClick={() => handleStatusChange(order._id, "delivered")}
                            className="flex-1 h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all gap-2"
                          >
                            <CheckCircle2 size={14} /> Confirm Delivery
                          </Button>
                        </>
                      ) : (
                        <div className="w-full flex items-center justify-center py-4 gap-3 text-emerald-600">
                          <CheckCircle2 size={18} />
                          <span className="text-xs font-black uppercase tracking-[0.3em]">Duty Successfully Finalized</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyAssignedOrders;
