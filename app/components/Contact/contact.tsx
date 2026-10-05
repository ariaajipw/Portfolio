'use client'

import React, { useEffect, useRef, useState } from "react";

const contacts = {
  address: "Jl. Terusan Prof. DR. Sutami No.23, Sarijadi, Kec. Sukasari, Bandung, Jawa Barat 40151 Indonesia",
  phone: "+6282120623351",
  email: "ariaajipw@gmail.com"
};

// Link targets — identical to what the old click handlers opened.
const links = {
  address: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.address)}`,
  phone: `https://wa.me/${contacts.phone.replace(/\D/g, '')}?text=${encodeURIComponent("Halo, I would like to ask about...")}`,
  email: `https://mail.google.com/mail/?view=cm&fs=1&to=${contacts.email}&su=${encodeURIComponent("Pertanyaan atau Pesan")}&body=${encodeURIComponent(
    "Halo,\n\nI would like to ask about...\n\nThank You,\n[Your Name]"
  )}`
};

const items = [
  {
    id: "phone",
    title: "Phone Number",
    href: links.phone,
    paths: [
      "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    ],
    lines: ["+62 8212 062 3351"]
  },
  {
    id: "email",
    title: "Email",
    href: links.email,
    paths: [
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ],
    lines: [contacts.email]
  },
  {
    id: "address",
    title: "Address",
    href: links.address,
    paths: [
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    ],
    lines: [
      "Jl. Terusan Prof. DR. Sutami No.23,",
      "Sarijadi, Kec. Sukasari, 40151,",
      "Bandung, West Java, Indonesia"
    ]
  }
];

// Inverted card (DESIGN.md §7): black ↔ white surface. Hover/focus fills with the accent, black text on it.
const cardClass = [
  "group flex flex-col gap-4 rounded-lg p-5 text-left md:p-6",
  "bg-black text-white dark:bg-white dark:text-gray-950",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1 hover:bg-[#FA6B48] hover:text-black",
  "dark:hover:bg-[#FA6B48] dark:hover:text-black",
  "active:scale-[0.98]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:focus-visible:outline-white",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
].join(" ");

const Contact: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  // One orchestrated entrance: the three cards stagger in once the list scrolls into view.
  useEffect(() => {
    const el = listRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-8">
      <ul ref={listRef} className="grid grid-cols-1 gap-4 md:gap-5">
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{ transitionDelay: `${index * 120}ms` }}
            className={[
              "transition-all duration-700 ease-out",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            ].join(" ")}
          >
            <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FA6B48] text-black transition-colors duration-300 group-hover:bg-black group-hover:text-[#FA6B48]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {item.paths.map((d) => (
                      <path key={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                    ))}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-[#FA6B48] transition-colors duration-300 group-hover:text-black md:text-xl dark:text-gray-950 dark:group-hover:text-black">
                  {item.title}
                </h3>
              </div>
              <p className="break-words text-xs leading-relaxed md:text-sm">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;