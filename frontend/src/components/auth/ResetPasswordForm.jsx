import React from "react";
import { Mail, Key, Lock, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordForm = ({ form, loading, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">Target Account</Label>
          <div className="relative group/input">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">One-Time Password</Label>
          <div className="relative group/input">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
            <Input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              required
              value={form.otp}
              onChange={handleChange}
              className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium tracking-[0.5em] text-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">New Key</Label>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/input:text-primary transition-colors" />
              <Input
                name="password"
                type="password"
                placeholder="••••"
                required
                value={form.password}
                onChange={handleChange}
                className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">Confirm Key</Label>
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

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all gap-3"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <>
            Authorize New Credentials
            <ArrowRight size={16} />
          </>
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;


