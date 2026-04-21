import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The quality of the footwear is simply unmatched. It feels like walking on air while looking incredibly sharp.",
    author: "Sarah J.",
    role: "Fashion Consultant",
    initials: "SJ",
    color: "bg-blue-100 text-blue-600"
  },
  {
    quote: "Finally, a brand that gets both the aesthetic and the sustainability right. SwiftMart is my new go-to.",
    author: "Michael R.",
    role: "Architect",
    initials: "MR",
    color: "bg-orange-100 text-orange-600"
  },
  {
    quote: "Fast shipping and the packaging was premium. The attention to detail is evident in every stitch.",
    author: "David K.",
    role: "Creative Director",
    initials: "DK",
    color: "bg-purple-100 text-purple-600"
  }
];

const TestimonialsGrid = () => {
  return (
    <section className="py-32 bg-slate-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-8 h-[1px] bg-primary/30" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Testimonials</span>
            <span className="w-8 h-[1px] bg-primary/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">
            Voices of <span className="text-primary ">SwiftMart</span>
          </h2>
          <p className="text-slate-400 font-medium text-sm md:text-base max-w-lg">
            Join the community of fashion-forward individuals redefining their modern wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="glass-card p-12 rounded-[3rem] relative group hover:bg-white transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-lg font-medium text-slate-700 leading-relaxed mb-10 ">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xs ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-900 mb-0.5">{t.author}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">{t.role}</p>
                </div>
              </div>

              <Quote className="absolute top-10 right-10 w-16 h-16 text-primary/5 transition-transform group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGrid;


