// src/context/OrderContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import API from "../lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
  const { user, apiRequest } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);        // first load
  const [revalidating, setRevalidating] = useState(false); // 🔥 background refresh
  const [error, setError] = useState(null);

  /* --------------------------------------------------
     CREATE ORDER (OPTIMISTIC FEEL)
  -------------------------------------------------- */
  const createOrder = async (orderData) => {
    try {
      const res = await apiRequest(() => {
        return API.post("/orders", orderData);
      });

      // 🔥 Optimistic UI (order immediately visible)
      setOrders((prev) => [res.data, ...prev]);

      toast.success("Order placed successfully 📦");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Order creation failed");
      throw err;
    }
  };

  /* --------------------------------------------------
     VERIFY PAYMENT
  -------------------------------------------------- */
  const verifyPayment = async (orderId, payload) => {
    try {
      const res = await apiRequest(() => {
        return API.post(`/orders/${orderId}/pay`, payload);
      });

      // 🔥 Update order status locally
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, isPaid: true } : o
        )
      );

      toast.success("Payment successful 💳");
      return res.data;
    } catch (err) {
      toast.error("Payment verification failed");
      throw err;
    }
  };

  /* --------------------------------------------------
     FETCH MY ORDERS (WITH BACKGROUND REVALIDATION)
  -------------------------------------------------- */
  const fetchMyOrders = useCallback(
    async (options = { background: false }) => {
      if (!user) return;

      try {
        options.background ? setRevalidating(true) : setLoading(true);

        const res = await apiRequest(() => {
          return API.get("/orders");
        });

        setOrders(res.data || []);
      } catch (err) {
        toast.error("Failed to load orders");
        setError("Failed to load orders");
      } finally {
        setLoading(false);
        setRevalidating(false);
      }
    },
    [user, apiRequest]
  );

  /* --------------------------------------------------
     GET SINGLE ORDER (NO GLOBAL LOADING)
  -------------------------------------------------- */
  const getOrder = async (id) => {
    try {
      const res = await apiRequest(() => {
        return API.get(`/orders/${id}`);
      });
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch order");
      throw err;
    }
  };

  /* --------------------------------------------------
     CONFIRM DELIVERY (OTP) - OPTIMISTIC
  -------------------------------------------------- */
  const confirmDelivery = async (orderId, otp) => {
    try {
      const res = await apiRequest(() => {
        return API.post(
          `/orders/${orderId}/confirm-delivery`,
          { otp }
        );
      });

      // 🔥 instant UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "Delivered" } : o
        )
      );

      toast.success("Delivery confirmed ✅");
      return res.data;
    } catch (err) {
      toast.error("OTP verification failed");
      throw err;
    }
  };

  /* --------------------------------------------------
     CANCEL ORDER - OPTIMISTIC
  -------------------------------------------------- */
  const cancelOrder = async (orderId) => {
    try {
      const res = await apiRequest(() => {
        return API.post(`/orders/${orderId}/cancel`, {});
      });

      // 🔥 instant UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );

      toast.success("Order cancelled successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancellation failed");
      throw err;
    }
  };

  /* --------------------------------------------------
     RETURN ORDER - OPTIMISTIC
  -------------------------------------------------- */
  const returnOrder = async (orderId) => {
    try {
      const res = await apiRequest(() => {
        return API.post(`/orders/${orderId}/return`, {});
      });

      // 🔥 instant UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "returned" } : o
        )
      );

      toast.success("Order return initiated successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Return initiation failed");
      throw err;
    }
  };

  /* --------------------------------------------------
     PROVIDER
  -------------------------------------------------- */
  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,        // first load
        revalidating,   // 🔥 silent refresh
        error,
        createOrder,
        verifyPayment,
        fetchMyOrders,
        getOrder,
        confirmDelivery,
        cancelOrder,
        returnOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);







