'use client'

import Link from "next/link";

const socials = [
  { id: 1, name: "GitHub", url: "https://github.com/ariaajipw" },
  { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/aria-aji" },
  { id: 3, name: "X", url: "https://x.com/ariaajipw" },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-background)] border-t border-[var(--border)] mt-auto text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
      <div className="site-container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-180 px-[20px]">

          {/* About */}
          <div>
            <div className="group">
              <Link href="/" className="flex">
                <span className="hover:text-[var(--accent)] underline underline-offset-5 text-lg lg:text-3xl font-bold text-[var(--text-primary)]">
                  Perkasa Wibowo
                </span>

                <img
                  src="/assets/img/peacock-black.webp"
                  alt="peacock"
                  className="w-[40px] md:w-[60px] hidden group-hover:block group-focus-within:block dark:group-hover:hidden dark:group-focus-within:hidden"
                />

                <img
                  src="/assets/img/peacock-white.webp"
                  alt="peacock"
                  className="w-[40px] md:w-[60px] hidden dark:group-hover:block dark:group-focus-within:block"
                />
              </Link>
            </div>

            <p className="text-xs lg:text-sm mt-4">
              Jl. Terusan Prof. DR. Sutami No. 23,
              <br />
              Bandung, West Java, Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <ul className="mt-2 space-y-2 flex gap-9 text-xs lg:text-sm underline">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <ul className="mt-2 space-y-2 flex gap-9 text-xs lg:text-sm underline">
              {socials.map((social) => (
                <li key={social.id}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] mt-2 pt-2 text-center">
          <p className="text-[var(--muted)] text-xs lg:text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;