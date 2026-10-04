import { Roboto_Flex } from "next/font/google";
import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from "./components/TextPressure/TextPressure";
import WorkCards from "./components/WorkCard/workcard";
import FallingText from "./components/FallingText/FallingText";
import Magnet from "./components/Magnet/Magnet";
import Link from "next/link";
import MorphSlider from "./components/MorphSlider/LazyMorphSlider";
import TextLoop from "./components/TextLoop/TextLoop";

/*
 * Font TextPressure di-host sendiri oleh next/font (bukan lagi dari
 * fonts.googleapis.com saat runtime) dan hanya di-preload di halaman ini.
 * Axis opsi dipakai: wght (otomatis), wdth, opsz. Variabelnya dipakai
 * TextPressure lewat var(--font-roboto-flex).
 */
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const mobileLines = [
  "   Combine   ",
  "   Ideas   ",
  "   Craft   ",
  "   -   &   -   ",
  "   Innovate   ",
];

const desktopLines = ["Combine Ideas,", "Craft & Innovate"];

const items = [
  { image: "/assets/img/KGPIG.jpeg", caption: "hai" },
  { image: "/assets/img/CPSIG.jpeg", caption: "hai" },
  { image: "/assets/img/BKAIG.jpeg", caption: "hai" },
  { image: "/assets/img/BTLK.jpeg", caption: "hai" },
  // { image: "/assets/img/AAPW.jpeg", caption: "hai" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className={`${robotoFlex.variable} hero-section site-container flex min-h-dvh flex-col justify-center pt-15`}
      >
        {/* Mobile */}
        <div className="block w-full min-w-0 sm:hidden">
          {mobileLines.map((line) => (
            <TextPressure
              key={line}
              text={line}
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor=""
              strokeColor=""
              minFontSize={36}
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden w-full min-w-0 sm:block">
          {desktopLines.map((line) => (
            <TextPressure
              key={line}
              text={line}
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor=""
              strokeColor=""
              minFontSize={36}
            />
          ))}
        </div>
      </section>

      {/* Image Section (full-bleed sengaja) */}
      <section className="img-section my-10 flex flex-col">
        <div className="relative h-[550px] w-full md:h-[800px] [&_canvas]:object-contain [&_img]:object-contain">
          <MorphSlider
            items={items}
            transition="melt"
            intensity={1}
            aberration={0.15}
            drift={2}
            autoplay
            overlayColor="#000000"
            duration={0.6}
            ease="power3.out"
            scale={0.9}
            autoplayDelay={6}
            loop
            radius={0}
            showCaptions={false}
            showControls
            showIndicators
          />
        </div>

        {/* Name Ribbon */}
        <div className="mt-15">
          <TextLoop
            text="Aria ✦ Aji ✦ Perkasa ✦ Wibowo"
            shape="wave"
            speed={90}
            direction="reverse"
            separator="✦"
            curviness={20}
            fontSize={50}
            fontWeight={600}
            letterSpacing={9}
            uppercase={false}
            ribbon
            ribbonColor="#FA6B48"
            ribbonWidth={86}
            pauseOnHover
            className="text-[var(--text-primary)]"
          />
        </div>
      </section>

      {/* Second Section */}
      <section className="second-section site-container my-25 h-fit md:mt-0 lg:mt-50 lg:mb-70">
        <div className="grid h-fit lg:grid-cols-12">
          {/* Text Content */}
          <div className="mx-auto content-center place-self-start lg:col-span-6 lg:place-self-center">
            <p className="mt-10 mr-[20px] mb-7 ml-[30px] place-self-center text-sm lg:text-lg">
              A developer focuses on front-end side, crafting web experiences,
              geeking out over current best practices and technologies for
              developing websites.
            </p>

            <div className="mt-5 flex w-full justify-center text-center">
              <BlurText
                text="Aria Aji"
                delay={300}
                animateBy="letters"
                direction="top"
                className="text-[clamp(30px,7vw,83px)] leading-none font-bold text-[var(--accent)]"
              />
            </div>

            <div className="mt-4 mb-5 flex h-20 w-full justify-center text-center text-[var(--accent)]">
              <div className="w-full max-w-full">
                <FallingText
                  text="Front-end Developer"
                  highlightWords={[]}
                  trigger="hover"
                  backgroundColor="transparent"
                  wireframes={false}
                  gravity={0.1}
                  fontSize="clamp(20px, 4vw, 32px)"
                  mouseConstraintStiffness={0.9}
                />
              </div>
            </div>

            <p className="mr-[20px] mb-12 ml-[30px] place-self-center text-sm lg:text-lg">
              Enhance skills through hands-on projects & professional
              experiences. Combining creativity to build engaging experiences.
            </p>

            {/* CTA */}
            <div className="flex w-full justify-center">
              <div className="w-fit">
                <Magnet padding={50} disabled={false} magnetStrength={2}>
                  <Link
                    href="/contact"
                    className="button inline-flex items-center justify-center rounded-full bg-[var(--accent)] p-3 text-center text-black transition-colors hover:bg-[var(--text-tertiary)] hover:text-[var(--accent)] dark:text-white"
                  >
                    Let's Collaborate
                  </Link>
                </Magnet>
              </div>
            </div>
          </div>

          {/* Pixel Image */}
          <div className="order-first content-center place-self-center pl-0 lg:order-last lg:col-span-6 lg:pl-[100px]">
            <PixelTransition
              firstContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#09090b",
                  }}
                >
                  <img
                    src="/assets/img/peacock.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-30 md:size-40 lg:size-60"
                  />
                </div>
              }
              secondContent={
                <img
                  src="/assets/img/ariaaji.jpg"
                  alt="ariaaji"
                  decoding="async"
                  fetchPriority="low"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              }
              gridSize={27}
              pixelColor="#d2d2d4"
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
          </div>
        </div>
      </section>

      {/* Third Section / Work */}
      <section className="third-section site-container landscape:mt-80 landscape:mb-120 sm:landscape:my-0 lg:mt-60">
        <WorkCards />
      </section>
    </>
  );
}