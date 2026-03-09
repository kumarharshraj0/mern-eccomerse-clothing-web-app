import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Star,
  ChevronRight,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Edit2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const {
    getProductById,
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
  } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [quantity, setQuantity] = useState(1);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      setFetching(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
        setMainImage(data.images?.[0]?.url || "");
      } catch {
        toast.error("Failed to fetch product");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, getProductById]);

  /* ================= FETCH REVIEWS ================= */
  useEffect(() => {
    const fetchReviews = async () => {
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
    };
    fetchReviews();
  }, [id, user, getProductReviews]);

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
        <ShoppingBag size={32} />
      </div>
      <h2 className="text-2xl font-black">Product not found</h2>
      <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
    </div>
  );

  const inStock = product.stock > 0;

  /* ================= HANDLERS ================= */
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Login required");
      navigate("/login");
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setLoading(true);
    try {
      await addToCart(product._id, quantity);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Login required");
      navigate("/login");
      return;
    }
    try {
      if (myReview) {
        await updateReview(id, { rating, title, comment });
        toast.success("Review updated");
      } else {
        await createReview(id, { rating, title, comment });
        toast.success("Review submitted");
      }
      const updated = await getProductReviews(id);
      setReviews(updated);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(id);
      toast.success("Review removed");
      setMyReview(null);
      setRating(5);
      setTitle("");
      setComment("");
      const updated = await getProductReviews(id);
      setReviews(updated);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 overflow-x-auto scrollbar-hide">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors shrink-0">Home</button>
          <ChevronRight size={12} className="shrink-0" />
          <button onClick={() => navigate("/shop")} className="hover:text-primary transition-colors shrink-0">Shop</button>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Gallery Section */}
          <div className="space-y-6 w-full max-w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200 group"
            >
              {/* ADMIN EDIT SHORTCUT */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin/products"
                  state={{ editId: product._id }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10 p-2 rounded-full bg-primary text-white shadow-xl shadow-primary/20 transition-transform hover:scale-110 active:scale-95"
                >
                  <Edit2 size={14} />
                </Link>
              )}
              <img
                src={mainImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <Badge variant={inStock ? "default" : "destructive"} className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full font-black tracking-widest uppercase text-[8px] lg:text-[10px] shadow-lg">
                  {inStock ? "In Stock" : "Sold Out"}
                </Badge>
              </div>
            </motion.div>

            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide max-w-full">
              {product.images?.map((img, i) => (
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  key={i}
                  onClick={() => setMainImage(img.url)}
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${mainImage === img.url ? "border-primary ring-4 ring-primary/10" : "border-slate-100"
                    }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8 lg:space-y-10 w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] lg:text-xs">
                <span>{product.brand}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-400">{product.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95] lg:leading-[0.9]">
                {product.title}
              </h1>
              {user?.role === 'admin' && (
                <Link
                  to="/admin/products"
                  state={{ editId: product._id }}
                  className="rounded-xl border border-primary/20 bg-primary/5 text-primary font-black uppercase tracking-widest text-[10px] gap-2 hover:bg-primary hover:text-white transition-all w-fit px-4 py-2 flex items-center no-underline"
                >
                  <Edit2 size={14} /> Edit in Admin Registry
                </Link>
              )}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-400">(4.0 / 5.0)</span>
                <span className="w-px h-4 bg-slate-200"></span>
                <span className="text-sm font-bold text-slate-900 border-b-2 border-primary/20">{reviews.length} Reviews</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-2xl text-slate-400 line-through font-bold">₹{product.oldPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-slate-500 text-lg leading-relaxed max-w-xl font-medium">
              {product.description}
            </p>

            {/* Selection Controls */}
            <div className="space-y-8 pt-6 border-t border-slate-100">
              {product.sizes?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Select size</span>
                    <button className="text-xs font-bold text-primary underline">Size Guide</button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[56px] h-14 rounded-2xl border-2 font-black transition-all ${selectedSize === size
                          ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20"
                          : "bg-white border-slate-100 text-slate-900 hover:border-slate-300"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center text-lg font-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={!inStock || loading}
                  className="w-full sm:flex-1 h-14 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20 active:scale-95 transition-all gap-3"
                >
                  <ShoppingBag size={20} />
                  {loading ? "Processing..." : "Secure Add to Cart"}
                </Button>
                <button className="w-14 h-14 flex items-center justify-center border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-red-500 shrink-0">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* Upsell Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
              <div className="flex items-start gap-4">
                <Truck className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-900">Swift Delivery</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RotateCcw className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-900">Easy Returns</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">30-day policy</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-primary mt-1" size={20} />
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-900">Extended Warranty</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">100% genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Expansion */}
        <section className="mt-32 pt-24 border-t border-slate-100">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3 space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tighter">Community Voice</h2>
                <div className="flex items-center gap-4 text-5xl font-black text-slate-900">
                  4.0 <span className="text-2xl text-slate-400">/ 5.0</span>
                </div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
                <h3 className="text-lg font-black tracking-tighter flex items-center gap-2">
                  <MessageCircle className="text-primary" />
                  {myReview ? "Edit your experience" : "Share your thoughts"}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} onClick={() => setRating(r)} className={`p-1 transition-colors ${rating >= r ? "text-yellow-500" : "text-slate-300"}`}>
                        <Star size={24} fill={rating >= r ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Headline"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Tell us what you liked..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                  />
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSubmitReview} className="flex-1 rounded-xl font-black shadow-lg shadow-primary/10">
                      {myReview ? "Update Story" : "Publish Review"}
                    </Button>
                    {myReview && (
                      <Button variant="ghost" onClick={handleDeleteReview} className="text-red-500 hover:bg-red-50 rounded-xl p-3">
                        <Trash2 size={20} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Showing {reviews.length} reviews</h4>
                <Button variant="link" className="text-xs font-black uppercase tracking-widest p-0">Sort By Latest</Button>
              </div>

              <div className="space-y-6">
                {reviews.map((r, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={r._id}
                    className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                          {r.user?.name?.[0]}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 tracking-tight">{r.user?.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Verified Buyer</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-lg font-black tracking-tight text-slate-900">{r.title}</h5>
                      <p className="text-slate-500 font-medium leading-relaxed">{r.comment}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;




