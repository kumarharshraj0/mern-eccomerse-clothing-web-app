import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Package } from "lucide-react";
import { useOrderSuccess } from "@/hooks/useOrderSuccess";
import { Button } from "@/components/ui/button";
import OrderSuccessHero from "@/components/orders/OrderSuccessHero";
import OrderSuccessBriefing from "@/components/orders/OrderSuccessBriefing";

export default function OrderSuccess() {
  const os = useOrderSuccess();

  if (os.loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (os.error || !os.order)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500">
          <Package size={40} />
        </div>
        <h2 className="text-2xl font-semibold uppercase tracking-tighter text-slate-900">Confirmation Error</h2>
        <p className="text-slate-500 font-medium font-serif max-w-xs mx-auto">{os.error}</p>
        <Button onClick={() => os.navigate("/")} className="rounded-2xl h-14 px-8 font-semibold uppercase tracking-widest text-[10px]">Return to Base</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-12 lg:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center space-y-12 relative z-10">
        <OrderSuccessHero />
        
        <OrderSuccessBriefing order={os.order} navigate={os.navigate} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button
            size="xl"
            onClick={() => os.navigate("/shop")}
            className="w-full sm:w-auto h-16 px-12 rounded-2xl font-semibold uppercase tracking-widest text-[10px] bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:scale-[1.05] transition-all gap-3"
          >
            Continue Shopping <ArrowRight size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => os.navigate("/my-orders")}
            className="w-full sm:w-auto h-16 px-8 rounded-2xl font-semibold uppercase tracking-widest text-[10px] text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all font-sans"
          >
            View All Orders
          </Button>
        </motion.div>

        <div className="pt-12 flex items-center justify-center gap-2 text-[9px] font-semibold text-slate-300 uppercase tracking-[0.3em]">
          <ShieldCheck size={14} /> Secure Payment Verified
        </div>
      </div>
    </div>
  );
}


