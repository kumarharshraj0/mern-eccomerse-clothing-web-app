import React from "react";
import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeliveryBoySidebar from "@/components/DeliveryBoySidebar";
import DeliveryDutiesHeader from "@/components/delivery/DeliveryDutiesHeader";
import AssignedDutyCard from "@/components/delivery/AssignedDutyCard";
import { useDeliveryDuties } from "@/hooks/useDeliveryDuties";

const DeliveryBoyAssignedOrders = () => {
  const dd = useDeliveryDuties();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="fixed inset-y-0 z-50">
        <DeliveryBoySidebar />
      </div>

      <div className="flex-1 ml-0 md:ml-64 p-8 md:p-12 space-y-12">
        <DeliveryDutiesHeader count={dd.assignedOrders.length} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {dd.assignedOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
                  <Zap size={40} />
                </div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">No active duties assigned to your Driver ID</p>
              </motion.div>
            ) : (
              dd.assignedOrders.map((order, i) => (
                <AssignedDutyCard 
                  key={order._id}
                  i={i}
                  order={order}
                  config={dd.getStatusConfig(order.status)}
                  loadingOrderId={dd.loadingOrderId}
                  handleStatusChange={dd.handleStatusChange}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyAssignedOrders;


