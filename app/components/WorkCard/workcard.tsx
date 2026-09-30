// // 'use client'

// // import React, { useState, useEffect, useRef } from "react";
// // import Link from "next/link";
// // import Magnet from '../Magnet/Magnet'

// // const works = [
// //   {
// //     id: 1,
// //     thumbnail: "",
// //     title: "Hubton",
// //     subtitle: "Intern as front-end developer at Hubton Indonesia, focused on learning front-end side.",
// //   },
// //   {
// //     id: 2,
// //     thumbnail: "",
// //     title: "Sajua Brewery",
// //     subtitle: "Build e-commerce website with Shopify.",
// //   },
// //   {
// //     id: 3,
// //     thumbnail: "",
// //     title: "Kovsen",
// //     subtitle: "Designed and developed an interactive analytics dashboard with Shopify.",
// //   },
// //   {
// //     id: 4,
// //     thumbnail: "",
// //     title: "Titis",
// //     subtitle: "Crafted a high-performance agency site featuring smooth GSAP motion and clean layout.",
// //   },
// //   {
// //     id: 5,
// //     thumbnail: "",
// //     title: "Lumina Goods",
// //     subtitle: "Built a minimalist headless e-commerce storefront integrated with Shopify API.",
// //   },
// //   {
// //     id: 6,
// //     thumbnail: "",
// //     title: "Rajipo System",
// //     subtitle: "Created a scalable UI component library and design system for web applications.",
// //   },
// // ];

// // const WorkCards: React.FC = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const startXRef = useRef(0);
// //   const isSwipingRef = useRef(false);
// //   const [transitionEnabled, setTransitionEnabled] = useState(true);
// //   const slideCount = works.length;

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 1024);
// //     };

// //     handleResize();
// //     window.addEventListener('resize', handleResize);

// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // Fungsi untuk menangani perpindahan slide dengan infinite yang smooth
// //   const goToSlide = (index: number, withAnimation = true) => {
// //     if (!withAnimation) {
// //       setTransitionEnabled(false);
// //       setCurrentIndex(index);
      
// //       // Re-enable transition after a short delay
// //       setTimeout(() => {
// //         setTransitionEnabled(true);
// //       }, 50);
// //     } else {
// //       setCurrentIndex(index);
// //     }
// //   };

// //   const nextSlide = () => {
// //     if (currentIndex === slideCount - 1) {
// //       // Pindah ke slide pertama tanpa animasi
// //       goToSlide(0, false);
// //     } else {
// //       goToSlide(currentIndex + 1);
// //     }
// //   };

// //   const prevSlide = () => {
// //     if (currentIndex === 0) {
// //       // Pindah ke slide terakhir tanpa animasi
// //       goToSlide(slideCount - 1, false);
// //     } else {
// //       goToSlide(currentIndex - 1);
// //     }
// //   };

// //   // Swipe gesture yang lebih smooth
// //   const handleTouchStart = (e: React.TouchEvent) => {
// //     startXRef.current = e.touches[0].clientX;
// //     isSwipingRef.current = true;
    
// //     // Nonaktifkan transisi selama swipe
// //     setTransitionEnabled(false);
// //   };

// //   const handleTouchMove = (e: React.TouchEvent) => {
// //     if (!isSwipingRef.current) return;
    
// //     const touchX = e.touches[0].clientX;
// //     const diff = touchX - startXRef.current;
    
// //     // Update posisi slide secara real-time
// //     if (containerRef.current) {
// //       containerRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px)`;
// //     }
// //   };

// //   const handleTouchEnd = (e: React.TouchEvent) => {
// //     if (!isSwipingRef.current) return;
// //     isSwipingRef.current = false;
    
// //     const endX = e.changedTouches[0].clientX;
// //     const diff = endX - startXRef.current;
// //     const absDiff = Math.abs(diff);
    
// //     // Threshold 20% lebar layar
// //     const swipeThreshold = window.innerWidth * 0.2;
    
// //     // Aktifkan kembali transisi
// //     setTransitionEnabled(true);
    
// //     if (absDiff > swipeThreshold) {
// //       if (diff > 0) {
// //         prevSlide();
// //       } else {
// //         nextSlide();
// //       }
// //     } else {
// //       // Kembali ke posisi semula jika tidak mencapai threshold
// //       setCurrentIndex(currentIndex);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!isMobile) return;

// //     const interval = setInterval(() => {
// //       nextSlide();
// //     }, 10000);

