import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import OrderDetailsStatus from "@/components/orders/OrderDetailsStatus";
import OrderDetailsAssets from "@/components/orders/OrderDetailsAssets";
import OrderDetailsSidebar from "@/components/orders/OrderDetailsSidebar";

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const od = useOrderDetails(id);

  if (od.loading && !od.order) return <div className="min-h-screen flex items-center justify-center bg-slate-50/50"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!od.order) return null;

  const statusConfig = od.getStatusConfig(od.order.status);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <nav className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/my-orders")} className="rounded-xl h-12 gap-2 text-slate-500 hover:text-slate-900 transition-colors px-0 hover:bg-transparent"><ArrowLeft size={18} /> Back to Acquisitions</Button>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">Order Details // OID-{od.order._id.slice(-6).toUpperCase()}</p>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div className="space-y-8">
            <OrderDetailsStatus order={od.order} statusConfig={statusConfig} />
            <OrderDetailsAssets items={od.order.items} />
          </div>
          <OrderDetailsSidebar order={od.order} />
        </div>
      </div>
    </div>
  );
}


