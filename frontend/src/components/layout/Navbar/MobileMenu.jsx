import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/navigation";
import NavLogo from "./NavLogo";

const MobileMenu = ({ 
  mobileMenuOpen, setMobileMenuOpen, 
  user, logout, userInitial 
}) => {
  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[100] md:hidden overflow-y-auto"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <NavLogo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} className="text-slate-900" />
                </button>
              </div>

              {/* Navigation (Scrollable) */}
              <nav className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
                <div className="space-y-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Main Menu</p>
                  <div className="space-y-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between text-2xl font-medium tracking-tight text-slate-900 hover:text-primary transition-all duration-300"
                      >
                        {link.name}
                        <ChevronRight size={18} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Product Categories</p>
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { name: "Mens", label: "Men's Collection" },
                      { name: "Womens", label: "Women's Collection" },
                      { name: "Kids", label: "Children" }
                    ].map((cat) => (
                      <Link
                        key={cat.name}
                        to={`/shop?category=${cat.name}`}
                        state={{ filterType: "category", filterValue: cat.name }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between text-lg font-medium tracking-tight text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {cat.label}
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer Auth Section (Sticky/Bottom) */}
              <div className="p-8 border-t border-slate-100 bg-slate-50 mt-auto">
                {user ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-slate-900/10">
                        {userInitial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs font-medium text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-14 bg-white border border-slate-100 rounded-2xl text-[10px] font-semibold uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-colors">Profile</Link>
                      <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-14 bg-white border border-slate-100 rounded-2xl text-[10px] font-semibold uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-colors">Orders</Link>
                    </div>
                    <Button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }} 
                      variant="ghost" 
                      className="w-full h-14 rounded-2xl text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-destructive hover:bg-destructive/5 transition-all"
                    >
                      Logout Session
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full h-16 rounded-full bg-slate-900 text-white font-semibold uppercase tracking-widest text-[11px] shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login to Account</Link>
                  </Button>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default MobileMenu;


