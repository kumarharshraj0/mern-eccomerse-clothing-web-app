import React from 'react';
import { Link } from 'react-router-dom';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
        © {currentYear} SWIFTMART. ALL RIGHTS RESERVED.
      </p>
      <div className="flex items-center gap-8">
        <Link to="#" className="text-[10px] font-semibold text-slate-500 hover:text-white transition-colors uppercase tracking-widest leading-none">Privacy Policy</Link>
        <Link to="#" className="text-[10px] font-semibold text-slate-500 hover:text-white transition-colors uppercase tracking-widest leading-none">Terms of Service</Link>
        <div className="flex items-center gap-4 ml-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-30 grayscale contrast-125" alt="Visa" width="40" height="12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 opacity-30 grayscale contrast-125" alt="Mastercard" width="32" height="20" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 opacity-30 grayscale contrast-125" alt="PayPal" width="60" height="16" />
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;


