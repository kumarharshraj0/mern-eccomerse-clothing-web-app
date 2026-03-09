import React, { Suspense, lazy } from "react";
import { MoveRight, ShoppingBag, Sparkles, Star, Zap, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { Button } from "@/components/ui/button";

// Lazy-loaded sections
const LatestProducts = lazy(() => import("../components/LatestProducts"));
const FeaturedProduct = lazy(() => import("../components/FeaturedProduct"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const FAQ = lazy(() => import("../components/FAQ"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Newsletter = lazy(() => import("../components/Newsletter"));

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    title: "Elevate Your Style",
    subtitle: "Discover the latest trends in fashion and accessories.",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
    title: "Premium Collections",
    subtitle: "Exclusive designs curated just for you.",
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
    title: "Quality Essentials",
    subtitle: "The best products from top brands worldwide.",
  },
];

const categoriesData = [
  { name: "Mens", icon: <User />, color: "bg-blue-500" },
  { name: "Womens", icon: <ShoppingBag />, color: "bg-pink-500" },
  { name: "Footwear", icon: <MoveRight />, color: "bg-orange-500" },
  { name: "Kids", icon: <Sparkles />, color: "bg-purple-500" },
  { name: "Grocery", icon: <Zap />, color: "bg-green-500" },
  { name: "Fashion", icon: <Star />, color: "bg-indigo-500" },
];

const brandsData = [
  { name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg", image: "https://images.unsplash.com/photo-1543085337-337ef3909772?auto=format&fit=crop&w=600&q=70" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=70" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=600&q=70" },
  { name: "Puma", logo: "https://www.logo.wine/a/logo/Puma_(brand)/Puma_(brand)-Logo.wine.svg", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=70" },
  { name: "H&M", logo: "https://www.logo.wine/a/logo/H%26M/H%26M-Logo.wine.svg", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=70" },
  { name: "Gucci", logo: "https://www.vectorlogo.zone/logos/gucci/gucci-wordmark.svg", image: "https://images.unsplash.com/photo-1548036627-09be8589b501?auto=format&fit=crop&w=600&q=70" },
  { name: "Prada", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg", image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=600&q=70" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* 🚀 HERO SECTION (SIMPLE SLIDER) */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding={index === 0 ? "sync" : "async"}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="mb-8 text-xl md:text-2xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    onClick={() => navigate("/shop")}
                    className="h-14 px-10 text-lg rounded-full"
                  >
                    Shop Now <MoveRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-32">
        {/* 📦 SHOP BY CATEGORY */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link to="/shop" className="text-primary font-semibold hover:underline flex items-center gap-1">
              Browse All <MoveRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesData.map((cat, i) => (
              <div
                key={i}
                onClick={() => navigate("/shop", { state: { filterType: 'category', filterValue: cat.name } })}
                className="group cursor-pointer relative h-48 rounded-2xl overflow-hidden border border-border/50 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`absolute inset-0 ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="p-4 rounded-full bg-background shadow-sm text-primary transition-transform group-hover:scale-110">
                    {React.cloneElement(cat.icon, { size: 32 })}
                  </div>
                  <span className="font-bold text-lg">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ⚡ LATEST PRODUCTS */}
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-2xl" />}>
          <LatestProducts />
        </Suspense>

        {/* ⭐ FEATURED PRODUCT */}
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-2xl" />}>
          <FeaturedProduct />
        </Suspense>

        {/* 🛡️ WHY CHOOSE US */}
        <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-2xl" />}>
          <WhyChooseUs />
        </Suspense>

        {/* 🏢 SHOP BY BRAND */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Shop by Brand</h2>
            <Link to="/shop" className="text-primary font-semibold hover:underline flex items-center gap-1">
              View All Brands <MoveRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {brandsData.map((brand, i) => (
              <div
                key={i}
                onClick={() => navigate("/shop", { state: { filterType: 'brand', filterValue: brand.name } })}
                className="group cursor-pointer relative h-64 lg:h-80 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/80 group-hover:via-primary/20 transition-all duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 gap-3 text-center">
                  <div className="w-full h-8 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-2 group-hover:bg-white/20 transition-colors">
                    <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain brightness-0 invert" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90 group-hover:text-white transition-colors">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 💬 TESTIMONIALS */}
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-2xl" />}>
          <Testimonials />
        </Suspense>

        {/* ❓ FAQ */}
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-2xl" />}>
          <FAQ />
        </Suspense>

        {/* ✉️ NEWSLETTER */}
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-2xl" />}>
          <Newsletter />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
