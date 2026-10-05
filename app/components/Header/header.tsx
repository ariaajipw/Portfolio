'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

/*
 * Ikon dipilih 100% lewat CSS (class `dark` di <html>), bukan state JS.
 * Class `dark` sudah dipasang themeScript sebelum paint, jadi ikon
 * langsung benar saat render awal, refresh, maupun pindah halaman.
 *
 * Dark mode  -> day-and-night.webp (ikon gelap di tombol putih)
 * Light mode -> night-and-day.webp (ikon terang di tombol hitam)
 */
const ThemeToggle = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Toggle dark mode"
    className="p-1 text-[var(--nav-toggle-text)] bg-[var(--nav-toggle-bg)] hover:text-[var(--nav-toggle-hover-text)] hover:bg-[image:var(--gradient-accent)] transition border border-[var(--accent)] rounded-xl"
  >
    <Image
      src="/assets/img/night-and-day.webp"
      alt="darkmode"
      width={24}
      height={24}
      className="w-6 h-6 dark:hidden"
    />
    <Image
      src="/assets/img/day-and-night.webp"
      alt="darkmode"
      width={24}
      height={24}
      className="hidden w-6 h-6 dark:block"
    />
  </button>
);

const Header = () => {
  const pathname = usePathname();

  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);

  const toggleDarkMode = (): void => {
    const next = !document.documentElement.classList.contains('dark');

    document.documentElement.classList.toggle('dark', next);

    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Ignore localStorage errors.
    }
  };

  // Scroll behavior (rAF throttle, state awal dihitung saat mount)
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = (): void => {
      const y = window.scrollY;

      setIsScrolled(y > 0);

      if (y > last && y > 100) {
        setIsHeaderVisible(false);
      } else if (y < last || y <= 100) {
        setIsHeaderVisible(true);
      }

      last = y;
      ticking = false;
    };

    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update(); // benar juga saat refresh di tengah halaman

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Klik di luar header menutup menu mobile
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  // Hanya SATU class warna yang aktif, tidak ada utility yang saling timpa
  const desktopLinkClass = (active: boolean) =>
    `transition hover:text-[var(--accent)] hover:underline hover:underline-offset-1 ${
      active
        ? 'text-[var(--accent-text)] font-medium underline underline-offset-1'
        : 'text-[var(--nav-text)]'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `block py-3 px-4 transition hover:text-[var(--accent)] ${
      active
        ? 'text-[var(--accent-text)] font-medium underline underline-offset-1'
        : 'text-[var(--nav-text)]'
    }`;

  const isSolid = isMobileMenuOpen || pathname !== '/' || isScrolled;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 py-2 ${
        isSolid ? 'bg-[var(--nav-background)]' : 'bg-transparent'
      } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{
        // Warna 180ms = sama dengan transisi body di globals.css
        transition: 'transform 300ms ease, background-color 180ms ease',
      }}
    >
      <div className="site-container flex items-center justify-between">
        {/* Logo */}
        <div className="group relative text-xl font-bold text-[var(--nav-text)]">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/img/peacock-black.webp"
              alt="peacock"
              className=" w-14 dark:hidden"
            />

            <img
              src="/assets/img/peacock-white.webp"
              alt="peacock"
              className="hidden w-14 dark:block"
            />

            <span
              className={`
                inline-block
                overflow-hidden
                whitespace-nowrap
                text-[var(--text-primary)]
                underline
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:text-[var(--accent)]
                ${
                  isMobileMenuOpen
                    ? 'ml-1 max-w-[150px] translate-x-0 translate-y-0 opacity-100'
                    : `
                      ml-0 max-w-0 translate-x-[-8px] translate-y-[2px] opacity-0
                      group-hover:ml-1 group-hover:max-w-[150px] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
                      group-focus-within:ml-1 group-focus-within:max-w-[150px] group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100
                    `
                }
              `}
            >
              Aria Aji
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-12 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={desktopLinkClass(isActive(href))}
            >
              {label}
            </Link>
          ))}

          <ThemeToggle onClick={toggleDarkMode} />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle onClick={toggleDarkMode} />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center text-[var(--nav-text)]"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative flex h-6 w-6 flex-col items-center justify-center">
              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-[7px]'
                }`}
              />

              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen
                    ? 'scale-x-0 opacity-0'
                    : 'scale-x-100 opacity-100'
                }`}
              />

              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-[7px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden bg-[var(--nav-background)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMobileMenuOpen
            ? 'visible max-h-96 translate-y-0 opacity-100'
            : 'invisible max-h-0 -translate-y-2 opacity-0'
        }`}
        inert={!isMobileMenuOpen}
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={mobileLinkClass(isActive(href))}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;