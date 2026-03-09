import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Truck,
  ChevronRight,
  ShieldCheck,
  Loader2,
  Smartphone,
  CheckCircle2,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// ---------------------------
// Razorpay Script Loader
// ---------------------------
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function Checkout() {
  const { createOrder, verifyPayment, loading } = useOrders();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
  const shippingCost = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shippingCost;

  const startRazorpayPayment = async (order, razorpayOrder) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Payment system offline. Please check connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "MY STORE",
      description: `Order #${order._id.slice(-6)}`,
      order_id: razorpayOrder.id,
      handler: async (response) => {
        try {
          await verifyPayment(order._id, {
            orderId: order._id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          clearCart();
          navigate("/order-success/" + order._id);
        } catch {
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!shipping.fullName.trim()) return toast.error("Enter your full name");
    if (!shipping.phone.trim()) return toast.error("Enter your phone number");
    if (!shipping.street.trim()) return toast.error("Enter your street address");

    try {
      const orderPayload = {
        items: cart.map((i) => ({ product: i.product, qty: i.qty })),
        shippingAddress: shipping,
        paymentMethod,
      };

      const result = await createOrder(orderPayload);
      if (!result) return;
      const { order, razorpayOrder } = result;

      if (paymentMethod === "razorpay") {
        startRazorpayPayment(order, razorpayOrder);
      } else {
        clearCart();
        navigate("/order-success/" + order._id);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order placement failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6">

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Secure Checkout</h1>
            <p className="text-slate-500 font-medium font-serif italic">Finalizing your curated selection</p>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="text-primary flex items-center gap-2"><CheckCircle2 size={14} /> Cart</span>
            <ChevronRight size={12} />
            <span className="text-slate-900 flex items-center gap-2 underline underline-offset-8 decoration-primary decoration-2">Shipping</span>
            <ChevronRight size={12} />
            <span className="flex items-center gap-2">Payment</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* Main Content */}
          <div className="space-y-8">
            {/* Shipping Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Recipient Details</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                    <Input
                      placeholder="e.g. Alexander Pierce"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Contact</Label>
                    <Input
                      placeholder="+91 00000 00000"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Street Address</Label>
                  <Input
                    placeholder="Grand Avenue, Suite 402"
                    value={shipping.street}
                    onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</Label>
                    <Input
                      placeholder="Mumbai"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State</Label>
                    <Input
                      placeholder="Maharashtra"
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ZIP / Postal</Label>
                    <Input
                      placeholder="400001"
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all text-left ${paymentMethod === "razorpay"
                    ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                    : "border-slate-100 hover:border-slate-200"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === "razorpay" ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 tracking-tight">Instant Pay</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UPI • Card • NetBanking</p>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all text-left ${paymentMethod === "cod"
                    ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                    : "border-slate-100 hover:border-slate-200"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === "cod" ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 tracking-tight">Payment on Delivery</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cash • QR Scan</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Checkout Summary Sidebar */}
          <aside className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-10 space-y-8">
                <h3 className="text-xl font-black tracking-tight uppercase">Order Inventory</h3>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                  {cart.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 shrink-0">
                        <img src={item.image?.url || item.image || item.product?.images?.[0]?.url} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quantity: {item.qty}</p>
                        <p className="text-sm font-black text-slate-900 mt-1">₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-black tracking-widest uppercase text-[10px]">Subtotal</span>
                    <span className="text-slate-900 font-black">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-black tracking-widest uppercase text-[10px]">Service & Delivery</span>
                    <span className={shippingCost === 0 ? "text-green-500 font-black uppercase text-[10px] tracking-widest" : "text-slate-900 font-black"}>
                      {shippingCost === 0 ? "Complimentary" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Final Total</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  size="xl"
                  disabled={loading}
                  onClick={handlePlaceOrder}
                  className="w-full rounded-2xl h-14 font-black text-lg bg-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Order"}
                </Button>
              </div>

              <div className="bg-slate-50 p-8 flex flex-col items-center gap-3 text-center border-t border-slate-100">
                <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-[9px]">
                  <ShieldCheck size={14} />
                  Anti-Fraud Protection Enabled
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                  By placing this order, you agree to our <br />
                  <span className="text-slate-900 underline">Terms of Service</span> & <span className="text-slate-900 underline">Refund Policy</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <Package size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight mb-1">Estimated Arrival</p>
                <p className="text-sm font-black text-slate-900 leading-none">March 04 — March 06</p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
