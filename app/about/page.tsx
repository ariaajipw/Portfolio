// "use client";

// import React, { useState } from "react";
// import Link from "next/link";

// // Definisikan tipe untuk panel contents
// type PanelContent = {
//   [key: number]: React.ReactNode;
// };

// export default function About() {
//   const [activePanel, setActivePanel] = useState<number>(0);

//   // Data untuk tombol toggle
//   const toggleButtons = [
//     { id: 0, title: "Bio" },
//     { id: 1, title: "Career" },
//     { id: 2, title: "Academy" },
//     { id: 3, title: "Open Source" },
//   ];

//   // Konten untuk setiap panel dengan tipe yang didefinisikan
//   const panelContents: PanelContent = {
//     0: (
//       <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
//         <h3 className="font-bold mb-2"></h3>
//         <span className="font-bold">
//               {" "}
//               A front-end developer obsessed with creating digital experiences
//               that truly 'click'.
//             </span>{" "}
//             <span className="">
//               My experience is still growing, but my mission is clear: turn code
//               into solutions.
//             </span>{" "}
//             <span className="font-bold">
//               Currently geeking out in React, Next.js, Tailwind CSS, & Shopify – learning hands-on through daily projects. 
//             </span>{" "}   
//             <span className="">
//               I'm here to grow, make an impact, and create work that resonates.
//             </span>       
//             <span className="font-bold"> Give me creative challenges, and I'll pour my energy into building
//             genuinely useful and enjoyable things.</span>{" "}
            
//       </div>
//     ),
//     1: (
//       <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
//         <h3 className="font-bold mb-2">Career Experience</h3>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Front-end Developer Intern <br /> <span className="opacity opacity-50">at Hubton Indonesia </span><br />  <span className="opacity opacity-50">(2024 - 2025)</span></li>
//           <li>Freelance Website Projects <br /> <span className="opacity opacity-50">(2025 - until now)</span></li>
//           <br />
//           <br />
//           <br />
//         </ul>
//       </div>
//     ),
//     2: (
//       <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
//         <h3 className="font-bold mb-2">Education</h3>
//         <ul className="list-disc pl-5 space-y-2">
//           <li>Website Development Bootcamp <br /> <span className="opacity opacity-50">Udemy</span></li>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//         </ul>
//       </div>
//     ),
//     3: (
//       <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
//         <h3 className="font-bold mb-2">Open Source Contributions</h3>
//         <ul className="list-disc pl-5 space-y-2">
//           <li><Link 
//               href="https://github.com/ariaajipw"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:opacity-70"
//             >
//               https://github.com/ariaajipw
//             </Link></li>
//             <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//         </ul>
//       </div>
//     ),
//   };

//   return (
//             <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start px-[20px] md:pt[49px]  lg:flex-1-reverse xl:pb-[50px] xl:px-[100px] 2xl:px-[150px] min-h-dvh mb-18">
//       <div className="flex col-span-1 h-full justify-center">
//         <div className="content-center">
//           <img
//             src="assets/img/ariaaji.jpg"
//             alt="ariaaji"
//             className="w-full h-full object-cover"
//             style={{ width: "200%", height: "50%", objectPosition: '50% 30%', transform: 'scale(1)',
//       transformOrigin: 'center',}}
//           />
//         </div>
//       </div>

//       <div className="flex col-span-1 h-full items-start sm:items-center">
//         <div className="w-full">
//           {/* <p className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-xl xl:max-w-[971px] 2xl:max-w-[1290px]">
//             <span className="font-bold">Bio</span> <br />{" "}
//             <span className="">
//               {" "}
//               A front-end developer obsessed with creating digital experiences
//               that truly 'click'.
//             </span>{" "}
//             <span className="font-bold">
//               Currently geeking out over React, Next.js, Tailwind CSS, and
//               Shopify – learning hands-on through daily projects.
//             </span>{" "}
//             <span className="">
//               My experience is still growing, but my mission is clear: turn code
//               into solutions.
//             </span>{" "}
//             Give me creative challenges, and I'll pour my energy into building
//             genuinely useful and enjoyable things.{" "}
//             <span className="font-bold">
//               I'm here to grow, make an impact, and create work that resonates.
//             </span>
//           </p> */}

