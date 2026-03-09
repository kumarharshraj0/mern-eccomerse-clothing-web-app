import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Mens Collection', href: '/shop' },
      { name: 'Womens Collection', href: '/shop' },
      { name: 'Kids Wear', href: '/shop' },
      { name: 'New Arrivals', href: '/shop' },
      { name: 'Best Sellers', href: '/shop' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Stores', href: '/contact' },
      { name: 'Sustainability', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Order Tracking', href: '#' },
      { name: 'FAQ', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: "Instagram" },
    { icon: Twitter, href: '#', label: "Twitter" },
    { icon: Facebook, href: '#', label: "Facebook" },
    { icon: Youtube, href: '#', label: "Youtube" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-8 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section: Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
          {[
            { icon: Truck, title: "Free Global Shipping", desc: "On orders over ₹5,000" },
            { icon: RotateCcw, title: "30-Day Returns", desc: "Easy, hassle-free process" },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "100% encrypted payment" },
            { icon: Headphones, title: "Expert Support", desc: "24/7 dedicated concierge" },
          ].map((benefit, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                <benefit.icon size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg">{benefit.title}</h4>
                <p className="text-slate-400 text-sm font-medium">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">

          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <Link to="/" className="text-3xl font-black tracking-tighter uppercase inline-block">
                SwiftMart<span className="text-primary italic font-serif lowercase tracking-normal ml-1">store.</span>
              </Link>
              <p className="text-slate-400 text-sm font-medium font-serif italic max-w-sm leading-relaxed">
                Swiftly delivering curated luxury and uncompromising quality to your doorstep.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Elite Newsletter</h5>
              <div className="relative group">
                <Input
                  placeholder="Sign up for early access..."
                  aria-label="Newsletter email address"
                  className="h-14 bg-white/5 border-slate-700 rounded-2xl pl-6 pr-14 focus:ring-primary/20 transition-all text-sm"
                />
                <Button
                  size="icon"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:scale-105 active:scale-95 transition-all"
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{title}</h5>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Contact Us</h5>
              <div className="space-y-4">
                <a href="tel:+1888PREMIUM" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                  <Phone size={14} /> +1 (888) PREMIUM
                </a>
                <a href="mailto:concierge@swiftmart.com" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                  <Mail size={14} /> concierge@swiftmart.com
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Follow Us</h5>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={`Follow us on ${social.label}`}
                    className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all group"
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © {currentYear} SwfitMart STORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link to="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest leading-none">Privacy Policy</Link>
            <Link to="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest leading-none">Terms of Service</Link>
            <div className="flex items-center gap-4 ml-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-30 grayscale contrast-125" alt="Visa" width="40" height="12" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 opacity-30 grayscale contrast-125" alt="Mastercard" width="32" height="20" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 opacity-30 grayscale contrast-125" alt="PayPal" width="60" height="16" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
