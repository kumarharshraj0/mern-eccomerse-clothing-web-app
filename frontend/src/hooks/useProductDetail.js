import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

export const useProductDetail = (id, navigate) => {
  const { user } = useAuth();
  const { getProductById, getProductReviews, createReview, updateReview, deleteReview } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  // Review state
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const fetchProduct = useCallback(async () => {
    setFetching(true);
    try {
      const data = await getProductById(id);
      // Normalize sizes
      if (!data.sizes || data.sizes.length === 0) {
        data.sizes = data.size ? data.size.split(",").map(s => s.trim()) : [];
      }
      setProduct(data);
      setMainImage(data.images?.[0]?.url || "");
    } catch {
      toast.error("Failed to fetch product");
    } finally {
      setFetching(false);
    }
  }, [id, getProductById]);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await getProductReviews(id);
      setReviews(data || []);
      if (user) {
        const mine = data.find((r) => r.user?._id === user._id);
        if (mine) {
          setMyReview(mine);
          setRating(mine.rating);
          setTitle(mine.title || "");
          setComment(mine.comment || "");
        }
      }
    } catch {
      toast.error("Failed to load reviews");
    }
  }, [id, user, getProductReviews]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);
  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleAddToCart = async () => {
    if (!user) { toast.error("Login required"); navigate("/login"); return; }
    if (product.sizes?.length && !selectedSize) { toast.error("Please select a size"); return; }
    setLoading(true);
    try {
      await addToCart(product._id, quantity);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally { setLoading(false); }
  };

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Login required"); navigate("/login"); return; }
    try {
      if (myReview) {
        await updateReview(id, { rating, title, comment });
        toast.success("Review updated");
      } else {
        await createReview(id, { rating, title, comment });
        toast.success("Review submitted");
      }
      fetchReviews();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(id);
      toast.success("Review removed");
      setMyReview(null); setRating(5); setTitle(""); setComment("");
      fetchReviews();
    } catch { toast.error("Delete failed"); }
  };

  return {
    product, reviews, myReview, fetching, loading, quantity, setQuantity,
    selectedSize, setSelectedSize, mainImage, setMainImage,
    rating, setRating, title, setTitle, comment, setComment,
    handleAddToCart, handleSubmitReview, handleDeleteReview, inStock: product?.stock > 0, user
  };
};


