import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/constants/navigation";

const DesktopNav = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`text-[9px] font-semibold uppercase tracking-[0.35em] transition-all relative group ${
            location.pathname === link.path ? "text-primary" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          {link.name}
          <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all duration-500 ${
            location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
          }`} />
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;


