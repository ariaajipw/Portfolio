'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === "undefined") {
      return false;
    }
  
    return document.documentElement.classList.contains("dark");
  });
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);

  // Sync React state with the theme already applied to <html>
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = (): void => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Scroll behavior
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    let timeoutId: NodeJS.Timeout | null = null;

    const throttledHandleScroll = (): void => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    return (
      pathname === href ||
      pathname.startsWith(href + '/') ||
      (href !== '/' && pathname.startsWith(href))
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 py-2 transition-all duration-300 ${
        isMobileMenuOpen
          ? 'bg-[var(--nav-background)]'
          : pathname === '/' && !isScrolled
            ? 'bg-transparent'
            : 'bg-[var(--nav-background)]'
      } ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-bold text-[var(--nav-text)] align-middle justify-items-center group relative">
        <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/img/peacock-black.png"
              alt=""
              className="w-12 h-8 dark:hidden"
            />

            <img
              src="/assets/img/peacock-white.png"
              alt=""
              className="w-12 h-8 hidden dark:block"
            />

            {/* <span className="hidden group-hover:block text-[var(--text-primary)] dark:text-[var(--text-primary)] hover:text-[var(--accent)] group-focus-within:block underline">
              Aria Aji
            </span> */}
            <span
              className={`
                text-[var(--text-primary)]
                dark:text-[var(--text-primary)]
                hover:text-[var(--accent)]
                underline
                overflow-hidden
                whitespace-nowrap
                inline-block
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  isMobileMenuOpen
                    ? `
                      max-w-[150px]
                      opacity-100
                      translate-x-0
                      translate-y-0
                      ml-1
                    `
                    : `
                      max-w-0
                      opacity-0
                      translate-x-[-8px]
                      translate-y-[2px]
                      ml-0
                      group-hover:max-w-[150px]
                      group-hover:opacity-100
                      group-hover:translate-x-0
                      group-hover:translate-y-0
                      group-hover:ml-1
                      group-focus-within:max-w-[150px]
                      group-focus-within:opacity-100
                      group-focus-within:translate-x-0
                      group-focus-within:translate-y-0
                      group-focus-within:ml-1
                    `
                }
              `}
            >
              Aria Aji
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12 items-center">

          <Link
            href="/about"
            className={`text-[var(--nav-text)] hover:text-[var(--accent)] transition hover:underline hover:underline-offset-1 ${
              pathname === '/about'
                ? '!text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            About
          </Link>

          <Link
            href="/services"
            className={`text-[var(--nav-text)] hover:text-[var(--accent)] transition hover:underline hover:underline-offset-1 ${
              pathname === '/services'
                ? '!text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Services
          </Link>

          <Link
            href="/contact"
            className={`text-[var(--nav-text)] hover:text-[var(--accent)] transition hover:underline hover:underline-offset-1 ${
              pathname === '/contact'
                ? '!text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Contact
          </Link>

          <Link
            href="/blog"
            className={`text-[var(--nav-text)] hover:text-[var(--accent)] transition hover:underline hover:underline-offset-1 ${
              pathname === '/blog'
                ? '!text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Blog
          </Link>

          {/* Dark Mode Toggle */}
          <div className="relative group">
            <button
              onClick={toggleDarkMode}
              className="p-1 text-[var(--nav-toggle-text)] bg-[var(--nav-toggle-bg)] hover:text-[var(--nav-toggle-hover-text)] hover:bg-[var(--accent)] transition border border-[var(--accent)] rounded-xl"
              aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkMode ? (
                <Image
                  src="/assets/img/day-and-night.png"
                  alt="Light Mode"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  priority
                />
              ) : (
                <Image
                  src="/assets/img/night-and-day.png"
                  alt="Dark Mode"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  priority
                />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 text-[var(--nav-toggle-text)] bg-[var(--nav-toggle-bg)] hover:text-[var(--nav-toggle-hover-text)] hover:bg-[var(--gradient-accent)] transition border border-[var(--accent)] rounded-xl"
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <Image
                src="/assets/img/day-and-night.png"
                alt="Light Mode"
                width={24}
                height={24}
                className="w-6 h-6"
                priority
              />
            ) : (
              <Image
                src="/assets/img/night-and-day.png"
                alt="Dark Mode"
                width={24}
                height={24}
                className="w-6 h-6"
                priority
              />
            )}
          </button>

          {/* Animated Hamburger / X */}
          <button
            onClick={toggleMobileMenu}
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
        className={`md:hidden overflow-hidden bg-[var(--nav-background)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >

          <Link
            href="/about"
            className={`block py-3 px-4 text-[var(--nav-text)] hover:text-[var(--accent)] transition ${
              isActive('/about')
                ? 'text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>

          <Link
            href="/services"
            className={`block py-3 px-4 text-[var(--nav-text)] hover:text-[var(--accent)] transition ${
              isActive('/services')
                ? 'text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>

          <Link
            href="/contact"
            className={`block py-3 px-4 text-[var(--nav-text)] hover:text-[var(--accent)] transition ${
              isActive('/contact')
                ? 'text-[var(--accent)] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            href="/blog"
            className={`block py-3 px-4 text-[var(--nav-text)] hover:text-[var(--accent)] transition ${
              isActive('/blog')
                ? 'text-[var(--accent)] font-medium'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;