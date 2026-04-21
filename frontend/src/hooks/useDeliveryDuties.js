import { useState, useEffect, useCallback } from "react";
import { useDelivery } from "@/context/DeliveryBoyContext";
import { Truck, CheckCircle2, Box, Activity } from "lucide-react";

export const STATUS_CONFIG = {
  shipped: { label: "In Transit", color: "bg-blue-50 text-blue-600", icon: Truck },
  delivered: { label: "Finalized", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  packed: { label: "Deployment Ready", color: "bg-amber-50 text-amber-600", icon: Box },
};

export const useDeliveryDuties = () => {
  const { assignedOrders, fetchAssignedOrders, updateOrderStatus } = useDelivery();
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  useEffect(() => {
    fetchAssignedOrders();
  }, [fetchAssignedOrders]);

  const handleStatusChange = useCallback(async (orderId, newStatus) => {
    setLoadingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      await fetchAssignedOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingOrderId(null);
    }
  }, [updateOrderStatus, fetchAssignedOrders]);

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status] || { label: status, color: "bg-slate-100 text-slate-500", icon: Activity };
  };

  return { assignedOrders, loadingOrderId, handleStatusChange, getStatusConfig };
};


