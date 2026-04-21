import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES, IMAGE_VARIANTS } from '@/constants/heroSlides';
import HeroSlideHeader from './hero/HeroSlideHeader';
import HeroControls from './hero/HeroControls';

const SwiftMartHero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-[#0A0A0A]">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={IMAGE_VARIANTS}
          initial="enter" animate="center" exit="exit"
          className="absolute inset-0"
        >
          <img src={slide.image} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full min-h-[85vh] flex items-center">
        <div className="w-full py-20 lg:py-32">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div key={slide.id + "-content"} className="space-y-8">
                <HeroSlideHeader slide={slide} navigate={navigate} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-20 right-12">
            <HeroControls
              currentSlide={currentSlide}
              totalSlides={HERO_SLIDES.length}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              goToSlide={goToSlide}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwiftMartHero;






