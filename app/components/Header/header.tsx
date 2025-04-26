'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  console.log('Current path:', pathname);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || 
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
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  };

  // Scroll behavior
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to check if link is active
  const isActive = (href: string) => {
    return pathname === href || 
           pathname.startsWith(href + '/') || 
           (href !== '/' && pathname.startsWith(href));
  };

  return (
    <header
      className={`bg-white dark:bg-zinc-950 fixed top-0 right-0 left-0 z-50 py-2 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white align-middle justify-items-center group relative">
          <a href="/" className='flex'><img src="/assets/img/peacock-black.png" alt="" className='w-[40px] dark:hidden'/><img src="/assets/img/peacock-white.png" alt="" className='w-[40px] hidden dark:block'/><span className='hidden group-hover:block hover:text-[#FA6B48]'>Aria Aji</span></a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex space-x-12 items-center">
          {/* <Link 
            href="/" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1`}
          >
            Home
          </Link> */}
          <Link 
            href="/about" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/about' ? '!text-[#FA6B48] font-medium underline underline-offset-1' : ''
            }`}
          >
            About
          </Link>
          <Link 
            href="/services" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/services' ? '!text-[#FA6B48] font-medium underline underline-offset-1' : ''
            }`}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/contact' ? '!text-[#FA6B48] font-medium underline underline-offset-1' : ''
            }`}
          >
            Contact
          </Link>
          <Link 
            href="/blog" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1 ${
              pathname === '/blog' ? '!text-[#FA6B48] font-medium underline underline-offset-1' : ''
            }`}
          >
            Blog
          </Link>

          {/* Dark Mode Toggle */}
          <div className="relative group">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition hover:bg-[#FA6B48] border rounded-xl"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Image 
                  src="/assets/img/night-and-day.png" 
                  alt="Light Mode" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                  priority
                />
              ) : (
                <Image 
                  src="/assets/img/day-and-night.png" 
                  alt="Dark Mode" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                  priority
              />)}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition hover:bg-[#FA6B48] border rounded-xl"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Image 
                  src="/assets/img/night-and-day.png" 
                  alt="Light Mode" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                  priority
                />
              ) : (
                <Image 
                  src="/assets/img/day-and-night.png" 
                  alt="Dark Mode" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                  priority
              />)}
            </button>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-zinc-950 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link 
          href="/about" 
          className={`block py-3 px-4 text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
            isActive('/about') ? 'text-[#FA6B48] font-medium underline underline-offset-1' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link 
          href="/services" 
          className={`block py-3 px-4 text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
            isActive('/services') ? 'text-[#FA6B48] font-medium underline underline-offset-1' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Services
        </Link>
        <Link 
          href="/contact" 
          className={`block py-3 px-4 text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
            isActive('/contact') ? 'text-[#FA6B48] font-medium underline underline-offset-1' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>
        <Link 
          href="/blog" 
          className={`block py-3 px-4 text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
            isActive('/blog') ? 'text-[#FA6B48] font-medium' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Blog
        </Link>
      </div>
    </header>
  );
};

export default Header;