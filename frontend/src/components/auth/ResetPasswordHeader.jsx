import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ShieldCheck } from "lucide-react";

const ResetPasswordHeader = () => {
  return (
    <>
      <Link to="/forgot-password" size="sm" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-8">
        <ChevronLeft size={14} /> Back to Recovery
      </Link>

      <div className="space-y-3 mb-10 text-center lg:text-left">
        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto lg:mx-0 mb-6 transition-transform hover:scale-110">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase leading-[0.9]">Secure<br /><span className="text-primary font-serif lowercase">reset.</span></h1>
        <p className="text-slate-500 font-medium font-serif text-lg pt-2">Authorize your new security credentials with the verified OTP.</p>
      </div>
    </>
  );
};

export default ResetPasswordHeader;


