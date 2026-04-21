import React from 'react';
import { Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: "Instagram" },
  { icon: Twitter, href: '#', label: "Twitter" },
  { icon: Facebook, href: '#', label: "Facebook" },
  { icon: Youtube, href: '#', label: "Youtube" },
];

const FooterContact = () => (
  <div className="lg:col-span-3 space-y-10">
    <div className="space-y-6">
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Contact Us</h5>
      <div className="space-y-4">
        <a href="tel:+18887736486" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
          <Phone size={14} /> +1 (888) SWIFTMART
        </a>
        <a href="mailto:support@swiftmart.com" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm font-medium">
          <Mail size={14} /> support@swiftmart.com
        </a>
      </div>
    </div>

    <div className="space-y-4">
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Follow Us</h5>
      <div className="flex gap-4">
        {SOCIAL_LINKS.map((social, i) => (
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
);

export default FooterContact;


