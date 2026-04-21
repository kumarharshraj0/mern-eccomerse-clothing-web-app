import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, LogOut, Sparkles, Package, ChevronDown } from "lucide-react";

const UserMenu = ({ user, logout, userInitial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-1 pr-3 rounded-full border transition-all duration-300 ${
          isOpen 
          ? "bg-white border-primary shadow-lg ring-4 ring-primary/5" 
          : "bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-semibold shadow-md shadow-slate-900/10">
          {userInitial}
        </div>
        <div className="text-left hidden lg:block">
          <p className="text-[10px] font-semibold text-slate-900 leading-none">Account</p>
        </div>
        <ChevronDown 
          size={12} 
          className={`text-slate-400 mr-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} 
        />
      </button>

      {/* Dropdown */}
      <div 
        className={`absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-4 transition-all duration-300 z-[100] ${
          isOpen 
          ? "opacity-100 visible translate-y-0" 
          : "opacity-0 invisible translate-y-2"
        }`}
      >
        <div className="p-4 border-b border-slate-50 mb-2">
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-tight">{user.name}</p>
          <p className="text-[10px] font-medium text-slate-400">{user.email}</p>
        </div>
        <div className="space-y-1">
          <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <User size={16} /> Account Profile
          </Link>
          <Link to="/my-orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <ShoppingBag size={16} /> Order History
          </Link>
          {user.role === 'admin' && (
            <>
              <div className="h-px bg-slate-50 my-2" />
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest transition-colors mb-1">
                <Sparkles size={16} /> Dashboard
              </Link>
              <Link to="/admin/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                <Package size={16} /> Manage Inventory
              </Link>
            </>
          )}
          <div className="h-px bg-slate-50 my-2" />
          <button 
            onClick={() => {
              setIsOpen(false);
              logout();
            }} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-xs font-semibold text-red-500 transition-colors"
          >
            <LogOut size={16} /> Terminate Session
          </button>
        </div>
      </div>
    </div>
  );
};


export default UserMenu;


