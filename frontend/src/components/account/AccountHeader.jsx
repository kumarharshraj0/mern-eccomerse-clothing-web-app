import React from "react";
import { Camera, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AccountHeader = ({ 
  user, profileImage, selectedImage, setSelectedImage, 
  isUploading, handleUpload 
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-200 ring-1 ring-slate-100">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
          </div>
          <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
            <Camera size={20} />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => setSelectedImage(e.target.files[0])} 
            />
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">{user.name}</h1>
            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-semibold uppercase tracking-widest text-[8px] h-6">Verified</Badge>
          </div>
          <p className="text-slate-400 font-medium text-lg">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            {user?.roles?.map(role => (
              <Badge key={role} className="bg-slate-900 text-white font-semibold uppercase tracking-[0.2em] text-[7px] px-3 py-1 rounded-lg">{role}</Badge>
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
            <Button onClick={handleUpload} disabled={isUploading} className="rounded-2xl h-14 px-8 font-semibold uppercase tracking-widest text-[10px] bg-slate-900 shadow-2xl">
              {isUploading ? "Syncing..." : "Update Portrait"}
            </Button>
            <Button variant="ghost" onClick={() => setSelectedImage(null)} className="h-14 w-14 rounded-2xl text-slate-400 hover:bg-slate-100">
              <Trash2 size={20} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AccountHeader;