//           {/* Bagian Toggle */}
//           <div className="">
//             <div className="flex space-x-4 md:space-x-6 mb-4">
//               {toggleButtons.map((button) => (
//                 <button
//                   key={button.id}
//                   className={`px-2 py-2 rounded-lg transition-all duration-200 text-md md:text-lg lg:text-2xl ${
//                     activePanel === button.id
//                       ? " font-bold underline underline-offset-4"
//                       : "text-black hover:bg-black/10 dark:text-gray-200 dark:hover:bg-gray-600 opacity-30 hover:opacity-100"
//                   }`}
//                   onClick={() => setActivePanel(button.id)}
//                 >
//                   {button.title}
//                 </button>
//               ))}
//             </div>

//             {/* Konten yang Berubah berdasarkan Toggle */}
//             <div className="toggle-content transition-opacity duration-300">
//               {panelContents[activePanel]}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type PanelContent = {
  [key: number]: React.ReactNode;
};

type Indicator = { x: number; y: number; w: number; h: number };

/**
 * Semua gerakan di halaman ini:
 * - dipicu oleh aksi pengunjung (klik tab, hover, pointer, scroll)
 * - kecuali satu momen pembuka: potret terbuka + isi panel muncul berurutan
 * - hanya memakai transform / opacity / background-size
 * - dimatikan lewat prefers-reduced-motion (konten tetap terlihat)
 */
const ABOUT_CSS = `
.about-body{font-size:clamp(15px,calc(0.9vw + 11px),24px)}
.about-tab{font-size:clamp(14px,calc(0.5vw + 11px),20px)}

/* ---------- Indikator tab (geser antar tab) ---------- */
.about-indicator{
  transition:transform .55s cubic-bezier(.34,1.4,.64,1),
             width .55s cubic-bezier(.34,1.4,.64,1),
             height .55s cubic-bezier(.34,1.4,.64,1);
}

/* ---------- Panel: ditumpuk di satu sel grid, tinggi mengikuti yang terpanjang ---------- */
.about-panel{
  opacity:0;
  visibility:hidden;
  transition:opacity .25s ease, visibility 0s linear .25s;
}
.about-panel[data-active="true"]{
  opacity:1;
  visibility:visible;
  transition-delay:0s;
}

@keyframes about-rise{from{opacity:0;transform:translateY(16px)}}
@keyframes about-fade{from{opacity:0}}
@keyframes about-sweep{from{background-size:0% 3px}}
@keyframes about-reveal{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}

/* Item list muncul berurutan setiap panel dibuka */
.about-panel[data-active="true"] .about-item{
  animation:about-rise .7s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--i,0) * 80ms + 100ms);
}

/* Kalimat bio: garis aksen menyapu, hover mengisi blok aksen */
.about-sentence{
  background-image:linear-gradient(#FA6B48,#FA6B48);
  background-repeat:no-repeat;
  background-position:0 100%;
  background-size:0% 3px;
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
  transition:background-size .4s cubic-bezier(.2,.8,.2,1), color .2s ease;
}
.about-sentence[data-strong="true"]{background-size:100% 3px}
.about-panel[data-active="true"] .about-sentence{
  animation:about-fade .5s ease backwards, about-sweep .9s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--i,0) * 90ms + 100ms), calc(var(--i,0) * 90ms + 450ms);
}
@media (hover:hover){
  .about-panel[data-active="true"] .about-sentence:hover{
    background-size:100% 100%;
    color:#000;
  }
}

/* ---------- Potret ---------- */
.about-figure{--mx:0;--my:0;--scroll:0}
.about-reveal{animation:about-reveal 1s cubic-bezier(.7,0,.2,1) backwards}
.about-frame{
  transform:translate3d(calc(12px + var(--mx) * 6px),calc(12px + var(--my) * 6px),0);
  transition:transform .5s cubic-bezier(.2,.8,.2,1);
}
.about-photo{
  transform:translate3d(calc(var(--mx) * -6px),calc(var(--scroll) * -16px + var(--my) * -6px),0) scale(1.1);
  transition:transform .2s ease-out;
  will-change:transform;
}
@media (hover:hover){
  .about-figure:hover .about-frame{
    transform:translate3d(calc(18px + var(--mx) * 8px),calc(18px + var(--my) * 8px),0);
  }
}

/* ---------- Reduced motion: tampilkan keadaan akhir, tanpa gerak ---------- */
@media (prefers-reduced-motion:reduce){
  .about-panel,.about-frame,.about-photo,.about-indicator,.about-sentence{transition:none !important}
  .about-reveal,
  .about-panel .about-item,
  .about-panel .about-sentence{animation:none !important}
}
`;

