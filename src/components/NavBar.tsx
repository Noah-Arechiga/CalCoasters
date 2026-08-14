import Link from 'next/link';

const links = [
  { href: '/map', label: 'Map' },
  { href: '/coasters', label: 'Coasters' },
  { href: '/near-me', label: 'Near Me' },
  { href: '/compare', label: 'Compare' },
  { href: '/quiz', label: 'Quiz' },
];

export default function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '1.5rem',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        alignItems: 'center',
      }}
    >
      <Link
        href="/"
        style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
      >
        🎢 Nearest Coasters
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}