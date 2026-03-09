// src/context/AdminContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API_CENTRAL from "../lib/api";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();


export const AdminProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, apiRequest } = useAuth();

  // ---------------- FETCH ORDERS ----------------
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/orders");
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch orders";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/users");
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch users";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/products");
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch products";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ---------------- UPDATE ORDER STATUS ----------------
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.put(
          `/admin/orders/${orderId}/status`,
          { status }
        );
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
      toast.success("Order status updated ✅");
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update order";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  // ---------------- FETCH STATS ----------------
  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/dashboard-stats");
      });
      setStats(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch stats";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ---------------- CREATE DELIVERY BOY ----------------
  const createDeliveryBoy = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.post(
          "/admin/create-delivery-boy",
          {
            name,
            email,
            password,
          }
        );
      });
      setDeliveryBoys((prev) => [...prev, res.data.user]);
      toast.success("Delivery boy created 🚴‍♂️");
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to create delivery boy";
      setError(msg);
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ASSIGN DELIVERY ----------------
  const assignDelivery = async (orderId, deliveryUserId) => {
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.put(
          `/admin/orders/${orderId}/assign-delivery`,
          {
            deliveryUserId,
          }
        );
      });
      setOrders(res.data);
      toast.success("Delivery assigned successfully 📦");
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to assign delivery";
      toast.error(msg);
      throw err;
    }
  };

  // ---------------- FETCH DELIVERY BOYS ----------------
  const fetchAllDeliveryBoys = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/delivery-boys");
      });
      setDeliveryBoys(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to fetch delivery boys";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ---------------- COUPON MANAGEMENT ----------------
  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.get("/admin/coupons");
      });
      setCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch coupons";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  const createCoupon = async (data) => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API_CENTRAL.post("/admin/coupons", data);
      });
      setCoupons((prev) => [res.data.coupon, ...prev]);
      toast.success("Coupon created successfully 🎟️");
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create coupon";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id) => {
    try {
      await apiRequest(() => {
        return API_CENTRAL.delete(`/admin/coupons/${id}`);
      });
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      toast.success("Coupon deleted 🗑️");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete coupon";
      toast.error(msg);
    }
  };

  // ---------------- EFFECT ----------------
  // Removed auto-fetch useEffect - components should call fetch functions as needed

  return (
    <AdminContext.Provider
      value={{
        orders,
        users,
        products,
        stats,
        deliveryBoys,
        coupons,
        loading,
        error,

        fetchOrders,
        fetchUsers,
        fetchProducts,
        fetchStats,
        fetchAllDeliveryBoys,
        fetchCoupons,

        updateOrderStatus,
        assignDelivery,
        createDeliveryBoy,
        createCoupon,
        deleteCoupon,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);






