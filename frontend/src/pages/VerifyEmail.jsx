import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';

const VerifyEmail = () => {
  const ve = useVerifyEmail();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] text-center space-y-10"
      >
        <div className="relative inline-block">
          <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-colors duration-1000 ${ve.status === 'success' ? 'bg-green-50 text-green-500' :
            ve.status === 'error' ? 'bg-red-50 text-red-500' :
              'bg-primary/5 text-primary'
            }`}>
            {ve.status === 'verifying' && <Loader2 className="animate-spin" size={40} />}
            {ve.status === 'success' && <CheckCircle2 size={40} />}
            {ve.status === 'error' && <ShieldAlert size={40} />}
          </div>
          {ve.status === 'verifying' && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 rounded-[2.5rem] -z-10"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Mail size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Secure Verification</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-slate-900 uppercase leading-[0.9]">
            {ve.status === 'success' ? 'Verified.' : ve.status === 'error' ? 'Failed.' : 'Verifying...'}
          </h1>
          <p className="text-slate-500 font-medium font-serif text-lg max-w-xs mx-auto pt-2">{ve.message}</p>
        </div>

        <div className="pt-8">
          {ve.status === 'success' && (
            <Button onClick={() => ve.navigate("/signin")} className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 hover:scale-105 transition-all gap-3">
              Enter Dashboard <ArrowRight size={16} />
            </Button>
          )}
          {ve.status === 'error' && (
            <div className="flex flex-col gap-4">
              <Button onClick={() => ve.navigate("/signup")} className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-semibold uppercase tracking-widest text-[10px]">
                Restart Registration
              </Button>
              <Link to="/" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Return to Homepage</Link>
            </div>
          )}
        </div>

        <div className="pt-20 flex items-center justify-center gap-2 text-[9px] font-semibold text-slate-200 uppercase tracking-[0.3em]">
          Global Encryption Protocol Active
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;



