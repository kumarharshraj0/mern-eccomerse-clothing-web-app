import { useEffect, useState } from "react";
import {
  Eye,
  PackageCheck,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  User,
  CreditCard,
  MapPin,
  Calendar,
  MoreVertical,
  Activity
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_CONFIG = {
  created: { label: "Pending", color: "bg-slate-100 text-slate-500", icon: Clock },
  paid: { label: "Fulfillment", color: "bg-indigo-50 text-indigo-600", icon: CreditCard },
  packed: { label: "Configured", color: "bg-amber-50 text-amber-600", icon: PackageCheck },
  shipped: { label: "In Transit", color: "bg-blue-50 text-blue-600", icon: Truck },
  delivered: { label: "Finalized", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  cancelled: { label: "Terminated", color: "bg-rose-50 text-rose-600", icon: XCircle },
};

export default function Orders() {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
    assignDelivery,
    deliveryBoys,
    fetchAllDeliveryBoys,
  } = useAdmin();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [deliveryBoy, setDeliveryBoy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    fetchOrders();
    fetchAllDeliveryBoys();
  }, []);

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setStatus(order.status);
    setDeliveryBoy(order.deliveryAssignedTo?._id || "");
    setSheetOpen(true);
  };

  const handleUpdate = async () => {
    try {
      if (status !== currentOrder.status) {
        await updateOrderStatus(currentOrder._id, status);
      }
      if (deliveryBoy && deliveryBoy !== currentOrder.deliveryAssignedTo?._id) {
        await assignDelivery(currentOrder._id, deliveryBoy);
      }
      setSheetOpen(false);
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const lastWeekOrders = orders.filter((order) => new Date(order.createdAt) >= oneWeekAgo);

  const groupOrdersByDate = (orders) => {
    const groups = {};
    orders.forEach((order) => {
      const dateKey = new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(order);
    });
    return Object.keys(groups)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {});
  };

  const groupedOrders = groupOrdersByDate(lastWeekOrders);
  const dateKeys = Object.keys(groupedOrders);
  const totalPages = Math.ceil(dateKeys.length / perPage);
  const paginatedDateKeys = dateKeys.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (loading) return (
    <div className="py-32 flex flex-col items-center justify-center animate-pulse">
      <div className="w-12 h-12 bg-slate-100 rounded-2xl mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Synchronizing Pipeline...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Dynamic Orders Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Activity size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module 03: Fulfillment</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Order Pipeline</h1>
          <p className="text-slate-500 font-medium font-serif italic text-lg">Tracking commerce velocity in real-time</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[9px]">
            Live Feed Active
          </Badge>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
        </div>
      </header>

      {/* Grouped Order Stream */}
      <div className="space-y-16">
        {paginatedDateKeys.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
              <PackageCheck size={40} />
            </div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No active transmissions in current range</p>
          </div>
        ) : (
          paginatedDateKeys.map((date) => (
            <section key={date} className="relative">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-px flex-1 bg-slate-100" />
                <div className="flex items-center gap-2 px-6 py-2 bg-slate-900 rounded-full text-white">
                  <Calendar size={12} className="opacity-60" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">{date}</h2>
                </div>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {groupedOrders[date].map((order, i) => {
                  const Config = STATUS_CONFIG[order.status] || STATUS_CONFIG.created;
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all p-8 flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Transmission ID</p>
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate max-w-[150px]">#{order._id.slice(-8)}</h3>
                        </div>
                        <Badge className={`${Config.color} rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-none border-none`}>
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
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Originator</p>
                            <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{order.user?.firstName} {order.user?.lastName}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                          <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Valuation</p>
                            <p className="text-lg font-black text-slate-900 tracking-tighter">₹{order.total.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Sync Time</p>
                            <p className="text-xs font-black text-slate-600 uppercase tracking-widest">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Truck size={12} />
                          </div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            {order.deliveryAssignedTo ? order.deliveryAssignedTo.name : "Unassigned"}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => handleViewOrder(order)} className="bg-slate-900 rounded-xl text-white font-black uppercase tracking-widest text-[9px] px-4 hover:scale-[1.02] active:scale-95 transition-all">
                          Manage
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Pipeline Navigation */}
      {totalPages > 1 && (
        <footer className="flex justify-center gap-4 pt-8">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            variant="outline"
            className="rounded-xl h-12 w-12 p-0 border-slate-200"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center bg-white px-6 rounded-xl border border-slate-200 font-black text-xs uppercase tracking-widest">
            Cycle {currentPage} / {totalPages}
          </div>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            variant="outline"
            className="rounded-xl h-12 w-12 p-0 border-slate-200"
          >
            <ChevronRight size={20} />
          </Button>
        </footer>
      )}

      {/* Control Surface Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="max-w-md w-full border-none shadow-2xl p-0">
          <div className="h-full flex flex-col bg-white">
            <SheetHeader className="p-10 border-b border-slate-50">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Control Surface</span>
                <SheetTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                  Manage Transmission
                </SheetTitle>
              </div>
            </SheetHeader>

            {currentOrder && (
              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                <section className="space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">01</div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Pipeline Status</h4>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Current State</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50 font-black uppercase tracking-widest text-xs">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                        {Object.keys(STATUS_CONFIG).map((s) => (
                          <SelectItem key={s} value={s} className="font-black uppercase tracking-widest text-[10px] py-3">{STATUS_CONFIG[s].label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">02</div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Logistics Assignment</h4>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fulfillment Lead</Label>
                    <Select value={deliveryBoy} onValueChange={setDeliveryBoy}>
                      <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50 font-black uppercase tracking-widest text-xs">
                        <SelectValue placeholder="Select Deployment Lead" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                        {deliveryBoys.map((boy) => (
                          <SelectItem key={boy._id} value={boy._id} className="font-black uppercase tracking-widest text-[10px] py-3">{boy.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </section>
              </div>
            )}

            <div className="p-10 border-t border-slate-100 bg-slate-50/50">
              <Button
                size="xl"
                onClick={handleUpdate}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:scale-[1.01] active:scale-95 transition-all"
              >
                Sync Pipeline Changes
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
