// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8">
      <div className="text-xs font-medium tracking-wider text-white/50">
        NORTH OLLIN
      </div>
      <div className="flex items-center gap-4 text-xs text-white/50">
        <Link href="#" className="hover:text-white transition-colors">
          Instagram
        </Link>
        <span className="text-white/10">|</span>
        <Link href="#" className="hover:text-white transition-colors">
          Al activo
        </Link>
      </div>
    </nav>
  );
}