// //     return () => clearInterval(interval);
// //   }, [isMobile, currentIndex]);

// //   return (
// //     <div className="container mx-auto px-4 pt-15 md:pt-6 w-auto min-h-screen">
// //       <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center my-0 lg:mb-20">Projects & Works</h1>
      
// //       {/* Desktop View */}
// //      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4 w-fit lg:w-fit">
// //       {works.slice(0, 4).map((work) => (
// //       <div
// //         key={work.id}
// //         className="rounded-sm overflow-hidden duration-300 grid grid-cols-1 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] mx-[15px] sm:mx-[100px] md:mx-[150px] lg:mx-[0px] bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all hover:scale-[1.02]"
// //       > 
// //         {/* Bagian Gambar */}
// //         <div className="relative w-full aspect-video overflow-hidden"> {/* Tambahkan aspect-video */}
// //           <img
// //             src={work.thumbnail}
// //             alt={work.title}
// //             className="w-full h-fit object-cover"
// //           />
// //         </div>
        
// //         {/* Bagian Teks */}
// //         <div className="p-4 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black max-w-[280px]">
// //           <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
// //           <p className="text-white dark:text-gray-900 text-xs sm:text-sm xl:text-base">{work.subtitle}</p>
// //         </div>
// //       </div>
// //       ))}
// //     </div>

// //       {/* Mobile/Tablet View - Carousel */}
// //       <div className="lg:hidden relative overflow-hidden"> 
// //         <div 
// //           ref={containerRef}
// //           className="flex transition-transform duration-300 ease-out touch-pan-y"
// //           style={{ 
// //             transform: `translateX(-${currentIndex * 100}%)`,
// //             transition: transitionEnabled ? 'transform 0.3s ease-out' : 'none'
// //           }}
// //           onTouchStart={handleTouchStart}
// //           onTouchMove={handleTouchMove}
// //           onTouchEnd={handleTouchEnd}
// //           onTouchCancel={handleTouchEnd}
// //         >
// //           {works.map((work) => (
// //             <div key={work.id} className="min-w-full px-4 mt-[100px] landscape:mt-7">
// //               <div className="rounded-lg overflow-hidden bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 relative">
// //                   <div className="w-full aspect-video overflow-hidden ">
// //                     <img
// //                       src={work.thumbnail}
// //                       alt={work.title}
// //                       className="w-full object-cover"
// //                     />
// //                   </div>
// //                   <div className="p-4 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black relative">
// //                     <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
// //                     <p className="text-white dark:text-gray-900 text-xs sm:text-sm lg:text-base">{work.subtitle}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Navigation Arrows */}
// //         <button 
// //           onClick={prevSlide}
// //           className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
// //           aria-label="Previous slide"
// //         >
// //           &lt;
// //         </button>
// //         <button 
// //           onClick={nextSlide}
// //           className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
// //           aria-label="Next slide"
// //         >
// //           &gt;
// //         </button>

// //         {/* Indicators */}
// //         <div className="flex justify-center mt-6 space-x-2">
// //           {works.map((_, index) => (
// //             <button
// //               key={index}
// //               onClick={() => goToSlide(index)}
// //               className={`h-3 w-3 rounded-full transition-all ${currentIndex === index ? 'bg-[#FA6B48] w-6' : 'bg-gray-400'}`}
// //               aria-label={`Go to slide ${index + 1}`}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //       {/* Tombol See All jika ada lebih dari 4 works */}
// //         {works.length > 4 && (
// //           <div className="text-center mt-10">
// //             <Magnet padding={50} disabled={false} magnetStrength={2}>
// //               <Link 
// //                 href="https://github.com/ariaajipw"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="button border-black dark:border-black p-3 rounded-full content-center place-self-center w-[130px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] mx-[80px] sm:mx-[205px] md:mx-[278px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]"
// //               >
// //                 See All Projects
// //               </Link>
// //             </Magnet>


// //           </div>
// //         )}
// //     </div>
// //   );
// // };

// // export default WorkCards;

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import Magnet from "../Magnet/Magnet";

// type Work = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   year: string;
//   thumbnail?: string;
//   href?: string;
//   featured?: boolean;
// };

