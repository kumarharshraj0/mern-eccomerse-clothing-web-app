import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfoHeader from "@/components/product/ProductInfoHeader";
import ProductActions from "@/components/product/ProductActions";
import ReviewSection from "@/components/product/ReviewSection";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pd = useProductDetail(id, navigate);

  if (pd.fetching) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!pd.product) return <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4"><div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><ShoppingBag size={32} /></div><h2 className="text-2xl font-semibold">Product not found</h2><Button onClick={() => navigate("/shop")}>Back to Shop</Button></div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 overflow-x-auto scrollbar-hide">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors shrink-0">Home</button>
          <ChevronRight size={12} className="shrink-0" />
          <button onClick={() => navigate("/shop")} className="hover:text-primary transition-colors shrink-0">Shop</button>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">{pd.product.title}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <ProductGallery product={pd.product} mainImage={pd.mainImage} setMainImage={pd.setMainImage} inStock={pd.inStock} user={pd.user} />

          <div className="space-y-12">
            <ProductInfoHeader product={pd.product} reviewsCount={pd.reviews.length} />
            <ProductActions
              product={pd.product} selectedSize={pd.selectedSize} setSelectedSize={pd.setSelectedSize}
              quantity={pd.quantity} setQuantity={pd.setQuantity}
              loading={pd.loading} inStock={pd.inStock} handleAddToCart={pd.handleAddToCart}
            />
          </div>
        </div>

        <ReviewSection
          reviews={pd.reviews} myReview={pd.myReview}
          rating={pd.rating} setRating={pd.setRating}
          title={pd.title} setTitle={pd.setTitle}
          comment={pd.comment} setComment={pd.setComment}
          handleSubmitReview={pd.handleSubmitReview} handleDeleteReview={pd.handleDeleteReview}
        />
      </div>
    </div>
  );
};

export default ProductDetail;









