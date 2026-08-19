'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// src/components/NavBar.tsx

// Purpose: Reads the current URL (usePathname) to highlight which nav link is active

const links = [
  { href: '/map', label: 'Map' },
  { href: '/coasters', label: 'Coasters' },
  { href: '/parks', label: 'Parks' },
  { href: '/compare', label: 'Compare' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/about', label: 'About' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-navy-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="font-display text-2xl tracking-wide">
        CalCoasters
      </Link>
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm uppercase tracking-wide">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? 'text-caution'
                  : 'text-white/70 hover:text-white transition-colors'
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}