// const works: Work[] = [
//   {
//     id: 1,
//     title: "Hubton",
//     description:
//       "Intern as front-end developer at Hubton Indonesia, focused on learning front-end side.",
//     category: "Development",
//     year: "2024",
//     thumbnail: "/assets/img/dev.hubton.png",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Sajua Brewery",
//     description: "Build e-commerce website with Shopify.",
//     category: "E-Commerce",
//     year: "2024",
//     thumbnail: "",
//   },
//   {
//     id: 3,
//     title: "Kovsen",
//     description:
//       "Designed and developed an interactive analytics dashboard with Shopify.",
//     category: "Dashboard",
//     year: "2024",
//     thumbnail: "",
//   },
//   {
//     id: 4,
//     title: "Titis",
//     description:
//       "Crafted a high-performance agency site featuring smooth GSAP motion and clean layout.",
//     category: "Agency",
//     year: "2024",
//     thumbnail: "",
//   },
//   {
//     id: 5,
//     title: "Lumina Goods",
//     description:
//       "Built a minimalist headless e-commerce storefront integrated with Shopify API.",
//     category: "E-Commerce",
//     year: "2025",
//     thumbnail: "",
//   },
//   {
//     id: 6,
//     title: "Rajipo System",
//     description:
//       "Created a scalable UI component library and design system for web applications.",
//     category: "Design System",
//     year: "2025",
//     thumbnail: "",
//   },

//   // Tambahkan project baru di bawah sini.
//   // Tinggal copy object berikut:
//   //
//   // {
//   //   id: 7,
//   //   title: "Project Name",
//   //   description: "Short project description.",
//   //   category: "Development",
//   //   year: "2025",
//   //   thumbnail: "/assets/projects/project-name.webp",
//   // },

//   // {
//   //   id: 8,
//   //   title: "Another Project",
//   //   description: "Short project description.",
//   //   category: "Web Design",
//   //   year: "2025",
//   //   thumbnail: "/assets/projects/another-project.webp",
//   // },
// ];

// function ProjectPlaceholder({
//   title,
//   category,
// }: {
//   title: string;
//   category: string;
// }) {
//   return (
//     <div className="absolute inset-0 overflow-hidden bg-[#e9e7e2] text-[#111]">
//       {/* subtle grid */}
//       <div
//         className="absolute inset-0 opacity-[0.22]"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.08) 1px, transparent 1px)",
//           backgroundSize: "32px 32px",
//         }}
//       />

//       {/* abstract shape */}
//       <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-black/10" />
//       <div className="absolute -right-2 top-0 h-20 w-20 rounded-full bg-[#FA6B48]" />

//       <div className="absolute bottom-5 left-5 right-5">
//         <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45">
//           {category}
//         </p>

//         <p className="mt-2 max-w-[85%] font-mono text-lg font-medium leading-tight tracking-[-0.04em]">
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// }

// function ProjectImage({
//   project,
//   priority = false,
// }: {
//   project: Work;
//   priority?: boolean;
// }) {
//   const [imageError, setImageError] = useState(false);

//   const hasImage = Boolean(project.thumbnail) && !imageError;

//   return (
//     <div className="group relative aspect-[1.35/1] w-full overflow-hidden bg-[#e9e7e2]">
//       {hasImage ? (
//         <img
//           src={project.thumbnail}
//           alt={`${project.title} project preview`}
//           className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
//           loading={priority ? "eager" : "lazy"}
//           fetchPriority={priority ? "high" : "auto"}
//           onError={() => setImageError(true)}
//         />
//       ) : (
//         <ProjectPlaceholder
//           title={project.title}
//           category={project.category}
//         />
//       )}

//       {/* hover overlay */}
//       <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.04]" />

//       {/* small index */}
//       <div className="absolute left-3 top-3 z-10">
//         <span className="flex h-7 min-w-7 items-center justify-center border border-white/40 bg-black/20 px-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
//           {String(project.id).padStart(2, "0")}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function WorkCards() {
//   const [visibleCount, setVisibleCount] = useState(8);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 639px)");

//     const update = () => {
//       setIsMobile(mediaQuery.matches);
//     };

//     update();

//     mediaQuery.addEventListener("change", update);

//     return () => {
//       mediaQuery.removeEventListener("change", update);
//     };
//   }, []);

//   const visibleWorks = useMemo(() => {
//     return works.slice(0, visibleCount);
//   }, [visibleCount]);

//   const hasMore = visibleCount < works.length;

//   return (
//     <section
//       id="works"
//       className="relative w-full px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 xl:px-20"
//     >
//       <div className="mx-auto w-full max-w-[1500px]">
//         {/* ------------------------------------------------ */}
//         {/* HEADER */}
//         {/* ------------------------------------------------ */}

