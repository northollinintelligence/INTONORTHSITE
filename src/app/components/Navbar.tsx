// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center gap-3">
        <div className="h-4 w-[2px] bg-white/30" />
        <span className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
          North Ollin
        </span>
      </div>
      
      <div className="flex items-center gap-6 text-xs text-white/40">
        <Link href="#" className="hover:text-white/70 transition-colors duration-300">
          Instagram
        </Link>
        <span className="text-white/10">|</span>
        <Link href="#" className="hover:text-white/70 transition-colors duration-300">
          Al activo
        </Link>
      </div>
    </nav>
  );
}