import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users, ShieldCheck, ArrowUpRight, Globe, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const stats = [
    { label: "Global Partners", value: "250+", icon: Globe },
    { label: "Satisfied Clients", value: "12K+", icon: Users },
    { label: "Secure Transactions", value: "1.2M", icon: ShieldCheck },
    { label: "System Uptime", value: "99.9%", icon: Zap },
  ];

  const values = [
    {
      title: "Radical Innovation",
      desc: "We don't just follow trends; we set them through rigorous research and creative experimentation.",
      icon: Sparkles
    },
    {
      title: "Absolute Integrity",
      desc: "Transparency is our foundation. We build trust through every interaction and transaction.",
      icon: Target
    },
    {
      title: "Community Driven",
      desc: "Our platform exists to serve and elevate the community of premium lifestyle enthusiasts.",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-primary"
          >
            <Sparkles size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Brand Narrative</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
          >
            Defining the<br />
            <span className="text-primary italic font-serif lowercase">new standard.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium font-serif italic text-xl max-w-2xl mx-auto pt-4 leading-relaxed"
          >
            We are architects of modern commerce, dedicated to bridging the gap between exceptional craftsmanship and discerning individuals worldwide.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=75&w=800&auto=format&fit=crop"
                alt="Modern Office Architecture"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white rounded-[2.5rem] p-10 shadow-2xl hidden lg:block border border-slate-100">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Our Vision</p>
                <p className="text-sm font-bold text-slate-900 leading-snug">Empowering the world through curated excellence and digital innovation.</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Our Approach</h2>
              <p className="text-slate-600 font-medium leading-relaxed text-lg italic font-serif">
                We approach creative work with a blend of radical innovation, seamless collaboration, and meticulous attention to detail. We believe in the power of storytelling and strive to understand each client's unique vision and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <v.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase tracking-tight">{v.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                  <s.icon size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter text-slate-900">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:pb-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 lg:p-24 text-center space-y-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-1" />

          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-none">
            Ready to experience<br />
            <span className="text-primary italic font-serif lowercase px-2">excellence?</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="xl" aria-label="Join our exclusive community" className="h-16 px-12 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] gap-3 hover:scale-105 transition-all shadow-2xl">
              Join the Circle <ArrowUpRight size={18} />
            </Button>
            <Button variant="outline" size="xl" aria-label="Contact our sales team" className="h-16 px-12 rounded-2xl border-white/20 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
