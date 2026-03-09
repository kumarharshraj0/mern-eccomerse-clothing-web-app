import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px]"
      >
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

          <div className="p-10 lg:p-12">
            <div className="space-y-3 mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                <Sparkles size={12} />
                Join the Exclusive
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">CREATE <span className="text-primary italic font-serif">Account</span></h1>
              <p className="text-slate-500 font-medium leading-tight">Start your journey with our curated collections</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Legal Name</Label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Email Address</Label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Secure Password</Label>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Begin Experience
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-300"><span className="bg-white px-4">Social Access</span></div>
                </div>

                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 font-bold hover:bg-slate-50 transition-all gap-3">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
                  Sign up with Google
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm font-medium text-slate-500">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-black hover:underline underline-offset-4 tracking-tight">Login Directly</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