const toggleButtons = [
  { id: 0, title: "Bio" },
  { id: 1, title: "Career" },
  { id: 2, title: "Academy" },
  { id: 3, title: "Open Source" },
];

// Indeks urutan animasi masuk (dipakai CSS lewat --i)
const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

const bodyClass = "about-body leading-[170%] lg:leading-[200%] max-w-[65ch]";

function Row({
  index,
  title,
  meta = [],
  children,
}: {
  index: number;
  title?: string;
  meta?: string[];
  children?: React.ReactNode;
}) {
  return (
    <li className="about-item" style={rise(index)}>
      <div
        className="group relative py-1 pl-5
          before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-black/20 dark:before:bg-white/20
          after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:origin-top after:scale-y-0 after:bg-[#FA6B48] after:transition-transform after:duration-500
          hover:after:scale-y-100 focus-within:after:scale-y-100"
      >
        <div className="transition-transform duration-300 group-hover:translate-x-2 group-focus-within:translate-x-2">
          {title && <p>{title}</p>}
          {meta.map((line) => (
            <p key={line} className="opacity-60">
              {line}
            </p>
          ))}
          {children}
        </div>
      </div>
    </li>
  );
}

export default function About() {
  const [activePanel, setActivePanel] = useState<number>(0);
  const [indicator, setIndicator] = useState<Indicator | null>(null);

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const figureRef = useRef<HTMLElement>(null);

  // ---- Indikator tab: ukur tombol aktif (tetap benar saat tab membungkus baris) ----
  const measure = useCallback(() => {
    const btn = tabRefs.current[activePanel];
    if (!btn) return;
    const next = {
      x: btn.offsetLeft,
      y: btn.offsetTop,
      w: btn.offsetWidth,
      h: btn.offsetHeight,
    };
    setIndicator((prev) =>
      prev &&
      prev.x === next.x &&
      prev.y === next.y &&
      prev.w === next.w &&
      prev.h === next.h
        ? prev
        : next
    );
  }, [activePanel]);

  useEffect(() => {
    measure();
    const list = tabListRef.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (list && ro) ro.observe(list);
    document.fonts?.ready.then(measure);
    return () => ro?.disconnect();
  }, [measure]);

  // ---- Navigasi keyboard untuk tab (panah, Home, End) ----
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = toggleButtons.length - 1;
    let next = activePanel;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = activePanel === last ? 0 : activePanel + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = activePanel === 0 ? last : activePanel - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActivePanel(next);
    tabRefs.current[next]?.focus();
  };

  // ---- Potret: parallax mengikuti scroll (tanpa setState, hanya CSS variable) ----
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--scroll", String((progress - 0.5) * 2));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ---- Potret: bergeser halus mengikuti mouse (hanya mouse, bukan touch) ----
  const onFigureMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const onFigureLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  const panelContents: PanelContent = {
    0: (
      <div className={bodyClass}>
        <p>
          <span className="about-sentence font-bold" data-strong="true" style={rise(0)}>
            A front-end developer obsessed with creating digital experiences that truly
            &apos;click&apos;.
          </span>{" "}
          <span className="about-sentence" style={rise(1)}>
            My experience is still growing, but my mission is clear: turn code into solutions.
          </span>{" "}
          <span className="about-sentence font-bold" data-strong="true" style={rise(2)}>
            Currently geeking out in React, Next.js, Tailwind CSS, &amp; Shopify – learning
            hands-on through daily projects.
          </span>{" "}
          <span className="about-sentence" style={rise(3)}>
            I&apos;m here to grow, make an impact, and create work that resonates.
          </span>{" "}
          <span className="about-sentence font-bold" data-strong="true" style={rise(4)}>
            Give me creative challenges, and I&apos;ll pour my energy into building genuinely
            useful and enjoyable things.
          </span>
        </p>
      </div>
    ),
    1: (
      <div className={bodyClass}>
        <h3 className="about-item mb-3 font-bold" style={rise(0)}>
          Career Experience
        </h3>
        <ul className="space-y-5">
          <Row
            index={1}
            title="Front-end Developer Intern"
            meta={["at Hubton Indonesia", "(2024 - 2025)"]}
          />
          <Row index={2} title="Freelance Website Projects" meta={["(2025 - until now)"]} />
        </ul>
      </div>
    ),
    2: (
      <div className={bodyClass}>
        <h3 className="about-item mb-3 font-bold" style={rise(0)}>
          Education
        </h3>
        <ul className="space-y-5">
          <Row index={1} title="Website Development Bootcamp" meta={["Udemy"]} />
        </ul>
      </div>
    ),
    3: (
      <div className={bodyClass}>
        <h3 className="about-item mb-3 font-bold" style={rise(0)}>
          Open Source Contributions
        </h3>
        <ul className="space-y-5">
          <Row index={1}>
            <Link
              href="https://github.com/ariaajipw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block break-all underline decoration-2 decoration-transparent underline-offset-4 transition-colors duration-300 hover:decoration-[#FA6B48] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:focus-visible:outline-white"
            >
              https://github.com/ariaajipw
            </Link>
          </Row>
        </ul>
      </div>
    ),
  };

  return (
    <main className="grid min-h-dvh grid-cols-1 items-start gap-y-10 px-[20px] pb-10 pt-[100px] text-black sm:grid-cols-2 sm:gap-x-8 lg:gap-x-[30px] xl:px-[100px] xl:pb-[50px] xl:pt-[120px] 2xl:px-[150px] mb-18 dark:text-white">
      <style>{ABOUT_CSS}</style>

      {/* Potret: sticky di layar lebar supaya tetap terlihat saat konten berganti */}
      <div className="w-full self-start sm:sticky sm:top-[110px] xl:top-[130px]">
        <figure
          ref={figureRef}
          onPointerMove={onFigureMove}
          onPointerLeave={onFigureLeave}
          className="about-figure relative mx-auto w-full max-w-[560px] pb-5 pr-5 sm:mx-0 sm:max-w-none"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="about-frame absolute inset-0 border-2 border-[#FA6B48]"
            />
            <div className="about-reveal relative aspect-[4/3] max-h-[55dvh] w-full overflow-hidden bg-[#EDDBB5] sm:aspect-[4/5] sm:max-h-[calc(100dvh-220px)] dark:bg-[#1B3E5C]">
              <img
                src="/assets/img/ariaaji.jpg"
                alt="Portrait of Aria Aji"
                decoding="async"
                className="about-photo h-full w-full object-contain"
                style={{ objectPosition: "100% 50%" }}
              />
            </div>
          </div>
        </figure>
      </div>

      <section className="w-full sm:self-center" aria-label="About">
        {/* Tab: 2x2 di layar kecil, satu baris di lg ke atas */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="About sections"
          onKeyDown={onTabKeyDown}
          className="relative mb-6 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap"
        >
          {indicator && (
            <span
              aria-hidden="true"
              className="about-indicator pointer-events-none absolute left-0 top-0 rounded-full bg-[#FA6B48]"
              style={{
                width: indicator.w,
                height: indicator.h,
                transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
              }}
            />
          )}

          {toggleButtons.map((button, index) => {
            const isActive = activePanel === button.id;
            return (
              <button
                key={button.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`about-tab-${button.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`about-panel-${button.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActivePanel(button.id)}
                className={`about-tab relative z-10 min-h-[44px] rounded-full border-2 px-4 py-2 text-center transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white ${
                  isActive
                    ? `border-transparent text-black ${indicator ? "" : "bg-[#FA6B48]"}`
                    : "border-transparent text-black opacity-70 hover:-translate-y-0.5 hover:border-[#FA6B48] hover:opacity-100 dark:text-white"
                }`}
              >
                {button.title}
              </button>
            );
          })}
        </div>

        {/* Semua panel berbagi satu sel grid: tinggi stabil, tanpa <br /> pengganjal */}
        <div className="grid">
          {toggleButtons.map((button) => {
            const isActive = activePanel === button.id;
            return (
              <div
                key={button.id}
                id={`about-panel-${button.id}`}
                role="tabpanel"
                aria-labelledby={`about-tab-${button.id}`}
                aria-hidden={!isActive}
                data-active={isActive}
                className="about-panel [grid-area:1/1]"
              >
                {panelContents[button.id]}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}