import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

import NavLogo from "./layout/Navbar/NavLogo";
import UserMenu from "./layout/Navbar/UserMenu";
import MobileMenu from "./layout/Navbar/MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const userInitial = user?.name?.[0]?.toUpperCase();

  const categories = ["Clothing", "Footwear", "Grocery", "Fashion"];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 md:mb-6 ${
      scrolled ? "bg-white border-b shadow-sm" : "bg-white"
    }`}>
      {/* 🟢 TOP ROW: Logo & Utility */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between border-b border-slate-100/50">
        <div className="shrink-0 flex items-center justify-start mt-2">
          <NavLogo />
        </div>

        <div className="flex items-center justify-end gap-4 md:gap-6 text-slate-500 flex-1">
          <div className="flex items-center gap-2 md:gap-5">
            {user && (
              <>
                <Link to="/wishlist" className="relative hover:text-primary transition-colors hidden md:block">
                  <Heart size={20} />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="relative hover:text-primary transition-colors">
                  <ShoppingCart size={20} />
                  {cart?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            {user ? (
              <UserMenu user={user} logout={logout} userInitial={userInitial} />
            ) : (
              <Button asChild className="h-10 px-4 md:px-6 rounded-full bg-slate-900 text-white font-semibold uppercase text-[10px] hover:scale-105 transition-all">
                <Link to="/login">Login</Link>
              </Button>
            )}

            <MobileMenu 
              mobileMenuOpen={mobileMenuOpen} 
              setMobileMenuOpen={setMobileMenuOpen}
              user={user} 
              logout={logout} 
              userInitial={userInitial}
            />
          </div>
        </div>
      </div>


      {/* ⚪ BOTTOM ROW: Search & Filters */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-14 hidden md:flex items-center gap-6">
        <div className="flex items-center gap-6 bg-slate-50 rounded-full px-6 py-2 flex-1 border border-slate-100 hover:border-slate-200 transition-all shadow-sm">
          
          {/* Category Selects */}
          <div className="flex items-center gap-8 border-r pr-8 border-slate-200">
            {categories.map((cat) => (
              <div 
                key={cat}
                onClick={() => navigate(`/shop?category=${cat}`)}
                className="group flex items-center gap-2 text-[10px] font-bold text-slate-400 cursor-pointer hover:text-slate-900 transition-colors uppercase tracking-wider"
              >
                <span>{cat}</span>
                <ChevronDown size={12} className="text-slate-300 group-hover:text-slate-900 transition-transform group-hover:rotate-180" />
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-[10px] font-semibold text-slate-300 whitespace-nowrap ml-2 uppercase tracking-[0.2em]">
            <Link to="/shop?tag=new" className="hover:text-slate-900">New</Link>
            <Link to="/shop?tag=sale" className="hover:text-slate-700">Sale</Link>
          </div>

          {/* Functional Search */}
          <div className="flex-1 flex items-center relative ml-4 border-l pl-6 border-slate-200">
            <Search size={14} className="text-slate-300 absolute left-6" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search for essentials..." 
              className="bg-transparent border-none focus-visible:ring-0 h-8 pl-10 text-[11px] font-medium placeholder:text-slate-300 tracking-tight"
            />
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] px-4">
          <Link to="/shop?category=Mens" className="hover:text-slate-900 transition-all">Men</Link>
          <Link to="/shop?category=Womens" className="hover:text-slate-900 transition-all">Women</Link>
          <Link to="/shop?category=Kids" className="hover:text-slate-900 transition-all">Kids</Link>
          <Link to="/shop" className="hover:text-slate-900 transition-all">Brands</Link>
        </div>
      </div>
    </header>
  );
}







