import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "../lib/api";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, apiRequest } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);


  // -------------------- GET WISHLIST --------------------
  const getWishlist = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await apiRequest(() => {
        return API.get("/cart/wishlist");
      });

      setWishlist(Array.isArray(res.data) ? res.data : []); // backend returns array
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    } finally {
      setLoading(false);
    }
  }, [user, apiRequest, API]);

  // -------------------- ADD TO WISHLIST --------------------
  const addToWishlist = async (productId) => {
    if (!user) {
      toast.warning("Please login first 🔑");
      return;
    }

    try {
      const res = await apiRequest(() => {
        return API.post(
          "/cart/wishlist/add",
          { productId }
        );
      });

      setWishlist(res.data); // backend returns updated wishlist array
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      console.error("Add to wishlist failed:", err);
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  // -------------------- REMOVE FROM WISHLIST --------------------
  const removeFromWishlist = async (productId) => {
    if (!user) return;

    try {
      const res = await apiRequest(() => {
        return API.delete(`/cart/wishlist/remove/${productId}`);
      });

      setWishlist(res.data);
      toast.success("Removed from wishlist ❌");
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  // -------------------- CHECK PRODUCT --------------------
  const isInWishlist = (productId) => {
    return wishlist.some((p) =>
      typeof p === "string" ? p === productId : p._id === productId
    );
  };

  // -------------------- AUTO FETCH --------------------
  useEffect(() => {
    if (user) {
      getWishlist();
    } else {
      setWishlist([]);
    }
  }, [user, getWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);



