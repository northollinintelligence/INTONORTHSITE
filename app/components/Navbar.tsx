// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-slate-900/50 backdrop-blur-sm border-b border-white/5">
      <div 
        onClick={() => scrollToSection("hero")}
        className="flex cursor-pointer items-center gap-3"
      >
        <div className="h-4 w-[2px] bg-white/30" />
        <span className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
          North Ollin
        </span>
      </div>
      
      <div className="flex items-center gap-6 text-xs text-white/40">
        <button 
          onClick={() => scrollToSection("services")}
          className="hover:text-white/70 transition-colors duration-300"
        >
          Servicios
        </button>
        <span className="text-white/10">|</span>
        <button 
          onClick={() => scrollToSection("chat")}
          className="hover:text-white/70 transition-colors duration-300"
        >
          Asistente
        </button>
        <span className="text-white/10">|</span>
        <button 
          onClick={() => scrollToSection("contact")}
          className="hover:text-white/70 transition-colors duration-300"
        >
          Contacto
        </button>
      </div>
    </nav>
  );
}