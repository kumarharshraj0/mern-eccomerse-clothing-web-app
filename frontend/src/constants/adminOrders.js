import { Clock, CreditCard, PackageCheck, Truck, CheckCircle2, XCircle } from "lucide-react";

export const STATUS_CONFIG = {
  created: { label: "Pending", color: "bg-slate-100 text-slate-500", icon: Clock },
  paid: { label: "Fulfillment", color: "bg-indigo-50 text-indigo-600", icon: CreditCard },
  packed: { label: "Configured", color: "bg-amber-50 text-amber-600", icon: PackageCheck },
  shipped: { label: "In Transit", color: "bg-blue-50 text-blue-600", icon: Truck },
  delivered: { label: "Finalized", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  cancelled: { label: "Terminated", color: "bg-rose-50 text-rose-600", icon: XCircle },
};


