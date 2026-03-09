import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Key, ArrowRight, Loader2, ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await forgotPassword(email);
      toast.success("Security OTP dispatched to your inbox");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transmission failed");
    } finally {
      setLoading(false);
    }
  };

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
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-8">
              <ChevronLeft size={14} /> Return to Entry
            </Link>

            <div className="space-y-3 mb-10">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Shield size={32} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Recover<br /><span className="text-primary italic font-serif lowercase">access.</span></h1>
              <p className="text-slate-500 font-medium font-serif italic text-lg pt-2">Enter your verified email to initiate security protocols.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Authorized Email</Label>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all gap-3"
              >
                {loading ? (
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
              <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">A unique verification code will be sent to your inbox. This code is valid for 10 minutes.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;


