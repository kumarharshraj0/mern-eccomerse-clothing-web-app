import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutCTA = () => {
  return (
    <section className="py-24 px-6 md:pb-48">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 lg:p-24 text-center space-y-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-1" />

        <h2 className="text-5xl lg:text-7xl font-semibold tracking-tighter uppercase text-white leading-none">
          Experience<br />
          <span className="text-primary uppercase">Excellence</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            size="xl" 
            aria-label="Join our community" 
            className="h-16 px-12 rounded-2xl bg-white text-slate-900 font-semibold uppercase tracking-widest text-[10px] gap-3 hover:scale-105 transition-all shadow-2xl"
          >
            Join Us <ArrowUpRight size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            aria-label="Contact our sales team" 
            className="h-16 px-12 rounded-2xl border-white/20 text-white font-semibold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
          >
            Contact Sales
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;


