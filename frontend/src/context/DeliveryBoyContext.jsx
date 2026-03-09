// src/context/DeliveryContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "../lib/api";
import { useAuth } from "./AuthContext";

const DeliveryContext = createContext();


export const DeliveryProvider = ({ children }) => {
  const { user, apiRequest, logout } = useAuth();
  const [deliveryUser, setDeliveryUser] = useState(null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------------------- LOGOUT DELIVERY -------------------
  const logoutDelivery = async () => {
    try {
      await apiRequest(() => {
        return API.post("/delivery/logout", {});
      });
    } catch (err) {
      console.log("Delivery logout failed:", err.message);
    }
    setDeliveryUser(null);
    logout(); // central logout
  };

  // ------------------- GET ASSIGNED ORDERS -------------------
  const getAssignedOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API.get("/delivery/assigned");
      });
      setAssignedOrders(res.data || []);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch assigned orders:", err);
      setAssignedOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  // ------------------- UPDATE ORDER STATUS -------------------
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await apiRequest(() => {
        return API.post(
          `/delivery/orders/${orderId}/update-status`,
          { status }
        );
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // ------------------- VERIFY OTP -------------------
  const verifyOtp = async (orderId, otp) => {
    try {
      const res = await apiRequest(() => {
        return API.post(
          `/delivery/orders/${orderId}/verify-otp`,
          { otp }
        );
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // ------------------- FETCH DELIVERY BOY STATS -------------------
  const fetchStats = useCallback(async () => {
    try {
      const res = await apiRequest(() => {
        return API.get("/delivery/deliveryBoyStats");
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      return {};
    }
  }, [apiRequest]);

  // ------------------- EFFECT -------------------
  // Removed auto-fetch useEffect - components should call fetch functions as needed

  return (
    <DeliveryContext.Provider
      value={{
        deliveryUser,
        loading,
        setDeliveryUser,
        assignedOrders,
        fetchAssignedOrders: getAssignedOrders,
        getAssignedOrders,
        updateOrderStatus,
        verifyOtp,
        fetchStats,
        logoutDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext);