//         <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <div className="mb-4 flex items-center gap-3">
//               <span className="h-[1px] w-8 bg-black dark:bg-white" />

//               <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
//                 Selected Works
//               </span>
//             </div>

//             <h2 className="font-mono text-3xl font-medium tracking-[-0.07em] text-black dark:text-white sm:text-4xl lg:text-5xl">
//               Projects & Works
//             </h2>
//           </div>

//           <div className="max-w-[360px]">
//             <p className="font-mono text-xs leading-[1.7] text-black/55 dark:text-white/55 sm:text-sm">
//               A collection of selected projects, experiments and digital
//               experiences I&apos;ve worked on.
//             </p>
//           </div>
//         </div>

//         {/* ------------------------------------------------ */}
//         {/* PROJECT GRID */}
//         {/* ------------------------------------------------ */}

//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-x-4
//             gap-y-10
//             sm:grid-cols-2
//             sm:gap-x-5
//             sm:gap-y-12
//             lg:grid-cols-3
//             xl:grid-cols-4
//           "
//         >
//           {visibleWorks.map((project, index) => {
//             const content = (
//               <>
//                 {/* image */}
//                 <ProjectImage
//                   project={project}
//                   priority={index < 4}
//                 />

//                 {/* information */}
//                 <div className="mt-4">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="min-w-0">
//                       <h3 className="font-mono text-sm font-medium tracking-[-0.03em] text-black dark:text-white sm:text-[15px]">
//                         {project.title}
//                       </h3>

//                       <p className="mt-2 max-w-[320px] font-mono text-[11px] leading-[1.6] text-black/50 dark:text-white/50 sm:text-xs">
//                         {project.description}
//                       </p>
//                     </div>

//                     <span className="shrink-0 pt-[2px] font-mono text-[9px] uppercase tracking-[0.12em] text-black/40 dark:text-white/40">
//                       {String(project.id).padStart(2, "0")}
//                     </span>
//                   </div>

//                   <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-black/40 dark:text-white/40">
//                     <span>{project.category}</span>

//                     <span className="h-[2px] w-[2px] rounded-full bg-black/30 dark:bg-white/30" />

//                     <span>{project.year}</span>
//                   </div>
//                 </div>
//               </>
//             );

//             if (project.href) {
//               return (
//                 <Link
//                   key={project.id}
//                   href={project.href}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="
//                     group
//                     block
//                     outline-none
//                     focus-visible:ring-2
//                     focus-visible:ring-[#FA6B48]
//                     focus-visible:ring-offset-4
//                     dark:focus-visible:ring-offset-black
//                   "
//                 >
//                   {content}
//                 </Link>
//               );
//             }

//             return (
//               <article
//                 key={project.id}
//                 className="
//                   group
//                   block
//                   outline-none
//                 "
//               >
//                 {content}
//               </article>
//             );
//           })}
//         </div>

//         {/* ------------------------------------------------ */}
//         {/* LOAD MORE */}
//         {/* ------------------------------------------------ */}

//         {hasMore && (
//           <div className="mt-14 flex justify-center sm:mt-16">
//             <Magnet padding={30} disabled={isMobile}>
//               <button
//                 type="button"
//                 onClick={() => setVisibleCount((prev) => prev + 8)}
//                 className="
//                   flex
//                   min-h-11
//                   items-center
//                   justify-center
//                   rounded-full
//                   border
//                   border-black
//                   bg-transparent
//                   px-7
//                   py-3
//                   font-mono
//                   text-[10px]
//                   uppercase
//                   tracking-[0.14em]
//                   text-black
//                   transition-all
//                   duration-300
//                   hover:bg-[#FA6B48]
//                   hover:text-black
//                   hover:border-[#FA6B48]
//                   focus-visible:outline-none
//                   focus-visible:ring-2
//                   focus-visible:ring-[#FA6B48]
//                   focus-visible:ring-offset-4
//                   dark:border-white
//                   dark:text-white
//                   dark:hover:border-[#FA6B48]
//                   dark:hover:text-black
//                   dark:focus-visible:ring-offset-black
//                 "
//               >
//                 Load more
//               </button>
//             </Magnet>
//           </div>
//         )}

//         {/* ------------------------------------------------ */}
//         {/* FOOTER CTA */}
//         {/* ------------------------------------------------ */}

//         <div className="mt-20 border-t border-black/10 pt-6 dark:border-white/10 sm:mt-24">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//             <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
//               More experiments & projects
//             </p>

