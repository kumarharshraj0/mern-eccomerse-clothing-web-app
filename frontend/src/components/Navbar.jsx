import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingBag, Menu, X, Heart, User, LogOut, ChevronDown, Sparkles, Search, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import CartPage from "../pages/Cart";
import WishlistPage from "../pages/Wishlist";

export default function Navbar() {
  const { cart, reloadCart } = useCart();
  const { wishlist, getWishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      reloadCart();
      getWishlist();
    }
  }, [user, reloadCart, getWishlist]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const safeCart = Array.isArray(cart) ? cart : [];
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  const userInitial = user?.name?.[0]?.toUpperCase();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" : "bg-white/0 py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="SwiftMart Home">
          <div className="w-10 h-10 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-slate-200">
            <img src="/logo.png" alt="SwiftMart Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors">SwiftMart</span>
        </Link>

        {/* ================= DESKTOP ================= */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${location.pathname === link.path ? "text-primary" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-500 ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-100 mx-2" />

          <div className="flex items-center gap-6">
            {/* Wishlist */}
            {user && (
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label={`View Wishlist (${safeWishlist.length} items)`}
                    className="relative p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group"
                  >
                    <Heart size={20} className="group-hover:fill-current" />
                    {safeWishlist.length > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[8px] font-black flex items-center justify-center rounded-full">
                        {safeWishlist.length}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg p-0 overflow-y-auto">
                  <div className="p-0">
                    <WishlistPage isSheet={true} />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label={`View Shopping Cart (${safeCart.length} items)`}
                  className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group"
                >
                  <ShoppingBag size={20} />
                  {safeCart.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                      {safeCart.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg p-0 overflow-y-auto">
                <CartPage isSheet={true} />
              </SheetContent>
            </Sheet>

            {/* Auth/User */}
            {user ? (
              <div className="relative group">
                <button
                  aria-label="User Account Menu"
                  className="flex items-center gap-3 p-1 pr-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    {userInitial}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Authenticated</p>
                    <p className="text-[11px] font-black text-slate-900 leading-none flex items-center gap-1">
                      {user.name.split(' ')[0]} <ChevronDown size={12} className="text-slate-300" />
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                  <div className="p-4 border-b border-slate-50 mb-2">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{user.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 italic">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Link to="/account" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                      <User size={16} /> My Account Vault
                    </Link>
                    <Link to="/my-orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                      <ShoppingBag size={16} /> Order History
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary text-xs font-black uppercase tracking-widest transition-colors mb-1">
                          <Sparkles size={16} /> Admin Command
                        </Link>
                        <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                          <Package size={16} className="text-primary" /> Manage Products
                        </Link>
                      </>
                    )}
                    <div className="h-px bg-slate-50 my-2" />
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-xs font-bold text-red-500 transition-colors">
                      <LogOut size={16} /> Terminate Session
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button asChild className="h-11 px-8 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all shadow-xl shadow-slate-200">
                <Link to="/login">Access Entry</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex items-center gap-4">
          {/* Wishlist (Mobile) */}
          {user && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 text-slate-400">
                  <Heart size={20} />
                  {safeWishlist.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-primary text-white text-[7px] font-black flex items-center justify-center rounded-full">{safeWishlist.length}</span>}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto">
                <WishlistPage isSheet={true} />
              </SheetContent>
            </Sheet>
          )}

          {/* Cart (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="relative p-2 text-slate-400">
                <ShoppingBag size={20} />
                {safeCart.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-slate-900 text-white text-[7px] font-black flex items-center justify-center rounded-full">{safeCart.length}</span>}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto">
              <CartPage isSheet={true} />
            </SheetContent>
          </Sheet>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DROP ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 md:hidden"
          >
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-4xl font-black tracking-tighter uppercase text-slate-900 py-2 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-slate-100 my-6" />

              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">{userInitial}</div>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-900">{user.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-slate-100 rounded-2xl text-[10px] font-black uppercase text-center">Profile</Link>
                    <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-slate-100 rounded-2xl text-[10px] font-black uppercase text-center">Orders</Link>
                  </div>
                  <Button onClick={() => { logout(); setMobileMenuOpen(false); }} variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase text-[10px]">Terminate Session</Button>
                </div>
              ) : (
                <Button asChild className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px]">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Access Entry</Link>
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


