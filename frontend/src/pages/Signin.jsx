import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SigninHeader from "@/components/auth/SigninHeader";
import SigninForm from "@/components/auth/SigninForm";
import { useSignin } from "@/hooks/useSignin";

const Signin = () => {
  const auth = useSignin();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px]"
      >
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

          <div className="p-10 lg:p-12">
            <SigninHeader />
            
            <SigninForm 
              email={auth.email}
              setEmail={auth.setEmail}
              password={auth.password}
              setPassword={auth.setPassword}
              loading={auth.loading}
              handleSubmit={auth.handleSubmit}
            />

            <p className="mt-10 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4">Sign up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;




