import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Camera,
  Trash2,
  Key,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Account = () => {
  const { user, loading, logout, uploadProfilePicture, deleteProfilePicture } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  if (loading && !user) {
    return (
      <div className="max-w-4xl mx-auto p-8 lg:p-20 space-y-12">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-3xl" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 rounded-[2.5rem]" />
          <Skeleton className="h-64 rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    try {
      await uploadProfilePicture(selectedImage);
      setSelectedImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Remove profile portrait?")) {
      await deleteProfilePicture();
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password", { state: { email: user.email } });
  };

  const profileImage = preview || user?.profileImage || "/default-avatar.png";

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-12">

        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
              </div>
              <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
                <Camera size={20} />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedImage(e.target.files[0])} />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">{user.name}</h1>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-black uppercase tracking-widest text-[8px] h-6">Verified Class A</Badge>
              </div>
              <p className="text-slate-400 font-medium font-serif italic text-lg">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                {user?.roles?.map(role => (
                  <Badge key={role} className="bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[7px] px-3 py-1 rounded-lg">{role}</Badge>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <Button onClick={handleUpload} disabled={isUploading} className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px] bg-slate-900">
                  {isUploading ? "Syncing..." : "Update Portrait"}
                </Button>
                <Button variant="ghost" onClick={() => setSelectedImage(null)} className="h-14 w-14 rounded-2xl text-slate-400">
                  <Trash2 size={20} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Account Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Primary Details */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <User size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Identity Vault</h2>
            </div>

            <div className="space-y-6">
              {[
                { label: "Legal Name", value: user.name, icon: User },
                { label: "Contact Email", value: user.email, icon: Mail },
                { label: "Account Permission", value: user.roles?.join(", "), icon: Shield },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <p className="font-bold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleChangePassword} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 border-slate-200">
                <Key size={14} /> Re-Authorize Security
              </Button>
              <Button variant="ghost" onClick={() => logout()} className="h-14 rounded-2xl font-black uppercase tracking-widest text-[9px] gap-2 text-red-500 hover:bg-red-50">
                <LogOut size={14} /> Termination
              </Button>
            </div>
          </section>

          {/* Activity & Support */}
          <div className="space-y-8">
            <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-colors" onClick={() => navigate("/my-orders")}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Package size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Acquisitions</h3>
                  <p className="text-xs font-medium text-slate-400 font-serif italic">View your luxury order archive</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-slate-200" />
            </section>

            <section className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 grayscale opacity-20 rotate-12">
                <ShieldCheck size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Tier One Protection</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Secure Account</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">Your account is fortified with industrial-grade encryption and secure re-authentication protocols.</p>
                <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[9px]">View Privacy Policy</Button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
