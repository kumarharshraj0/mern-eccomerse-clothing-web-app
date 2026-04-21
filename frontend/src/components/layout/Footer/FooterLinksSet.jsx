import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
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

const FooterLinksSet = () => (
  <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
      <div key={title} className="space-y-6">
        <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">{title}</h5>
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
);

export default FooterLinksSet;


