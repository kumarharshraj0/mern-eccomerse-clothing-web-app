import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Welcome to the inner circle.");
    }, 1500);
  };

  return (
    <section className="py-24 bg-muted/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white p-12 md:p-20 rounded-[3rem] border border-border/50 shadow-sm space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Join Our Newsletter</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Get weekly updates on new arrivals, exclusive offers, and curated style guides.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 h-290 px-12 py-10 rounded-2xl border border-border focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <Button
              disabled={loading}
              type="submit"
              className="h-14 px-10 rounded-2xl font-bold"
            >
              {loading ? "Joining..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            We value your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

