import React from "react";
import { motion } from "framer-motion";
import ChangePasswordHeader from "@/components/auth/ChangePasswordHeader";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { useChangePassword } from "@/hooks/useChangePassword";

const ChangePassword = () => {
  const cp = useChangePassword();

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
            <ChangePasswordHeader />

            <ChangePasswordForm 
              form={cp.form}
              loading={cp.loading}
              handleChange={cp.handleChange}
              handleSubmit={cp.handleSubmit}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;


