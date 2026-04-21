import React from "react";
import { motion } from "framer-motion";
import { Mail, Key, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ForgotPasswordHeader from "@/components/auth/ForgotPasswordHeader";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPassword = () => {
  const fp = useForgotPassword();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px]"
      >
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

          <div className="p-10 lg:p-12">
            <ForgotPasswordHeader />

            <form onSubmit={fp.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">Authorized Email</Label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={fp.email}
                    onChange={(e) => fp.setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={fp.loading}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all gap-3"
              >
                {fp.loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>
                    Request Secure OTP
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <Key size={20} className="text-slate-300 shrink-0 mt-0.5" />
              <p className="text-[10px] font-semibold text-slate-400 leading-relaxed uppercase tracking-widest">A unique verification code will be sent to your inbox. This code is valid for 10 minutes.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;




