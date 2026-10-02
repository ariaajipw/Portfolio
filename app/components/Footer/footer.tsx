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
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[20px]">

          {/* About */}
          <div>
            <div className="group">
              <a href="/" className="flex">
                <span className="hover:text-[var(--accent)] underline underline-offset-5 text-3xl font-bold text-[var(--text-primary)]">
                  Perkasa Wibowo
                </span>

                <img
                  src="/assets/img/peacock-black.png"
                  alt=""
                  className="w-[40px] h-[28px] md:w-[60px] md:h-[60px] hidden group-hover:block dark:group-hover:hidden group-focus-within:block"
                />

                <img
                  src="/assets/img/peacock-white.png"
                  alt=""
                  className="w-[40px] md:w-[60px] hidden dark:group-hover:block group-focus-within:block"
                />
              </a>
            </div>

            <p className="text-sm mt-4]">
              Bandung,
              <br />
              Jl. Terusan Prof. DR. Sutami No. 23,
              <br />
              Sarijadi, Kec. Sukasari,
              <br />
              Jawa Barat 40151
              <br />
              Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <ul className="mt-4 space-y-2 flex gap-9 text-sm">
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
            <ul className="mt-4 space-y-2 flex gap-9 text-sm">
              {socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {social.name}
                </Link>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 text-center">
          <p className="text-[var(--muted)] text-sm sm:text-[16px]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;