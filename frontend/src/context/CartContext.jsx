// src/context/CartContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import API from "../lib/api";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
  const { user, apiRequest } = useAuth();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD CART ---------------- */
  const loadCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API.get("/cart");
      });
      setCart(res.data?.cart ?? []);
    } catch (err) {
      console.error("Load cart failed:", err);
    } finally {
      setLoading(false);
    }
  }, [user, apiRequest]);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = useCallback(
    async (productId, qty = 1) => {
      if (!user) {
        toast.warning("Please login first");
        return;
      }

      try {
        const res = await apiRequest(() => {
          return API.post(
            "/cart/add",
            { productId, qty }
          );
        });
        setCart(res.data?.cart ?? []);
        toast.success("Item added to cart 🛒");
      } catch (err) {
        console.error("Add to cart failed:", err);
        toast.error("Failed to add item");
      }
    },
    [user, apiRequest]
  );

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = useCallback(
    async (productId, qty) => {
      if (!user || qty < 1) return;

      try {
        const res = await apiRequest(() => {
          return API.put(
            `/cart/update/${productId}`,
            { qty }
          );
        });
        setCart(res.data?.cart ?? []);
      } catch (err) {
        console.error("Update qty failed:", err);
      }
    },
    [user, apiRequest]
  );

  /* ---------------- REMOVE ITEM ---------------- */
  const removeFromCart = useCallback(
    async (productId) => {
      if (!user) return;

      try {
        const res = await apiRequest(() => {
          return API.delete(`/cart/remove/${productId}`);
        });
        setCart(res.data?.cart ?? []);
        toast.success("Item removed ❌");
      } catch (err) {
        console.error("Remove from cart failed:", err);
      }
    },
    [user, apiRequest]
  );

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = useCallback(async () => {
    if (!user) return;

    try {
      await apiRequest(() => {
        return API.delete("/cart/clear");
      });
      setCart([]);
      toast.success("Cart cleared 🧹");
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  }, [user, apiRequest]);

  /* ---------------- DERIVED VALUES (MEMOIZED) ---------------- */
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.qty * (item.product?.price || 0),
        0
      ),
    [cart]
  );

  /* ---------------- LOAD CART ON LOGIN ---------------- */
  // Removed auto-fetch useEffect - components should call loadCart() as needed

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = useMemo(
    () => ({
      cart,
      loading,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      reloadCart: loadCart,
    }),
    [
      cart,
      loading,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      loadCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};






