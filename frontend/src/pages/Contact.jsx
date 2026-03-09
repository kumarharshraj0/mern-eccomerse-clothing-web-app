import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Loader2, Sparkles, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message transmitted via secure channels.");
    }, 1500);
  };

  const contactInfo = [
    { icon: Phone, label: "Hotline", value: "+1 (888) PREMIUM", sub: "24/7 Priority Support" },
    { icon: Mail, label: "Electronic", value: "concierge@premium.com", sub: "Avg response: 15 mins" },
    { icon: MapPin, label: "Headquarters", value: "Elite Plaza, Floor 88", sub: "New York, Manhattan" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-primary"
          >
            <MessageSquare size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Direct Communication</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] mix-blend-multiply"
          >
            Connect<br /><span className="text-primary italic font-serif lowercase">instantly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium font-serif italic text-xl max-w-xl mx-auto pt-6"
          >
            Initiate a high-priority dialogue with our specialized concierge team regarding your interests.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Contact Infographics */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900 leading-none">Global Access<br /><span className="text-primary tracking-tighter italic font-serif lowercase text-4xl">Points.</span></h2>

                <div className="space-y-6">
                  {contactInfo.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-start gap-6 p-6 rounded-[2rem] hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <item.icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                        <p className="text-lg font-black text-slate-900 leading-none">{item.value}</p>
                        <p className="text-xs font-medium text-slate-400 font-serif italic">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map/Visual Placeholder */}
              <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=75&w=800&auto=format&fit=crop"
                  alt="Elite Plaza Manhattan Headquarters"
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <Badge className="bg-white text-slate-900 border-0 font-black px-4 py-2 uppercase tracking-widest text-[8px]">Manhattan HQ</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[4rem] border border-slate-100 p-10 lg:p-20 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 lg:p-12 text-slate-100 -z-1">
                  <Globe size={240} strokeWidth={0.5} />
                </div>

                <div className="space-y-12 relative">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={12} /> Priority Transmission
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter uppercase text-slate-900">Transmit<br /><span className="text-primary italic font-serif lowercase">Inquiry.</span></h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="full-name" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Designation</Label>
                        <Input
                          id="full-name"
                          placeholder="Your professional name"
                          required
                          className="h-16 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium px-6 text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-address" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Digital Address</Label>
                        <Input
                          id="email-address"
                          type="email"
                          placeholder="name@domain.com"
                          required
                          className="h-16 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium px-6 text-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message-body" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Communication Body</Label>
                      <Textarea
                        id="message-body"
                        placeholder="Detail your inquiry or project specifications here..."
                        required
                        rows={5}
                        className="rounded-[2rem] border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium p-8 text-lg min-h-[200px]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-6 border-t border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[240px]">By transmitting this form, you authorize our team to initiate professional correspondence.</p>
                      <Button
                        disabled={loading}
                        aria-label="Initiate inquiry protocol"
                        type="submit"
                        className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 active:scale-95 transition-all gap-3 shrink-0"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <>Initiate Protocol <ArrowRight size={16} /></>}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Bar */}
      <div className="py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {['Instagram', 'Linkedin', 'Twitter', 'Vogue', 'Hypebeast', 'ArchitecturalDigest'].map((brand) => (
            <span key={brand} className="text-xs font-black uppercase tracking-widest cursor-default">{brand}</span>
          ))}
        </div>
      </div>
    </div>
  );
}


