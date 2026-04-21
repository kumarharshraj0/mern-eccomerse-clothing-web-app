import React from "react";
import { Link } from "react-router-dom";
import { Key, Lock, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChangePasswordForm = ({ form, loading, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">Current Password</Label>
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
            <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">New Password</Label>
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
            <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400 pl-1">Confirm New Password</Label>
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
          className="w-full h-16 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all gap-3"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <>
              Update Password
              <ArrowRight size={16} />
            </>
          )}
        </Button>

        <div className="text-center">
          <Link to="/forgot-password" size="sm" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;


