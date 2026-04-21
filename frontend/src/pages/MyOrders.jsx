import React from "react";
import { useMyOrdersList } from "@/hooks/useMyOrdersList";
import { motion, AnimatePresence } from "framer-motion";
import OrderListHeader from "@/components/orders/OrderListHeader";
import EmptyOrdersState from "@/components/orders/EmptyOrdersState";
import OrderCard from "@/components/orders/OrderCard";

export default function MyOrders() {
  const ml = useMyOrdersList();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <OrderListHeader 
          totalCount={ml.orders.length} 
          inProgressCount={ml.inProgressCount} 
        />

        {ml.loading && (
          <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Loading orders...</p>
          </div>
        )}

        {!ml.loading && ml.orders.length === 0 && <EmptyOrdersState />}

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {ml.orders.map((order, idx) => (
              <OrderCard 
                key={order._id} 
                idx={idx} 
                order={order} 
                statusConfig={ml.getStatusConfig(order.status)} 
                cancelOrder={ml.cancelOrder} 
                returnOrder={ml.returnOrder} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


