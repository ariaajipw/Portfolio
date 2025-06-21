import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from './components/TextPressure/TextPressure';
import WorkCards from "./components/WorkCard/workcard";

export default function Home() {
  
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="hero-section container flex mx-auto h-screen w-fit content-center place-self-center">
        {/* <div className="lg:hidden">animasi di mobile</div> */}
        <div className="relative h-500px content-center place-self-center w-fit">
             <TextPressure
          text="_Combine_Ideas,_"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#00000"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-200 md:minFontSize-300 lg:minFontSize-400 text-#000000'
        />
         <TextPressure
          text="_Craft_&_Innovate._"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="000000"
          strokeColor="#ff0000"
          // minFontSize={400}
        />
        </div>
      </div>

      <div className="second-section container mx-auto h-screen">
        <div className="grid lg:grid-cols-12 h-screen">
          <div className="lg:col-span-6 content-center px-auto mx-auto place-self-start lg:place-self-center">
          <p className="text-sm lg:text-lg content-center place-self-center px-auto mx-[20px] mb-5">A developer focuses on front-end side, crafting web experiences, specializing in React, Next.js, Tailwind CSS, & Shopify.</p>
            < BlurText 
             text="Aria Aji"
             delay={70}
             animateBy="letters"
             direction="bottom"
             className="text-3xl lg:text-[100px] font-bold leading-none place-self-center"
          />
            <h2 className="text-xl lg:text-5xl py-8 place-self-center">Website Developer</h2>
            <p className="text-sm lg:text-lg content-center place-self-center px-auto mx-[20px] mb-5 lg:mb-12">Enhance skills through hands-on projects & professional experiences. Combining creativity to build engaging experiences.</p>
            <a href="/contact" className="button border-black dark:border-black p-2 rounded-full content-center place-self-center w-[130px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] mx-[90px] sm:mx-[225px] md:mx-[280px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]" type="button" >Let's Collaborate</a>
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
                    <img src="assets/img/peacock.png" alt="peacock" className="size-50 lg:size-90"/>
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

      <div className="third-section container flex mx-auto h-screen w-fit content-center place-self-center">
       < WorkCards />
      </div>
      {/* <div className="fourth-section container flex mx-auto h-screen w-fit content-center place-self-center">
       < ContactSection />
      </div> */}
    </main>
  );
}
