'use client'

import React from "react";

const Contact: React.FC = () => {
  const contacts = {
    address: "Jl. Griya Raya 1 no.6 Bandung, Indonesia",
    phone: "+6282120623351",
    email: "ariaajipw@gmail.com"
  };

  // Functions to handle clicks
  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(contacts.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const openWhatsApp = () => {
    const cleanPhone = contacts.phone.replace(/\D/g, '');
    const message = encodeURIComponent("Halo, I would like to ask about...");
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent("Pertanyaan atau Pesan");
    const body = encodeURIComponent(
      "Halo,\n\nI would like to ask about...\n\nThank You,\n[Your Name]"
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${contacts.email}&su=${subject}&body=${body}`,
      '_blank'
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-75 w-full">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-10 mb-18">Contact</h1>
      <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Alamat */}
          <div onClick={openGoogleMaps} className="p-6 rounded-lg shadow-md text-center bg-black dark:bg-white text-white dark:text-gray-950 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#FA6B48]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-sm">
              Jl. Griya Raya 1 no.6 Bandung, Indonesia
            </p>
          </div>

          {/* Nomor Telepon */}
          <div onClick={openWhatsApp} className="p-6 rounded-lg shadow-md text-center bg-black dark:bg-white text-white dark:text-gray-950 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#FA6B48]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d=""
                  // d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone Number</h3>
            <p>
            +62 8212 062 3351
            </p>
          </div>

          {/* Email */}
          <div onClick={openEmail} className="p-6 rounded-lg shadow-md text-center bg-black dark:bg-white text-white dark:text-gray-950 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
            <div className="flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#FA6B48]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>ariaajipw@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Contact;