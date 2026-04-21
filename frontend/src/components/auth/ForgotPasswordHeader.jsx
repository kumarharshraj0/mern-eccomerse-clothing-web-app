import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Shield } from "lucide-react";

const ForgotPasswordHeader = () => {
  return (
    <>
      <Link to="/signin" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-8">
        <ChevronLeft size={14} /> Return to Entry
      </Link>

      <div className="space-y-3 mb-10">
        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase leading-none">Recover<br /><span className="text-primary font-serif lowercase">access.</span></h1>
        <p className="text-slate-500 font-medium font-serif text-lg pt-2">Enter your verified email to initiate security protocols.</p>
      </div>
    </>
  );
};

export default ForgotPasswordHeader;


