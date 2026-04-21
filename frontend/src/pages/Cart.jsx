import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

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
    return <EmptyCart isSheet={isSheet} navigate={navigate} />;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const PageContent = (
    <div className={`grid grid-cols-1 ${isSheet ? "" : "lg:grid-cols-[1fr_400px]"} gap-8 lg:gap-12 items-start`}>
      <div className="space-y-4 lg:space-y-6">
        <AnimatePresence mode="popLayout">
          {cart.map((item, idx) => (
            <CartItem 
              key={item.product?._id || item.product} 
              item={item} idx={idx} isSheet={isSheet} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
            />
          ))}
        </AnimatePresence>
      </div>

      <CartSummary 
        subtotal={subtotal} shipping={shipping} total={total} 
        isSheet={isSheet} navigate={navigate} 
      />
    </div>
  );

  if (isSheet) return <div className="p-4 lg:p-6">{PageContent}</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="mb-12 space-y-1">
          <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Shopping Bag</h1>
          <p className="text-slate-500 font-medium">{cart.length} items in your bag</p>
        </header>
        {PageContent}
      </div>
    </div>
  );
};



export default CartPage;





