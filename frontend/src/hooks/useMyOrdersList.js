import { useEffect, useCallback } from "react";
import { useOrders } from "@/context/OrderContext";
import { Clock, CheckCircle2, Truck, Search, Package } from "lucide-react";

export const useMyOrdersList = () => {
  const { orders, fetchMyOrders, loading, cancelOrder, returnOrder } = useOrders();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const getStatusConfig = useCallback((status) => {
    const config = {
      pending: { color: "text-amber-500 bg-amber-50 border-amber-100", icon: Clock },
      paid: { color: "text-blue-500 bg-blue-50 border-blue-100", icon: CheckCircle2 },
      shipped: { color: "text-indigo-500 bg-indigo-50 border-indigo-100", icon: Truck },
      delivered: { color: "text-green-500 bg-green-50 border-green-100", icon: CheckCircle2 },
      cancelled: { color: "text-red-500 bg-red-50 border-red-100", icon: Search },
      returning: { color: "text-orange-500 bg-orange-50 border-orange-100", icon: Clock },
      returned: { color: "text-slate-500 bg-slate-50 border-slate-100", icon: Package },
    };
    return config[status?.toLowerCase()] || config.pending;
  }, []);

  const inProgressCount = orders.filter(
    o => o.status !== "delivered" && o.status !== "cancelled"
  ).length;

  return { 
    orders, loading, cancelOrder, returnOrder, 
    getStatusConfig, inProgressCount 
  };
};


