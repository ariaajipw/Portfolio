// "use client";
// // Ganti isi app/services/page.tsx dengan file ini.
// // Warna & font di sini ngikutin apa yang beneran ke-render di body (lihat
// // app/layout.tsx): JetBrains Mono, bg cream/navy, teks hijau/emas, aksen
// // #FA6B48. Card pricing pakai pola bg-black/white terbalik seperti di
// // app/components/Contact/contact.tsx.

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type Tier = {
//   id: string;
//   label: string;
//   price: string;
//   tagline: string;
//   timeline: string;
//   stack: string;
//   includes: string[];
//   note?: string;
// };

// const tiers: Tier[] = [
//   {
//     id: "business-website",
//     label: "Business Website",
//     price: "Rp 2.500.000 – Rp 5.000.000",
//     tagline:
//       "Solusi cepat untuk UMKM, F&B, dan Personal Brand yang butuh kehadiran online profesional.",
//     timeline: "3–5 Hari Kerja",
//     stack: "Next.js, Tailwind CSS",
//     includes: [
//       "Desain custom (bukan template instan)",
//       "Responsif sempurna di HP dan Desktop",
//       "Optimasi kecepatan loading tinggi",
//       "Tombol WhatsApp / Formulir Kontak",
//       "Integrasi Google Maps",
//       "Setup domain & hosting dasar",
//     ],
//   },
//   {
//     id: "shopify-store",
//     label: "Shopify Store Setup",
//     price: "Rp 8.000.000 – Rp 15.000.000",
//     tagline:
//       "Toko online tangguh untuk brand fashion, retail, dan produk fisik yang siap berjualan otomatis.",
//     timeline: "1–2 Minggu",
//     stack: "Shopify Liquid",
//     includes: [
//       "Setup akun dan konfigurasi Shopify",
//       "Kustomisasi desain tema (Shopify Liquid)",
//       "Struktur navigasi, produk, dan koleksi",
//       "Integrasi Payment Gateway lokal (Midtrans/Xendit)",
//       "Setup ongkos kirim otomatis",
//       "Halaman keranjang & checkout yang teroptimasi",
//     ],
//     note: "Biaya langganan bulanan Shopify, domain, dan aplikasi pihak ketiga ditanggung oleh klien.",
//   },
// ];

// const addons = [
//   { name: "Maintenance & Update Konten", price: "Mulai Rp 500.000 / bulan" },
//   { name: "Copywriting Website", price: "Mulai Rp 1.000.000" },
//   { name: "Penambahan Halaman", price: "Rp 350.000 / halaman" },
// ];

// const steps = [
//   {
//     title: "Discovery Call",
//     desc: "Diskusi kebutuhan, referensi visual, dan target bisnis (Gratis).",
//   },
//   {
//     title: "Proposal & DP 50%",
//     desc: "Kesepakatan harga final, timeline, dan pembayaran uang muka.",
//   },
//   {
//     title: "Development & Review",
//     desc: "Pengerjaan website dengan alokasi 2x revisi desain/konten.",
//   },
//   {
//     title: "Launch & Handover",
//     desc: "Pelunasan 50%, website live, dan penyerahan akses/dokumentasi.",
//   },
// ];

// const WA_LINK =
//   "https://wa.me/6282120623351?text=Halo%2C%20saya%20tertarik%20dengan%20salah%20satu%20paket%20layanan%20di%20halaman%20ini.";

// const btnClass =
//   "inline-block rounded-lg bg-[#FA6B48] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA6B48]";

// export default function ServicesPage() {
//   const rootRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     const ctx = gsap.context(() => {
//       const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
//       const items = gsap.utils.toArray<HTMLElement>(".step-item");

//       if (prefersReducedMotion) {
//         gsap.set([...cards, ...items], { opacity: 1, y: 0, x: 0 });
//         return;
//       }

//       cards.forEach((card, i) => {
//         gsap.fromTo(
//           card,
//           { opacity: 0, y: 32 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             delay: i * 0.12,
//             ease: "power2.out",
//             scrollTrigger: { trigger: card, start: "top 85%" },
//           }
//         );
//       });

//       items.forEach((step, i) => {
//         gsap.fromTo(
//           step,
//           { opacity: 0, x: -16 },
//           {
//             opacity: 1,
//             x: 0,
//             duration: 0.5,
//             delay: i * 0.08,
//             ease: "power2.out",
//             scrollTrigger: { trigger: step, start: "top 90%" },
//           }
//         );
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={rootRef} className="min-h-screen">
//       {/* Hero */}
//       <section className="container mx-auto px-4 pt-28 pb-14">
//         <p className="text-sm opacity-70">
//           Aria — Frontend &amp; Shopify Developer, Bandung
//         </p>
//         <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
//           Website dan Toko Online yang Siap Menghasilkan, Bukan Sekadar
//           Tampil Bagus.
//         </h1>
//         <p className="mt-5 max-w-md opacity-80">
//           Spesialisasi di Landing Page berkecepatan tinggi dan setup Shopify
//           untuk brand yang ingin langsung berjualan. Dibangun dalam hitungan
//           hari, bukan bulan.
//         </p>
//         <a href={WA_LINK} className={`mt-8 ${btnClass}`}>
//           Konsultasi Proyek
//         </a>
//       </section>

//       {/* Pricing cards */}
//       <section className="container mx-auto px-4 py-10">
//         <div className="grid gap-6 lg:grid-cols-2">
//           {tiers.map((tier) => (
//             <div
//               key={tier.id}
//               className="pricing-card rounded-lg bg-black p-7 text-white dark:bg-white dark:text-gray-950"
//             >
//               <h3 className="text-xl font-semibold">{tier.label}</h3>
//               <p className="mt-2 text-lg font-semibold text-[#FA6B48]">
//                 {tier.price}
//               </p>
//               <p className="mt-3 text-sm opacity-80">{tier.tagline}</p>
//               <div className="mt-4 flex gap-4 text-xs opacity-60">
//                 <span>{tier.timeline}</span>
//                 <span>{tier.stack}</span>
//               </div>
//               <ul className="mt-5 space-y-2 text-sm">
//                 {tier.includes.map((item) => (
//                   <li key={item} className="flex gap-2">
//                     <span className="text-[#FA6B48]">–</span>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//               {tier.note && (
//                 <p className="mt-5 border-t border-white/20 pt-4 text-xs opacity-60 dark:border-black/20">
//                   {tier.note}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Add-ons */}
//       <section className="container mx-auto px-4 py-10">
//         <h2 className="text-2xl font-bold">Layanan Tambahan</h2>
//         <div className="mt-5 divide-y divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10">
//           {addons.map((addon) => (
//             <div
//               key={addon.name}
//               className="flex items-center justify-between py-3 text-sm"
//             >
//               <span>{addon.name}</span>
//               <span className="opacity-70">{addon.price}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Process */}
//       <section className="container mx-auto px-4 py-10">
//         <h2 className="text-2xl font-bold">Proses Kerja</h2>
//         <div className="mt-6 space-y-6">
//           {steps.map((step, i) => (
//             <div key={step.title} className="step-item flex gap-4">
//               <span className="text-2xl font-bold opacity-20">
//                 {String(i + 1).padStart(2, "0")}
//               </span>
//               <div>
//                 <h3 className="font-semibold">{step.title}</h3>
//                 <p className="mt-1 text-sm opacity-80">{step.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="container mx-auto px-4 py-16">
//         <h2 className="text-2xl font-bold">Tertarik kerja bareng?</h2>
//         <a href={WA_LINK} className={`mt-5 ${btnClass}`}>
//           Chat via WhatsApp
//         </a>
//       </section>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useRef } from "react";
// // import Link from "next/link";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(ScrollTrigger);

// // const services = [
// //   {
// //     number: "01",
// //     title: "Business Website",
// //     eyebrow: "NEXT.JS / TAILWIND",
// //     description:
// //       "Website profesional untuk UMKM, F&B, personal brand, dan bisnis lokal yang membutuhkan online presence yang cepat dan responsif.",
// //     price: "Rp 2.5M",
// //     priceTo: "Rp 5M",
// //     timeline: "3 — 5 hari kerja",
// //     features: [
// //       "Custom design",
// //       "Responsive HP & Desktop",
// //       "Optimasi loading",
// //       "WhatsApp / Contact Form",
// //       "Google Maps",
// //       "Setup domain & hosting dasar",
// //     ],
// //   },
// //   {
// //     number: "02",
// //     title: "Shopify Store",
// //     eyebrow: "SHOPIFY / LIQUID",
// //     description:
// //       "Setup dan kustomisasi toko online untuk brand fashion, retail, beauty, F&B, dan produk fisik yang siap berjualan.",
// //     price: "Rp 8M",
// //     priceTo: "Rp 15M",
// //     timeline: "1 — 2 minggu",
// //     features: [
// //       "Setup & konfigurasi Shopify",
// //       "Theme customization",
// //       "Struktur produk & koleksi",
// //       "Payment gateway lokal",
// //       "Setup ongkos kirim",
// //       "Cart & checkout optimization",
// //     ],
// //   },
// // ];

// // const addons = [
// //   {
// //     number: "01",
// //     title: "Maintenance",
// //     description: "Update konten dan perawatan website setelah project selesai.",
// //     price: "Mulai Rp 500K",
// //     suffix: "/ bulan",
// //   },
// //   {
// //     number: "02",
// //     title: "Copywriting",
// //     description: "Membantu menyusun konten website agar lebih jelas dan siap digunakan.",
// //     price: "Mulai Rp 1JT",
// //     suffix: "",
// //   },
// //   {
// //     number: "03",
// //     title: "Extra Page",
// //     description: "Penambahan halaman di luar scope project yang sudah disepakati.",
// //     price: "Rp 350K",
// //     suffix: "/ halaman",
// //   },
// // ];

// // const process = [
// //   {
// //     number: "01",
// //     title: "Discovery Call",
// //     description:
// //       "Kita membahas kebutuhan, referensi visual, target bisnis, dan scope project.",
// //   },
// //   {
// //     number: "02",
// //     title: "Proposal & DP",
// //     description:
// //       "Setelah scope jelas, kamu mendapatkan proposal, timeline, dan harga final. DP 50% untuk memulai.",
// //   },
// //   {
// //     number: "03",
// //     title: "Development & Review",
// //     description:
// //       "Website mulai dikerjakan dengan maksimal 2x revisi desain atau konten.",
// //   },
// //   {
// //     number: "04",
// //     title: "Launch & Handover",
// //     description:
// //       "Pelunasan 50%, website live, kemudian akses dan dokumentasi diserahkan.",
// //   },
// // ];

// // export default function ServicesPage() {
// //   const pageRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const ctx = gsap.context(() => {
// //       /*
// //        * HERO
// //        */
// //       gsap.from(".services-hero-item", {
// //         y: 50,
// //         opacity: 0,
// //         duration: 0.9,
// //         stagger: 0.1,
// //         ease: "power3.out",
// //       });

// //       /*
// //        * ORANGE DECORATION
// //        */
// //       gsap.to(".services-orb", {
// //         y: -25,
// //         x: 15,
// //         duration: 4,
// //         repeat: -1,
// //         yoyo: true,
// //         ease: "sine.inOut",
// //       });

// //       /*
// //        * SECTION REVEAL
// //        */
// //       gsap.utils.toArray<HTMLElement>(".services-reveal").forEach((element) => {
// //         gsap.from(element, {
// //           y: 45,
// //           opacity: 0,
// //           duration: 0.8,
// //           ease: "power3.out",
// //           scrollTrigger: {
// //             trigger: element,
// //             start: "top 82%",
// //             once: true,
// //           },
// //         });
// //       });

// //       /*
// //        * SERVICE CARDS
// //        */
// //       gsap.from(".service-card", {
// //         y: 70,
// //         opacity: 0,
// //         duration: 0.9,
// //         stagger: 0.15,
// //         ease: "power3.out",
// //         scrollTrigger: {
// //           trigger: ".service-grid",
// //           start: "top 78%",
// //           once: true,
// //         },
// //       });

// //       /*
// //        * ADD-ONS
// //        */
// //       gsap.from(".addon-card", {
// //         y: 40,
// //         opacity: 0,
// //         duration: 0.7,
// //         stagger: 0.1,
// //         ease: "power2.out",
// //         scrollTrigger: {
// //           trigger: ".addon-grid",
// //           start: "top 82%",
// //           once: true,
// //         },
// //       });

// //       /*
// //        * PROCESS
// //        */
// //       gsap.from(".process-item", {
// //         x: -30,
// //         opacity: 0,
// //         duration: 0.7,
// //         stagger: 0.12,
// //         ease: "power2.out",
// //         scrollTrigger: {
// //           trigger: ".process-list",
// //           start: "top 82%",
// //           once: true,
// //         },
// //       });
// //     }, pageRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <main
// //       ref={pageRef}
// //       className="overflow-hidden bg-white text-gray-900 dark:bg-zinc-950 dark:text-white"
// //     >
// //       {/* =====================================================
// //           HERO
// //       ====================================================== */}
// //       <section className="relative min-h-[calc(100vh-64px)] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
// //         {/* Subtle grid */}
// //         <div
// //           className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
// //             backgroundSize: "72px 72px",
// //           }}
// //         />

// //         {/* Orange glow */}
// //         <div className="services-orb pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#FA6B48]/10 blur-3xl dark:bg-[#FA6B48]/15" />

// //         <div className="relative mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col justify-center">
// //           <div className="services-hero-item mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
// //             <span className="h-px w-8 bg-[#FA6B48]" />
// //             Web Development Services
// //           </div>

// //           <h1 className="services-hero-item max-w-6xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.9] tracking-[-0.065em]">
// //             Website dan toko online
// //             <br />
// //             <span className="text-gray-400 dark:text-gray-600">
// //               yang siap digunakan.
// //             </span>
// //           </h1>

// //           <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
// //             <p className="services-hero-item max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
// //               Spesialisasi di landing page berkecepatan tinggi dan setup
// //               Shopify untuk brand yang ingin memiliki online presence
// //               profesional dan siap berjualan.
// //             </p>

// //             <Link
// //               href="/contact"
// //               className="services-hero-item group inline-flex w-fit items-center gap-5 rounded-full border border-gray-900 px-6 py-3 text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:bg-[#FA6B48] hover:border-[#FA6B48] hover:text-black dark:border-white dark:hover:bg-[#FA6B48] dark:hover:border-[#FA6B48]"
// //             >
// //               <span>Konsultasi Proyek</span>

// //               <span className="transition-transform duration-300 group-hover:translate-x-1">
// //                 →
// //               </span>
// //             </Link>
// //           </div>

// //           <div className="services-hero-item mt-20 flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600">
// //             <span>Next.js</span>
// //             <span>Tailwind CSS</span>
// //             <span>Shopify</span>
// //             <span>Liquid</span>
// //           </div>
// //         </div>
// //       </section>

// //       {/* =====================================================
// //           SERVICES
// //       ====================================================== */}
// //       <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
// //         <div className="mx-auto max-w-[1400px]">
// //           <div className="services-reveal mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
// //             <div>
// //               <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
// //                 Services / 01—02
// //               </p>

// //               <h2 className="max-w-3xl text-4xl leading-[0.95] tracking-[-0.05em] sm:text-6xl">
// //                 Dua layanan.
// //                 <br />
// //                 <span className="text-gray-400 dark:text-gray-600">
// //                   Satu fokus.
// //                 </span>
// //               </h2>
// //             </div>

// //             <p className="max-w-sm text-xs leading-6 text-gray-500 dark:text-gray-400">
// //               Fokus pada layanan yang bisa dikerjakan dengan cepat, jelas,
// //               dan sesuai kebutuhan bisnis.
// //             </p>
// //           </div>

// //           <div className="service-grid grid gap-5 lg:grid-cols-2">
// //             {services.map((service) => (
// //               <article
// //                 key={service.number}
// //                 className="service-card group relative overflow-hidden rounded-[2px] border border-gray-200 bg-gray-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#FA6B48] dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#FA6B48]/70 sm:p-10"
// //               >
// //                 {/* Accent corner */}
// //                 <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-[#FA6B48]/10 blur-2xl transition-all duration-700 group-hover:bg-[#FA6B48]/20" />

// //                 <div className="relative">
// //                   <div className="flex items-start justify-between">
// //                     <span className="font-mono text-xs text-gray-400 dark:text-gray-600">
// //                       {service.number}
// //                     </span>

// //                     <span className="rounded-full border border-gray-200 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-gray-500 dark:border-white/10 dark:text-gray-500">
// //                       {service.eyebrow}
// //                     </span>
// //                   </div>

// //                   <div className="mt-20">
// //                     <h3 className="text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
// //                       {service.title}
// //                     </h3>

// //                     <p className="mt-5 max-w-lg text-xs leading-6 text-gray-500 dark:text-gray-400 sm:text-sm">
// //                       {service.description}
// //                     </p>
// //                   </div>

// //                   <div className="mt-10 border-y border-gray-200 py-7 dark:border-white/10">
// //                     <div className="flex flex-wrap items-end justify-between gap-5">
// //                       <div>
// //                         <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600">
// //                           Investment
// //                         </p>

// //                         <p className="mt-2 text-2xl tracking-[-0.04em] sm:text-3xl">
// //                           {service.price}
// //                           <span className="text-gray-400 dark:text-gray-600">
// //                             {" "}
// //                             — {service.priceTo}
// //                           </span>
// //                         </p>
// //                       </div>

// //                       <div className="text-right">
// //                         <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600">
// //                           Timeline
// //                         </p>

// //                         <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
// //                           {service.timeline}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mt-8">
// //                     <p className="mb-5 text-[9px] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600">
// //                       Yang kamu dapatkan
// //                     </p>

// //                     <ul className="grid gap-3 sm:grid-cols-2">
// //                       {service.features.map((feature) => (
// //                         <li
// //                           key={feature}
// //                           className="flex items-start gap-3 text-xs leading-5 text-gray-600 dark:text-gray-300"
// //                         >
// //                           <span className="mt-1 text-[#FA6B48]">+</span>
// //                           <span>{feature}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   <Link
// //                     href="/contact"
// //                     className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 text-xs uppercase tracking-[0.12em] dark:border-white/10"
// //                   >
// //                     <span className="text-gray-500 transition-colors group-hover:text-[#FA6B48] dark:text-gray-400">
// //                       Discuss this service
// //                     </span>

// //                     <span className="transition-transform duration-300 group-hover:translate-x-2">
// //                       →
// //                     </span>
// //                   </Link>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>

// //           {/* Transparency */}
// //           <div className="services-reveal mt-5 border-l-2 border-[#FA6B48] bg-gray-50 px-5 py-4 text-[10px] leading-6 text-gray-500 dark:bg-white/[0.025] dark:text-gray-400">
// //             <span className="font-bold text-gray-700 dark:text-gray-200">
// //               Transparansi:
// //             </span>{" "}
// //             biaya langganan Shopify, domain, payment gateway, dan aplikasi
// //             pihak ketiga ditanggung oleh klien.
// //           </div>
// //         </div>
// //       </section>

// //       {/* =====================================================
// //           ADD-ONS
// //       ====================================================== */}
// //       <section className="border-y border-gray-200 bg-gray-50 px-5 py-24 dark:border-white/10 dark:bg-white/[0.015] sm:px-8 lg:px-12 lg:py-32">
// //         <div className="mx-auto max-w-[1400px]">
// //           <div className="services-reveal mb-12">
// //             <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
// //               Additional Services
// //             </p>

// //             <h2 className="text-4xl tracking-[-0.05em] sm:text-5xl">
// //               Butuh lebih?
// //             </h2>
// //           </div>

// //           <div className="addon-grid grid gap-4 md:grid-cols-3">
// //             {addons.map((addon) => (
// //               <article
// //                 key={addon.number}
// //                 className="addon-card group border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#FA6B48] dark:border-white/10 dark:bg-zinc-950 dark:hover:border-[#FA6B48]/70 sm:p-8"
// //               >
// //                 <div className="flex justify-between">
// //                   <span className="font-mono text-xs text-gray-400 dark:text-gray-600">
// //                     {addon.number}
// //                   </span>

// //                   <span className="text-[#FA6B48] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
// //                     +
// //                   </span>
// //                 </div>

// //                 <h3 className="mt-12 text-xl tracking-[-0.03em]">
// //                   {addon.title}
// //                 </h3>

// //                 <p className="mt-4 min-h-12 text-xs leading-6 text-gray-500 dark:text-gray-400">
// //                   {addon.description}
// //                 </p>

// //                 <div className="mt-10">
// //                   <span className="text-lg">{addon.price}</span>

// //                   {addon.suffix && (
// //                     <span className="ml-1 text-xs text-gray-400 dark:text-gray-600">
// //                       {addon.suffix}
// //                     </span>
// //                   )}
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* =====================================================
// //           PROCESS
// //       ====================================================== */}
// //       <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
// //         <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
// //           <div className="services-reveal">
// //             <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600">
// //               How It Works
// //             </p>

// //             <h2 className="max-w-lg text-4xl leading-[0.95] tracking-[-0.05em] sm:text-6xl">
// //               Simple process.
// //               <br />
// //               <span className="text-gray-400 dark:text-gray-600">
// //                 Clear delivery.
// //               </span>
// //             </h2>

// //             <p className="mt-8 max-w-md text-xs leading-6 text-gray-500 dark:text-gray-400 sm:text-sm">
// //               Dari pembicaraan pertama sampai website live, setiap project
// //               memiliki alur kerja yang jelas.
// //             </p>
// //           </div>

// //           <div className="process-list border-t border-gray-200 dark:border-white/10">
// //             {process.map((item) => (
// //               <article
// //                 key={item.number}
// //                 className="process-item grid gap-5 border-b border-gray-200 py-8 dark:border-white/10 sm:grid-cols-[80px_1fr]"
// //               >
// //                 <span className="font-mono text-xs text-[#FA6B48]">
// //                   {item.number}
// //                 </span>

// //                 <div>
// //                   <h3 className="text-xl tracking-[-0.03em]">
// //                     {item.title}
// //                   </h3>

// //                   <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 dark:text-gray-400 sm:text-sm">
// //                     {item.description}
// //                   </p>
// //                 </div>
// //               </article>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* =====================================================
// //           FINAL CTA
// //       ====================================================== */}
// //       <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
// //         <div className="services-reveal relative mx-auto max-w-[1400px] overflow-hidden border border-gray-900 bg-gray-900 px-6 py-20 text-white dark:border-white/10 dark:bg-white/[0.035] sm:px-12 sm:py-28">
// //           {/* Orange accent */}
// //           <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#FA6B48]/20 blur-3xl" />

// //           <div className="relative">
// //             <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/40">
// //               Start a Project
// //             </p>

// //             <h2 className="max-w-5xl text-4xl leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
// //               Punya project
// //               <br />
// //               <span className="text-white/35">di kepala?</span>
// //             </h2>

// //             <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
// //               <p className="max-w-lg text-xs leading-6 text-white/45 sm:text-sm">
// //                 Ceritakan kebutuhanmu. Kita bahas scope, timeline, dan solusi
// //                 yang paling masuk akal untuk project tersebut.
// //               </p>

// //               <Link
// //                 href="/contact"
// //                 className="group inline-flex w-fit items-center gap-5 rounded-full bg-[#FA6B48] px-7 py-4 text-xs uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-white"
// //               >
// //                 <span>Konsultasi Proyek</span>

// //                 <span className="transition-transform duration-300 group-hover:translate-x-2">
// //                   →
// //                 </span>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }