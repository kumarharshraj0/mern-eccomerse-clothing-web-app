import React from 'react';
import FooterBenefits from './layout/Footer/FooterBenefits';
import FooterBrand from './layout/Footer/FooterBrand';
import FooterLinksSet from './layout/Footer/FooterLinksSet';
import FooterContact from './layout/Footer/FooterContact';
import FooterBottom from './layout/Footer/FooterBottom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-8 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FooterBenefits />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">
          <FooterBrand />
          <FooterLinksSet />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;





