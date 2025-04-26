'use client'

import Link from "next/link";

const socials = [
  { id: 1, name: "GitHub", url: "https://github.com/ariaajipw" },
  { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/aria-aji" },
  { id: 3, name: "Twitter", url: "https://x.com/ariaajipw" },
  { id: 4, name: "Instagram", url: "https://instagram.com/ariaaji" }
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] mt-auto">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[20px]">
          {/* Bagian 1: Tentang Kami */}
          <div>
            <h3 className="text-[16px] sm:text-lg font-semibold text-gray-800 dark:text-white">
              Lorem, ipsum dolor.
            </h3>
            <p className="text-sm sm:text-[16px] mt-4 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati explicabo quod nam! Dolores dicta ut quam sed enim soluta maxime!
            </p>
          </div>

          {/* Bagian 2: Quick Links */}
          <div>
            {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Tautan Cepat
            </h3> */}
            <ul className="mt-4 space-y-2 flex gap-9 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  Blog
                </Link>
              </li>
            </ul>

            {/* Bagian 3: Social Media */}
            <ul className="mt-4 space-y-2 flex gap-9 text-sm">
              {socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#FA6B48]"
                    >
                    {social.name}
                </Link>
              ))}
            </ul>
          </div>

        </div>

        {/* Hak Cipta */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-[16px]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;