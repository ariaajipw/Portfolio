'use client'

import Link from "next/link";

const socials = [
  { id: 1, name: "GitHub", url: "https://github.com/ariaajipw" },
  { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/aria-aji" },
  { id: 3, name: "X", url: "https://x.com/ariaajipw" },
  // { id: 4, name: "Instagram", url: "https://instagram.com/ariaaji" }
];

const Footer = () => {
  return (
    <footer className="bg-[#FDFBF7] dark:bg-[#0a0a0a] border-t border-black/15 dark:border-t-0 mt-auto">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[20px]">
          {/* Bagian 1: Tentang Kami */}
          <div>

          <div className="group">
            {/* <h3 className="text-[16px] sm:text-lg font-semibold text-gray-800 dark:text-white underline underline-offset-2">
              Lorem, ipsum dolor.
            </h3>
            <img src="/assets/img/peacock-black.png" alt="" className="w-[40px]"/> */}
            <a href="/" className='flex'><span className='hover:text-[#FA6B48] underline underline-offset-5 text-3xl font-bold'>Perkasa Wibowo</span><img src="/assets/img/peacock-black.png" alt="" className='w-[60px] hidden group-hover:block dark:hidden'/><img src="/assets/img/peacock-white.png" alt="" className='w-[60px] hidden dark:group-hover:block'/></a>
          </div>
            <p className="text-sm mt-4 text-black/70 dark:text-gray-300">
            Bandung,<br></br>Jl. Terusan Prof. DR. Sutami No. 23, <br></br>Sarijadi, Kec. Sukasari,<br></br>Jawa Barat 40151<br></br>Indonesia.
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
                  className="text-black/70 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-black/70 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-black/70 dark:text-gray-300 hover:text-[#FA6B48]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-black/70 dark:text-gray-300 hover:text-[#FA6B48]"
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
                  className="text-black/70 dark:text-gray-300 hover:text-[#FA6B48]"
                    >
                    {social.name}
                </Link>
              ))}
            </ul>
          </div>

        </div>

        {/* Hak Cipta */}
        <div className="border-t border-black/15 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-black/70 dark:text-gray-300 text-sm sm:text-[16px]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;