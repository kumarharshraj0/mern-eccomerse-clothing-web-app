import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactFormSection = ({ formData, loading, handleChange, handleSubmit }) => {
  return (
    <div className="lg:col-span-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-[4rem] border border-slate-100 p-10 lg:p-20 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 lg:p-12 text-slate-100 -z-1">
          <Globe size={240} strokeWidth={0.5} />
        </div>

        <div className="space-y-12 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-widest">
              <Sparkles size={12} /> Send a Message
            </div>
            <h3 className="text-4xl font-semibold tracking-tighter uppercase text-slate-900">Send<br /><span className="text-primary">Message</span></h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your professional name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-16 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium px-6 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-16 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium px-6 text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Detail your inquiry or project specifications here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded-[2rem] border-slate-100 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium p-8 text-lg min-h-[200px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-6 border-t border-slate-50">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest max-w-[240px]">By submitting this form, you agree to let our team reach out to you.</p>
              <Button
                disabled={loading}
                aria-label="Initiate inquiry protocol"
                type="submit"
                className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 active:scale-95 transition-all gap-3 shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight size={16} /></>}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFormSection;


