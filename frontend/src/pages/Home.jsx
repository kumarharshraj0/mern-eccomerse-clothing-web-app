import React, { Suspense, lazy } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import AntigravityHero from "../components/AntigravityHero";
import ValueProps from "../components/ValueProps";
import CategoryGrid from "../components/CategoryGrid";
import BrandGrid from "../components/BrandGrid";
import TestimonialsGrid from "../components/TestimonialsGrid";
import ScrollReveal from "../components/ScrollReveal";

// Lazy-loaded sections from existing components
const LatestProducts = lazy(() => import("../components/LatestProducts"));
const Newsletter = lazy(() => import("../components/Newsletter"));
const FAQ = lazy(() => import("../components/FAQ"));

const Home = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      {/* 📢 ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 🚀 HERO SECTION (No ScrollReveal needed for entrance) */}
      <AntigravityHero />
      <section className="py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-16 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <span className="w-12 h-[2px] bg-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Curated Essentials</span>
              </div>
            </div>
          </ScrollReveal>

          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-[3rem]" />}>
            <ScrollReveal distance={100} delay={0.1}>
              <LatestProducts />
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* 🏷️ FRESH FASHION HEADING */}
      <ScrollReveal distance={40}>
        <section className="py-24 bg-background">
          <div className="max-w-[1400px] mx-auto px-6 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-slate-900 leading-[0.9]">
              Fresh Fashion at Modern Vibes
            </h2>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
              Our collection is constantly updated with the latest styles, ensuring you're always on point.
              Shop now and let your fashion sense shine with the newest arrivals at Wink.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* 🏷️ SHOP BY CATEGORY */}
      <ScrollReveal distance={80}>
        <CategoryGrid />
      </ScrollReveal>


      {/* 🏗️ SHOP BY BRAND */}
      <ScrollReveal distance={60} delay={0.2}>
        <BrandGrid />
      </ScrollReveal>

      {/* 👟 PRODUCT GRID (BEST SELLERS) */}


      {/* 🛡️ VALUE PROPOSITIONS */}
      <ScrollReveal delay={0.1}>
        <ValueProps />
      </ScrollReveal>

      {/* 💬 TESTIMONIALS */}
      <ScrollReveal distance={40}>
        <TestimonialsGrid />
      </ScrollReveal>

      {/* ✉️ NEWSLETTER & FAQ */}
      <div className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-[3rem]" />}>
          <ScrollReveal direction="left" distance={100}>
            <Newsletter />
          </ScrollReveal>
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-[3rem]" />}>
          <ScrollReveal direction="right" distance={100}>
            <FAQ />
          </ScrollReveal>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;



