'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = (): void => {
    const newMode = !isDarkMode;

    setIsDarkMode(newMode);

    if (newMode) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }

    document.documentElement.classList.toggle('dark', newMode);
  };

  const resetToSystemPreference = (): void => {
    localStorage.removeItem('theme');

    const isDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  };

  // Scroll behavior
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      // Background navbar
      setIsScrolled(currentScrollY > 0);

      // Show / hide navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (
        currentScrollY < lastScrollY ||
        currentScrollY <= 100
      ) {
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

  // Function to check if link is active
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
      className={`fixed top-0 right-0 left-0 z-50 py-2 transition-all duration-300 py-3 ${
        /*
         * Menu terbuka = navbar selalu solid.
         * Menu tertutup di homepage paling atas = transparent.
         */
        isMobileMenuOpen
          ? 'bg-[#FDFBF7] dark:bg-[#0a0a0a]'
          : pathname === '/' && !isScrolled
            ? 'bg-transparent'
            : 'bg-[#FDFBF7] dark:bg-[#0a0a0a]'
      } ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold text-black dark:text-white align-middle justify-items-center group relative">
          <a href="/" className="flex">
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

            <span className="hidden group-hover:block hover:text-[#FA6B48] underline">
              Aria Aji
            </span>
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex space-x-12 items-center">

          <Link
            href="/about"
            className={`text-black dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/about'
                ? '!text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            About
          </Link>

          <Link
            href="/services"
            className={`text-black dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/services'
                ? '!text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Services
          </Link>

          <Link
            href="/contact"
            className={`text-black dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/contact'
                ? '!text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Contact
          </Link>

          <Link
            href="/blog"
            className={`text-black dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/blog'
                ? '!text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
          >
            Blog
          </Link>

          {/* Dark Mode Toggle */}
          <div className="relative group">
            <button
              onClick={toggleDarkMode}
              className="p-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition bg-black dark:bg-white hover:bg-gradient-to-r from-[#FA6B48] to-yellow-400 border border-[#FA6B48] rounded-xl"
              aria-label={
                isDarkMode
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition bg-black dark:bg-white hover:bg-gradient-to-r from-[#FA6B48] via-pink-500 to-yellow-400 border border-[#FA6B48] rounded-xl"
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
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
            className="relative flex h-10 w-10 items-center justify-center text-black dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative flex h-6 w-6 flex-col items-center justify-center">

              {/* Top line */}
              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isMobileMenuOpen
                    ? 'rotate-45'
                    : '-translate-y-[7px]'
                }`}
              />

              {/* Middle line */}
              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen
                    ? 'scale-x-0 opacity-0'
                    : 'scale-x-100 opacity-100'
                }`}
              />

              {/* Bottom line */}
              <span
                className={`absolute block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isMobileMenuOpen
                    ? '-rotate-45'
                    : 'translate-y-[7px]'
                }`}
              />

            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden bg-[#FDFBF7] dark:bg-[#0a0a0a] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen
              ? 'translate-y-0'
              : '-translate-y-3'
          }`}
        >

          <Link
            href="/about"
            className={`block py-3 px-4 text-black dark:text-white hover:text-[#FA6B48] transition ${
              isActive('/about')
                ? 'text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>

          <Link
            href="/services"
            className={`block py-3 px-4 text-black dark:text-white hover:text-[#FA6B48] transition ${
              isActive('/services')
                ? 'text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>

          <Link
            href="/contact"
            className={`block py-3 px-4 text-black dark:text-white hover:text-[#FA6B48] transition ${
              isActive('/contact')
                ? 'text-[#FA6B48] font-medium underline underline-offset-1'
                : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            href="/blog"
            className={`block py-3 px-4 text-black dark:text-white hover:text-[#FA6B48] transition ${
              isActive('/blog')
                ? 'text-[#FA6B48] font-medium'
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