//             <Magnet padding={30} disabled={isMobile}>
//               <Link
//                 href="https://github.com/ariaajipw"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="
//                   inline-flex
//                   min-h-11
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#FA6B48]
//                   px-6
//                   py-3
//                   font-mono
//                   text-[10px]
//                   uppercase
//                   tracking-[0.12em]
//                   text-black
//                   transition-all
//                   duration-300
//                   hover:bg-black
//                   hover:text-white
//                   focus-visible:outline-none
//                   focus-visible:ring-2
//                   focus-visible:ring-[#FA6B48]
//                   focus-visible:ring-offset-4
//                   dark:hover:bg-white
//                   dark:hover:text-black
//                   dark:focus-visible:ring-offset-black
//                 "
//               >
//                 View GitHub
//               </Link>
//             </Magnet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import Magnet from "../Magnet/Magnet";

type Work = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  thumbnail?: string;
  href?: string;
};

const works: Work[] = [
  {
    id: 1,
    title: "Sajua Brewery",
    description: "Build e-commerce website with Shopify.",
    category: "E-Commerce",
    year: "2024",
    thumbnail: "",
  },
  {
    id: 2,
    title: "Kovsen",
    description:
      "Designed and developed an interactive analytics dashboard with Shopify.",
    category: "Dashboard",
    year: "2024",
    thumbnail: "",
  },
  {
    id: 3,
    title: "Titis",
    description:
      "Crafted a high-performance agency site featuring smooth GSAP motion and clean layout.",
    category: "Agency",
    year: "2024",
    thumbnail: "",
  },
  {
    id: 4,
    title: "Hubton",
    description:
      "Intern as front-end developer at Hubton Indonesia, focused on learning front-end side.",
    category: "Development",
    year: "2024",
    thumbnail: "/assets/img/dev.hubton.png",
    href: "https://hubton.com",
  },
  {
    id: 5,
    title: "Lumina Goods",
    description:
      "Built a minimalist headless e-commerce storefront integrated with Shopify API.",
    category: "E-Commerce",
    year: "2025",
    thumbnail: "",
  },
  {
    id: 6,
    title: "Rajipo System",
    description:
      "Created a scalable UI component library and design system for web applications.",
    category: "Design System",
    year: "2025",
    thumbnail: "",
  },

  // Tambahkan project baru di bawah sini, carousel otomatis menyesuaikan.
  //
  // {
  //   id: 7,
  //   title: "Project Name",
  //   description: "Short project description.",
  //   category: "Development",
  //   year: "2025",
  //   thumbnail: "/assets/projects/project-name.webp",
  //   href: "https://example.com", // opsional, kartu jadi link
  // },
];

/* ------------------------------------------------------------------ */
/* Placeholder — memakai warna canvas (cream / navy) dari DESIGN.md    */
/* ------------------------------------------------------------------ */

