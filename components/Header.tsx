'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/create', label: 'Create' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Dashboard' }
];

export default function Header({ userEmail }: { userEmail?: string | null }) {
  const path = usePathname();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl tracking-tight">VidNoFace</span>
          <span className="text-xs text-muted hidden sm:inline">.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                path === item.href ? 'text-primary bg-primary/10' : 'text-muted hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {userEmail ? (
            <Link href="/dashboard" className="text-sm text-muted hover:text-white truncate max-w-[140px]">
              {userEmail}
            </Link>
          ) : (
            <Link href="/login" className="btn btn-outline text-sm py-1.5 px-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
