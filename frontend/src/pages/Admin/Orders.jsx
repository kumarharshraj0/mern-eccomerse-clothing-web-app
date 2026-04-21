import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import OrderPipelineHeader from "@/components/Admin/orders/OrderPipelineHeader";
import OrderCard from "@/components/Admin/orders/OrderCard";
import OrderManagementSheet from "@/components/Admin/orders/OrderManagementSheet";

export default function Orders() {
  const { orders, loading, fetchOrders, updateOrderStatus, assignDelivery, deliveryBoys, fetchAllDeliveryBoys } = useAdmin();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [deliveryBoy, setDeliveryBoy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    fetchOrders(); fetchAllDeliveryBoys();
  }, []);

  const handleManage = (order) => {
    setCurrentOrder(order); setStatus(order.status);
    setDeliveryBoy(order.deliveryAssignedTo?._id || ""); setSheetOpen(true);
  };

  const handleUpdate = async () => {
    if (status !== currentOrder.status) await updateOrderStatus(currentOrder._id, status);
    if (deliveryBoy && deliveryBoy !== currentOrder.deliveryAssignedTo?._id) await assignDelivery(currentOrder._id, deliveryBoy);
    setSheetOpen(false);
  };

  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const lastWeekOrders = orders.filter((o) => new Date(o.createdAt) >= oneWeekAgo);

  const groupOrdersByDate = (orders) => {
    const groups = {};
    orders.forEach((o) => {
      const d = new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      if (!groups[d]) groups[d] = []; groups[d].push(o);
    });
    return Object.keys(groups).sort((a, b) => new Date(b) - new Date(a)).reduce((obj, k) => { obj[k] = groups[k]; return obj; }, {});
  };

  const grouped = groupOrdersByDate(lastWeekOrders);
  const dateKeys = Object.keys(grouped);
  const totalPages = Math.ceil(dateKeys.length / perPage);
  const paginatedKeys = dateKeys.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (loading) return <div className="py-32 flex flex-col items-center justify-center animate-pulse"><div className="w-12 h-12 bg-slate-100 rounded-2xl mb-4" /><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">Updating System...</p></div>;

  return (
    <div className="space-y-12">
      <OrderPipelineHeader />
      <div className="space-y-16">
        {paginatedKeys.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200"><PackageCheck size={40} /></div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">No active transmissions in current range</p>
          </div>
        ) : (
          paginatedKeys.map((date) => (
            <section key={date} className="relative">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-px flex-1 bg-slate-100" /><div className="flex items-center gap-2 px-6 py-2 bg-slate-900 rounded-full text-white"><Calendar size={12} className="opacity-60" /><h2 className="text-[10px] font-semibold uppercase tracking-[0.2em]">{date}</h2></div><div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {grouped[date].map((o, i) => <OrderCard key={o._id} order={o} i={i} onManage={handleManage} />)}
              </div>
            </section>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <footer className="flex justify-center gap-4 pt-8">
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} variant="outline" className="rounded-xl h-12 w-12 p-0 border-slate-200"><ChevronLeft size={20} /></Button>
          <div className="flex items-center bg-white px-6 rounded-xl border border-slate-200 font-semibold text-xs uppercase tracking-widest">Cycle {currentPage} / {totalPages}</div>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} variant="outline" className="rounded-xl h-12 w-12 p-0 border-slate-200"><ChevronRight size={20} /></Button>
        </footer>
      )}
      <OrderManagementSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} currentOrder={currentOrder} status={status} setStatus={setStatus} deliveryBoy={deliveryBoy} setDeliveryBoy={setDeliveryBoy} deliveryBoys={deliveryBoys} handleUpdate={handleUpdate} />
    </div>
  );
}



