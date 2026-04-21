import React from "react";

const SocialBar = () => {
  const brands = ['Instagram', 'Linkedin', 'Twitter', 'Vogue', 'Hypebeast', 'ArchitecturalDigest'];

  return (
    <div className="py-20 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
        {brands.map((brand) => (
          <span key={brand} className="text-xs font-semibold uppercase tracking-widest cursor-default">{brand}</span>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;


