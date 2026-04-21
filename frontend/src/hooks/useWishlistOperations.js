import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export const useWishlistOperations = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  return { 
    wishlist: safeWishlist, 
    removeFromWishlist, 
    addToCart, 
    navigate 
  };
};


