import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from "./components/TextPressure/TextPressure";
import WorkCards from "./components/WorkCard/workcard";
import FallingText from "./components/FallingText/FallingText";
import Magnet from "./components/Magnet/Magnet";
import Link from "next/link";
import MorphSlider from "./components/MorphSlider/MorphSlider";
import TextLoop from "./components/TextLoop/TextLoop";

export default function Home() {
  const colorCycle = [
    "#212121",
    "#C9A227",
    "#217147",
    "#212121",
    "#C9A227",
    "#DB7F8E",
    "#212121",
    "#C9A227",
    "#FA6B48",
  ];

  const items = [
    { image: "/assets/img/BKAIG.jpeg", caption: "hai" },
    { image: "/assets/img/CPSIG.jpeg", caption: "hai" },
    { image: "/assets/img/KGPIG.jpeg", caption: "hai" },
    { image: "/assets/img/BTLK.jpeg", caption: "hai" },
    { image: "/assets/img/AAPW.jpeg", caption: "hai" },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="hero-section container flex flex-col mx-auto min-h-dvh w-full content-center place-self-center pt-15">

        {/* Mobile */}
        <div
          className="sm:block sm:hidden"
          style={{
            position: "relative",
            height: "fit-content",
            width: "100%",
            alignContent: "center",
            placeSelf: "center",
          }}
        >
          <TextPressure
            text="   Combine   "
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

          <TextPressure
            text="   Ideas   "
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

          <TextPressure
            text="   Craft   "
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

          <TextPressure
            text="   -   &   -   "
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

          <TextPressure
            text="   Innovate   "
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
        </div>

        {/* Desktop */}
        <div
          className="hidden sm:block"
          style={{
            position: "relative",
            height: "fit-content",
            width: "100%",
            alignContent: "center",
            placeSelf: "center",
          }}
        >
          <TextPressure
            text="Combine Ideas,"
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

          <TextPressure
            text="Craft & Innovate"
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
        </div>
      </div>

      {/* Image Section */}
      <div className="img-section flex flex-col my-10">
        <div className="relative w-full h-[550px] md:h-[800px] [&_canvas]:object-contain [&_img]:object-contain">
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
      </div>

      {/* Second Section */}
      <div className="second-section container mx-auto h-fit my-25 md:mt-0 lg:mt-50 lg:mb-70">
        <div className="grid lg:grid-cols-12 h-fit">

          {/* Text Content */}
          <div className="lg:col-span-6 content-center px-auto mx-auto place-self-start lg:place-self-center">

            <p className="text-sm lg:text-lg content-center place-self-center px-auto mt-10 ml-[30px] mr-[20px] mb-7">
              A developer focuses on front-end side, crafting web experiences,
              geeking out over current best practices and technologies for
              developing websites.
            </p>

            <div className="w-full flex justify-center text-center mt-5">
              <BlurText
                text="Aria Aji"
                delay={300}
                animateBy="letters"
                direction="top"
                className="text-[clamp(30px,7vw,83px)] font-bold leading-none text-[var(--accent)]"
              />
            </div>

            <div className="w-full flex justify-center text-center mt-4 mb-5 text-[var(--accent)] h-20">
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

            <p className="text-sm lg:text-lg content-center place-self-center px-auto ml-[30px] mr-[20px] mb-12">
              Enhance skills through hands-on projects & professional
              experiences. Combining creativity to build engaging experiences.
            </p>

            {/* CTA */}
            <div className="w-full flex justify-center">
              <div className="w-fit">
                <Magnet
                  padding={50}
                  disabled={false}
                  magnetStrength={2}
                >
                  <Link
                    href="/contact"
                    className="button inline-flex items-center justify-center p-3 rounded-full text-center bg-[var(--accent)] text-black hover:bg-[var(--text-primary)] hover:text-[var(--background)] transition-colors"
                  >
                    Let's Collaborate
                  </Link>
                </Magnet>
              </div>
            </div>
          </div>

          {/* Pixel Image */}
          <div className="lg:col-span-6 content-center place-self-center order-first lg:order-last pl-0 lg:pl-[100px]">
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
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    <img
                      src="assets/img/peacock.png"
                      alt="peacock"
                      className="size-30 md:size-40 lg:size-60"
                    />
                  </p>
                </div>
              }
              secondContent={
                <img
                  src="assets/img/ariaaji.jpg"
                  alt="ariaaji"
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
      </div>

      {/* Third Section / Work */}
      <div className="third-section container flex mx-auto h-fit w-fit content-center place-self-center landscape:mt-80 landscape:mb-120 sm:landscape:my-0 lg:mt-60">
        <WorkCards />
      </div>
    </main>
  );
}