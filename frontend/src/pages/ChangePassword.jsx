import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, Loader2, ChevronLeft, Key, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New security keys do not match");
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Security credentials updated successfully");
      navigate("/account");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Re-authorization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px]"
      >
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

          <div className="p-10 lg:p-12 text-center lg:text-left">
            <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-8">
              <ChevronLeft size={14} /> Back to Vault
            </Link>

            <div className="space-y-3 mb-10">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto lg:mx-0 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">Re-Authorize<br /><span className="text-primary italic font-serif lowercase">security.</span></h1>
              <p className="text-slate-500 font-medium font-serif italic text-lg pt-2 text-center lg:text-left">Update your account's primary security access key below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Current Secret Key</Label>
                  <div className="relative group/input">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                    <Input
                      name="currentPassword"
                      type="password"
                      placeholder="••••"
                      required
                      value={form.currentPassword}
                      onChange={handleChange}
                      className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">New Secret</Label>
                    <div className="relative group/input">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                      <Input
                        name="newPassword"
                        type="password"
                        placeholder="••••"
                        required
                        value={form.newPassword}
                        onChange={handleChange}
                        className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Confirm New Secret</Label>
                    <div className="relative group/input">
                      <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="••••"
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Execute Key Update
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                    Lost primary access?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
