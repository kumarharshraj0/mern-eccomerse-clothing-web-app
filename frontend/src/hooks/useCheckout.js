import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const useCheckout = () => {
  const { createOrder, verifyPayment, loading } = useOrders();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shipping, setShipping] = useState({
    fullName: "", phone: "", street: "", city: "", state: "", zip: "",
  });

  const subtotal = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  const shippingCost = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shippingCost;

  const startRazorpayPayment = async (order, razorpayOrder) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) { toast.error("Payment system offline"); return; }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "SwiftMart",
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
        } catch { toast.error("Payment verification failed"); }
      },
      theme: { color: "#0D3560" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!shipping.fullName.trim()) return toast.error("Enter full name");
    if (!shipping.phone.trim()) return toast.error("Enter phone number");
    if (!shipping.street.trim()) return toast.error("Enter street address");

    try {
      const orderPayload = {
        items: cart.map((i) => ({ product: i.product?._id || i.product, qty: i.qty, size: i.size })),
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

  return {
    shipping, setShipping, paymentMethod, setPaymentMethod,
    cart, subtotal, shippingCost, total, loading, handlePlaceOrder
  };
};


