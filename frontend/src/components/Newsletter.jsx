import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      toast.success("You're on the list!");
    }, 1500);
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Mail size={20} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Newsletter</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter uppercase">
              Stay in the <span className="text-primary">Loop</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto font-medium">
              Get weekly updates on new arrivals, exclusive offers, and curated style guides.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-lg font-semibold text-slate-900">Welcome aboard!</p>
              <p className="text-sm text-slate-400">Check your inbox for a welcome surprise.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-medium"
                />
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="h-14 px-10 rounded-2xl font-semibold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 active:scale-95 transition-all gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Subscribe <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            We value your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;


