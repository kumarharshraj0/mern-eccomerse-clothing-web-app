import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

const FooterBrand = () => (
  <div className="lg:col-span-4 space-y-10">
    <div className="space-y-4">
      <Link to="/" className="text-3xl font-semibold tracking-tighter uppercase inline-block">
        SwiftMart
      </Link>
      <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed">
        Premium quality and uncompromising performance delivered to your doorstep.
      </p>
    </div>

    <div className="space-y-4">
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Newsletter</h5>
      <div className="relative group">
        <Input
          placeholder="Enter your email"
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
);

export default FooterBrand;


