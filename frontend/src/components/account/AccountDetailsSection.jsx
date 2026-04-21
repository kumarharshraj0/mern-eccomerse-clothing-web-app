import React from "react";
import { User, Mail, Shield, Key, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccountDetailsSection = ({ user, handleChangePassword, logout }) => {
  const infoItems = [
    { label: "Full Name", value: user.name, icon: User },
    { label: "Email", value: user.email, icon: Mail },
    { label: "Role", value: user.roles?.join(", "), icon: Shield },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          <User size={24} />
        </div>
        <h2 className="text-xl font-semibold uppercase tracking-tight">Account Details</h2>
      </div>

      <div className="space-y-6">
        {infoItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
              <item.icon size={16} />
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
              <p className="font-semibold text-slate-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={handleChangePassword} 
          className="flex-1 h-14 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 border-slate-200 shadow-sm hover:bg-slate-50 transition-all font-sans"
        >
          <Key size={14} /> Change Password
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => logout()} 
          className="h-14 rounded-2xl font-semibold uppercase tracking-widest text-[9px] gap-2 text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={14} /> Logout
        </Button>
      </div>
    </section>
  );
};

export default AccountDetailsSection;


