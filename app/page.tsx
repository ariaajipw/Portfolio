import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from './components/TextPressure/TextPressure';
import WorkCards from "./components/WorkCard/workcard";
import FallingText from './components/FallingText/FallingText';
import Link from "next/link";

export default function Home() {

   const colorCycle = ["#212121", "#C9A227", "#217147", "#212121", "#C9A227","#DB7F8E", "#212121", "#C9A227","#FA6B48",  ];
  
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="hero-section container flex flex-col mx-auto min-h-dvh w-full content-center place-self-center pt-15">
        {/* mobile for vertical */}
        <div
             className="sm:block sm:hidden"
             style={{
               position: 'relative',
               height: 'fit-content',
               width: '100%',
               alignContent: 'center',
               placeSelf: 'center',
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
              textColor="#000000"
              strokeColor="#5227FF"
              minFontSize={36}
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
            <TextPressure
              text="   Ideas   "
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#000000"
              strokeColor="#5227FF"
              minFontSize={36}
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
            <TextPressure
              text="   Craft   "
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#000000"
              strokeColor="#5227FF"
              minFontSize={36}
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
            <TextPressure
              text="   -   &   -   "
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#000000"
              strokeColor="#5227FF"
              minFontSize={36}
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
            <TextPressure
              text="   Innovate   "
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#000000"
              strokeColor="#5227FF"
              minFontSize={36}
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
        </div>
        
        {/* Desktop */}
        <div
             className="hidden sm:block pt-15"
             style={{
               position: 'relative',
               height: 'fit-content',
               width: '100%',
               alignContent: 'center',
               placeSelf: 'center',
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
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
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
              // colorCycle={colorCycle}
              // colorCycleDuration={2000}
            />
        </div>
      </div>

      {/* <div className="img-section flex flex-col w-full my-60">
      <img src="assets/img/BKAIG.jpg" alt="gp" className="size-full"/>
      </div> */}

      <div className="second-section container mx-auto h-fit my-25 md:mt-0 lg:mt-50 lg:mb-70">
        <div className="grid lg:grid-cols-12 h-fit">
          <div className="lg:col-span-6 content-center px-auto mx-auto place-self-start lg:place-self-center">
          <p className="text-sm lg:text-lg content-center place-self-center px-auto mt-10 ml-[30px] mr-[20px] mb-7">A developer focuses on front-end side, crafting web experiences, geeking out over current best practices and technologies for developing websites.</p>
            < BlurText 
             text="Aria Aji"
             delay={300}
             animateBy="letters"
             direction="top"
             className="text-[clamp(30px,7vw,100px)] font-bold leading-none place-self-center text-[#CA6B48] mt-5 mx-10 px-16"
          />
          <div className="text-center mt-4 mb-5 text-[#EA6B48] h-20">
            <FallingText
              text={`Front-end Developer`}
              highlightWords={[]}
              // highlightClass="highlighted"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.1}
              fontSize="clamp(20px,4vw,32px)"
              mouseConstraintStiffness={0.9}
            />           
          </div>
            {/* <h2 className="text-xl lg:text-5xl py-8 place-self-center text-[#EA6B48]">Website Developer</h2> */}
            <p className="text-sm lg:text-lg content-center place-self-center px-auto ml-[30px] mr-[20px] mb-12">Enhance skills through hands-on projects & professional experiences. Combining creativity to build engaging experiences.</p>
            <Link 
              href="/contact"
              className="button border-black dark:border-black p-3 rounded-full content-center place-self-center w-[130px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] mx-[90px] sm:mx-[225px] md:mx-[280px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]"
            >
              Let's Collaborate
            </Link>
          </div>
          <div className="lg:col-span-6 content-center place-self-center order-first lg:order-last pl-0 lg:pl-[100px]">
            <PixelTransition 
              firstContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#09090b"
                  }}
                >
                  <p style={{ fontWeight: 900, fontSize: "1rem", color: "#ffffff" }}>
                    <img src="assets/img/peacock.png" alt="peacock" className="size-30 md:size-40 lg:size-60"/>
                  </p>
                </div>
              }
              secondContent={
                 <img
                  src="assets/img/ariaaji.jpg"
                  alt="ariaaji"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              gridSize={27}
              pixelColor='#d2d2d4'
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
          </div>
        </div>
      </div>

      <div className="third-section container flex mx-auto h-fit w-fit content-center place-self-center landscape:mt-80 landscape:mb-120 sm:landscape:my-0 lg:mt-60">
       < WorkCards />
      </div>
    </main>
  );
}