import React from "react";
import { Link } from "react-router-dom";

const NavLogo = () => (
  <Link to="/" className="group" aria-label="SwiftMart Home">
    <div className="flex items-center">
      <svg width="220" height="66" viewBox="100 30 300 90" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14 w-auto">
        <g transform="translate(20, 20)">
          <path d="M20 30 H60 L65 80 H15 L20 30 Z" fill="none" stroke="#00C4CC" strokeWidth="4" strokeLinejoin="round"/>
          <path d="M30 30 C30 15, 50 15, 50 30" fill="none" stroke="#00C4CC" strokeWidth="4" strokeLinecap="round"/>
          
          <path d="M10 65 Q35 65 55 45" fill="none" stroke="#0D3560" strokeWidth="6" strokeLinecap="round"/>
          <path d="M55 45 L45 45 M55 45 L55 55" fill="none" stroke="#0D3560" strokeWidth="6" strokeLinecap="round"/>
        </g>

        <g transform="translate(100, 60)">
          <text fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#0D3560">SWIFTMART</text>
          <text x="2" y="30" fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="2" fill="#555" className="hidden md:block">FAST. RELIABLE. SECURE.</text>
        </g>
      </svg>
    </div>

  </Link>
);


export default NavLogo;