function ProjectPlaceholder({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[#EDDBB5] text-black dark:bg-[#1B3E5C] dark:text-white"
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* abstract shape */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-black/15 dark:border-white/20" />
      <div className="absolute -right-2 top-0 h-20 w-20 rounded-full bg-[#FA6B48]" />

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
        <p className="text-xs text-black/70 dark:text-white/70">{category}</p>
        <p className="mt-1 max-w-[85%] text-lg font-medium leading-tight tracking-[-0.04em]">
          {title}
        </p>
      </div>
    </div>
  );
}

function ProjectImage({
  project,
  priority = false,
}: {
  project: Work;
  priority?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(project.thumbnail) && !imageError;

  return (
    <div className="relative aspect-[1.35/1] w-full overflow-hidden bg-[#EDDBB5] dark:bg-[#1B3E5C]">
      {hasImage ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} project preview`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setImageError(true)}
        />
      ) : (
        <ProjectPlaceholder
          title={project.title}
          category={project.category}
        />
      )}

      {/* hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.06]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card — inverted surface (black ↔ white), accent sebagai fill/judul  */
/* ------------------------------------------------------------------ */

const cardBase =
  "group flex h-full flex-col overflow-hidden rounded-sm bg-black text-white " +
  "transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "dark:bg-white dark:text-gray-950";

function ProjectCard({
  project,
  priority,
}: {
  project: Work;
  priority: boolean;
}) {
  const content = (
    <>
      <ProjectImage project={project} priority={priority} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#FA6B48] px-3 py-1 text-[11px] leading-none text-black">
            {project.category}
          </span>
          <span className="text-[11px] text-white/70 dark:text-gray-700">
            {project.year}
          </span>
        </div>

        {/* accent di atas hitam = AAA; di atas putih (dark mode) pakai ink gelap */}
        <h3 className="mt-4 text-xl font-bold text-[#FA6B48] dark:text-gray-950">
          {project.title}
        </h3>

        <p className="mt-2 text-xs leading-[1.7] text-white/80 dark:text-gray-700 sm:text-sm">
          {project.description}
        </p>
      </div>
    </>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={`${cardBase} outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDDBB5] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#1B3E5C]`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardBase}>{content}</article>;
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

const arrowClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-black text-black " +
  "transition-colors duration-300 motion-reduce:transition-none " +
  "hover:border-[#FA6B48] hover:bg-[#FA6B48] hover:text-black " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDDBB5] " +
  "dark:border-white dark:text-white dark:hover:border-[#FA6B48] dark:hover:text-black " +
  "dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#1B3E5C]";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function WorkCards() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Magnet dimatikan di mobile (sama seperti sebelumnya) */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  /* Lebar satu kartu + gap, dibaca dari DOM sehingga ikut breakpoint CSS */
  const getStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    const step = getStep();
    if (!track || !step) return;

    const max = track.scrollWidth - track.clientWidth;
    const total = Math.max(1, Math.round(max / step) + 1);
    const atEnd = max > 0 && track.scrollLeft >= max - 2;
    const index = atEnd
      ? total - 1
      : Math.min(total - 1, Math.round(track.scrollLeft / step));

    setPages(total);
    setActive(index);
  }, [getStep]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    track.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const scrollToLeft = (left: number) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    trackRef.current?.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  };

  const next = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;

    // di ujung kanan → balik ke pertama
    if (track.scrollLeft >= max - 2) {
      scrollToLeft(0);
    } else {
      scrollToLeft(Math.min(max, track.scrollLeft + getStep()));
    }
  };

  const prev = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;

    // di ujung kiri → lompat ke terakhir
    if (track.scrollLeft <= 2) {
      scrollToLeft(max);
    } else {
      scrollToLeft(Math.max(0, track.scrollLeft - getStep()));
    }
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    scrollToLeft(index === pages - 1 ? max : index * getStep());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section
      id="works"
      className="relative w-full px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
            Projects & Works
          </h2>

          <p className="max-w-[360px] text-xs leading-[1.7]  sm:text-sm">
            A collection of selected projects, experiments and digital
            experiences I&apos;ve worked on.
          </p>
        </div>

        {/* CAROUSEL
            mobile: 1 kartu (+ intip kartu berikutnya) · sm: 2 · md ke atas: 3 */}
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects and works"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="
            flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain py-3
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
            dark:focus-visible:ring-white
            md:gap-5
          "
        >
          {works.map((project, index) => (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${works.length}`}
              className="
                shrink-0 basis-[85%] snap-start
                sm:basis-[calc((100%_-_1rem)/2)]
                md:basis-[calc((100%_-_2.5rem)/3)]
              "
            >
              <ProjectCard project={project} priority={index < 3} />
            </div>
          ))}
        </div>

        {/* CONTROLS — muncul hanya kalau project lebih banyak dari yang terlihat */}
        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <div
              className="flex items-center"
              role="group"
              aria-label="Carousel position"
            >
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to position ${i + 1}`}
                  aria-current={active === i ? "true" : undefined}
                  className="flex h-11 items-center px-1 focus-visible:outline-none"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      active === i
                        ? "w-6 bg-[#FA6B48]"
                        : "w-2 bg-black/25 dark:bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous projects"
                className={arrowClass}
              >
                <Chevron direction="left" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next projects"
                className={arrowClass}
              >
                <Chevron direction="right" />
              </button>
            </div>
          </div>
        )}

        {/* FOOTER CTA */}
        <div className="mt-16 border-t border-black/15 pt-6 dark:border-white/15 sm:mt-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-black/70 dark:text-white/70 sm:text-sm">
              More experiments and projects
            </p>

            <Magnet padding={30} disabled={isMobile}>
              <Link
                href="https://github.com/ariaajipw"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex min-h-11 items-center justify-center rounded-full
                  bg-[#FA6B48] px-6 py-3 text-sm text-black dark:text-white
                  transition-colors duration-300 motion-reduce:transition-none
                  hover:bg-black hover:text-[#FA6B48]
                  dark:hover:bg-white
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDDBB5]
                  dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#1B3E5C]
                "
              >
                View GitHub
              </Link>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
}