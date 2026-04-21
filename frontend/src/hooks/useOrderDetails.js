import { useEffect, useState, useCallback } from "react";
import { useOrders } from "@/context/OrderContext";
import { Clock, CheckCircle2, Truck, Box } from "lucide-react";

export const useOrderDetails = (id) => {
  const { getOrder, loading } = useOrders();
  const [order, setOrder] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      console.log("Order fetch error", err);
    }
  }, [id, getOrder]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

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

  return { order, loading, getStatusConfig };
};


