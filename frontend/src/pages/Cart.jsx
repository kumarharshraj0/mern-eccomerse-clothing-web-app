import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartPage = ({ isSheet = false }) => {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={`${isSheet ? "h-full" : "min-h-[60vh]"} flex items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className={`${isSheet ? "h-full" : "min-h-[70vh]"} flex flex-col items-center justify-center p-6 text-center space-y-6`}>
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <ShoppingBag size={isSheet ? 32 : 48} />
        </div>
        <div className="space-y-2">
          <h2 className={`${isSheet ? "text-xl" : "text-3xl"} font-black tracking-tighter text-slate-900`}>YOUR CART IS EMPTY</h2>
          <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Looks like you haven't added any premium pieces to your collection yet.</p>
        </div>
        <Button
          size={isSheet ? "sm" : "lg"}
          onClick={() => navigate("/shop")}
          className="rounded-2xl px-10 font-black shadow-xl shadow-primary/20 active:scale-95 transition-all gap-2"
        >
          Explore Collection
          <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const CartContent = (
    <div className={`grid grid-cols-1 ${isSheet ? "" : "lg:grid-cols-[1fr_400px]"} gap-8 lg:gap-12 items-start`}>

      {/* Main List */}
      <div className="space-y-4 lg:space-y-6">
        <AnimatePresence mode="popLayout">
          {cart.map((item, idx) => {
            const productId = item.product?._id || item.product;
            return (
              <motion.div
                key={productId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 lg:gap-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500`}
              >
                {/* Image */}
                <div className={`relative w-full ${isSheet ? "sm:w-24" : "sm:w-40"} aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-slate-50 shrink-0`}>
                  <img
                    src={
                      item?.image?.url ||
                      item?.image ||
                      item?.product?.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-2 lg:space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5 lg:space-y-1">
                        <h3 className={`${isSheet ? "text-sm" : "text-lg lg:text-xl"} font-bold text-slate-900 tracking-tight leading-tight line-clamp-2`}>{item.title}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(productId)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {!isSheet && (
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-lg border-0 text-[10px]">In Stock</Badge>
                        {item.size && <Badge variant="outline" className="text-slate-400 font-bold border-slate-200 text-[10px]">Size: {item.size}</Badge>}
                      </div>
                    )}
                  </div>

                  {/* Controls Area */}
                  <div className={`flex items-center justify-between mt-4 ${isSheet ? "mt-2" : "mt-8"}`}>
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg lg:rounded-xl p-0.5 shrink-0">
                      <button
                        onClick={() => updateQuantity(productId, Math.max(1, item.qty - 1))}
                        className={`${isSheet ? "w-7 h-7" : "w-10 h-10"} flex items-center justify-center hover:bg-white rounded-md lg:rounded-lg transition-colors`}
                      >
                        <Minus size={isSheet ? 12 : 16} />
                      </button>
                      <span className={`${isSheet ? "w-6 text-xs" : "w-10 text-sm"} text-center font-black`}>{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(productId, item.qty + 1)}
                        className={`${isSheet ? "w-7 h-7" : "w-10 h-10"} flex items-center justify-center hover:bg-white rounded-md lg:rounded-lg transition-colors`}
                      >
                        <Plus size={isSheet ? 12 : 16} />
                      </button>
                    </div>
                    <p className={`${isSheet ? "text-base" : "text-xl lg:text-2xl"} font-black text-slate-900 tracking-tight`}>
                      ₹{(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sidebar Summary */}
      <aside className={`${isSheet ? "" : "lg:sticky lg:top-32"} space-y-6`}>
        <div className={`bg-white ${isSheet ? "rounded-3xl" : "rounded-[2.5rem]"} border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden`}>
          <div className={`${isSheet ? "p-6" : "p-10"} space-y-6 lg:space-y-8`}>
            <h3 className="text-lg lg:text-xl font-black tracking-tight uppercase">Summary</h3>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400 font-black tracking-widest uppercase text-[10px]">Subtotal</span>
                <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400 font-black tracking-widest uppercase text-[10px]">Shipping</span>
                <span className={shipping === 0 ? "text-green-500 font-black uppercase text-[10px] tracking-widest" : "text-slate-900 font-bold"}>
                  {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                </span>
              </div>
              <Separator className="bg-slate-100" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Total</span>
                <span className={`${isSheet ? "text-2xl" : "text-3xl"} font-black text-primary tracking-tighter`}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <Button
                size={isSheet ? "lg" : "xl"}
                onClick={() => navigate("/checkout")}
                className="w-full rounded-2xl h-14 font-black lg:text-lg bg-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
              >
                Checkout
                <ArrowRight size={20} />
              </Button>
              {!isSheet && (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/shop")}
                  className="w-full h-14 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Continue Shopping
                </Button>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          {!isSheet && (
            <div className="bg-slate-50 border-t border-slate-100 p-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 grayscale opacity-50">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Pay</span>
              </div>
              <div className="flex items-center gap-3 grayscale opacity-50">
                <Truck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Tracked</span>
              </div>
            </div>
          )}
        </div>

        {!isSheet && (
          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Truck size={24} />
            </div>
            <p className="text-xs font-bold text-primary leading-relaxed">
              {subtotal > 5000
                ? "You've unlocked COMPLIMENTARY shipping for this order!"
                : `Add ₹${(5000 - subtotal).toLocaleString()} more to unlock COMPLIMENTARY shipping.`}
            </p>
          </div>
        )}
      </aside>
    </div>
  );

  if (isSheet) {
    return <div className="p-4 lg:p-6">{CartContent}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="mb-12 space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Shopping Bag</h1>
          <p className="text-slate-500 font-medium font-serif italic">Reviewing {cart.length} exclusive items</p>
        </header>
        {CartContent}
      </div>
    </div>
  );
};

export default CartPage;



