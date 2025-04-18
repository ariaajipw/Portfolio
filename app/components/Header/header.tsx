// 'use client'

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Header = () => {
//   const pathname = usePathname();
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
//   const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
//   const [lastScrollY, setLastScrollY] = useState<number>(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

//   // Initialize dark mode from localStorage or system preference
//   useEffect(() => {
//     const isDark = localStorage.theme === 'dark' || 
//                   (!('theme' in localStorage) && 
//                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    
//     setIsDarkMode(isDark);
//     document.documentElement.classList.toggle('dark', isDark);
//   }, []);

//   const toggleDarkMode = (): void => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
    
//     if (newMode) {
//       localStorage.theme = 'dark';
//     } else {
//       localStorage.theme = 'light';
//     }
    
//     document.documentElement.classList.toggle('dark', newMode);
//   };

//   const resetToSystemPreference = (): void => {
//     localStorage.removeItem('theme');
//     const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     setIsDarkMode(isDark);
//     document.documentElement.classList.toggle('dark', isDark);
//   };

//   // Scroll behavior (same as before)
//   useEffect(() => {
//     const handleScroll = (): void => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsHeaderVisible(false);
//       } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
//         setIsHeaderVisible(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     let timeoutId: NodeJS.Timeout | null = null;
//     const throttledHandleScroll = (): void => {
//       if (!timeoutId) {
//         timeoutId = setTimeout(() => {
//           handleScroll();
//           timeoutId = null;
//         }, 100);
//       }
//     };

//     window.addEventListener('scroll', throttledHandleScroll);
//     return () => {
//       window.removeEventListener('scroll', throttledHandleScroll);
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [lastScrollY]);

//   const toggleMobileMenu = (): void => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   // Function to check if link is active
//   const isActive = (href: string) => pathname === href;

//   return (
//     <header
//       className={`bg-white dark:bg-zinc-950 shadow-md fixed top-0 right-0 left-0 z-50 py-2 transition-transform duration-300 ${
//         isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
//       }`}
//     >
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-gray-800 dark:text-white">
//           Aria Aji
//         </div>

//         {/* Desktop Navigation Menu */}
//         <nav className="hidden md:flex space-x-12 items-center ">
//         <Link 
//             href="/" 
//             className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
//               isActive('/') ? 'text-[#FA6B48] underline-offset-1' : ''
//             }`}
//           >
//             Home
//           </Link>
//           <Link 
//             href="/about" 
//             className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
//               isActive('/') ? 'text-[#FA6B48] underline-offset-1' : ''
//             }`}
//           >
//             About
//           </Link>
//           <Link href="/services" className="text-gray-800 dark:text-white hover:text-[#FA6B48] transition">
//             Services
//           </Link>
//           <Link href="/contact" className="text-gray-800 dark:text-white hover:text-[#FA6B48] transition" >
//             Contact
//           </Link>

//           {/* Dark Mode Toggle with System Preference Option */}
//           <div className="relative group">
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
//               aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {isDarkMode ? '🌞' : '🌙'}
//             </button>
            
//             {/* <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
//               <button
//                 onClick={() => localStorage.theme = 'light'}
//                 className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Light Mode
//               </button>
//               <button
//                 onClick={() => localStorage.theme = 'dark'}
//                 className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Dark Mode
//               </button>
//               <button
//                 onClick={resetToSystemPreference}
//                 className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 System Preference
//               </button>
//             </div> */}
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="flex items-center gap-4 md:hidden">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
//             aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//           >
//             {isDarkMode ? '🌞' : '🌙'}
//           </button>
          
//           <button 
//             onClick={toggleMobileMenu}
//             className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
//             aria-label="Toggle menu"
//             aria-expanded={isMobileMenuOpen}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div 
//         className={`md:hidden bg-white dark:bg-zinc-950 overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
//         }`}
//         aria-hidden={!isMobileMenuOpen}
//       >
//         <Link 
//           href="/" 
//           className="block py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           onClick={() => setIsMobileMenuOpen(false)}
//         >
//           Home
//         </Link>
//         <Link 
//           href="/about" 
//           className="block py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           onClick={() => setIsMobileMenuOpen(false)}
//         >
//           About
//         </Link>
//         <Link 
//           href="/services" 
//           className="block py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           onClick={() => setIsMobileMenuOpen(false)}
//         >
//           Services
//         </Link>
//         <Link 
//           href="/contact" 
//           className="block py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           onClick={() => setIsMobileMenuOpen(false)}
//         >
//           Contact
//         </Link>
//         {/* <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
//           <button
//             onClick={() => {
//               localStorage.theme = 'light';
//               setIsDarkMode(false);
//               document.documentElement.classList.remove('dark');
//             }}
//             className="w-full text-left py-2 text-gray-800 dark:text-white"
//           >
//             Light Mode
//           </button>
//           <button
//             onClick={() => {
//               localStorage.theme = 'dark';
//               setIsDarkMode(true);
//               document.documentElement.classList.add('dark');
//             }}
//             className="w-full text-left py-2 text-gray-800 dark:text-white"
//           >
//             Dark Mode
//           </button>
//           <button
//             onClick={resetToSystemPreference}
//             className="w-full text-left py-2 text-gray-800 dark:text-white"
//           >
//             System Preference
//           </button>
//         </div> */}
//       </div>
//     </header>
//   );
// };

// export default Header;

'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      className={`bg-white dark:bg-zinc-950 shadow-md fixed top-0 right-0 left-0 z-50 py-2 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          Aria Aji
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex space-x-12 items-center">
          <Link 
            href="/" 
            className={`text-gray-800 dark:text-white hover:text-[#FA6B48] transition hover:underline hover:underline-offset-1`}
          >
            Home
          </Link>
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

          {/* Dark Mode Toggle */}
          <div className="relative group">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌞' : '🌙'}
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
          href="/" 
          className={`block py-3 px-4 text-gray-800 dark:text-white hover:text-[#FA6B48] transition ${
            isActive('/') ? 'text-[#FA6B48] font-medium' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
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
      </div>
    </header>
  );
};

export default Header;