'use client'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] mt-auto">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[20px]">
          {/* Bagian 1: Tentang Kami */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Lorem, ipsum dolor.
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati explicabo quod nam! Dolores dicta ut quam sed enim soluta maxime!
            </p>
          </div>

          {/* Bagian 2: Tautan Cepat */}
          <div>
            {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Tautan Cepat
            </h3> */}
            <ul className="mt-4 space-y-2 flex gap-9">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Bagian 3: Kontak */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Kontak
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600 dark:text-gray-300">
                Email: info@example.com
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Telepon: +62 123 4567 890
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Alamat: Jl. Contoh No. 123, Jakarta
              </li>
            </ul>
          </div> */}
        </div>

        {/* Hak Cipta */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;