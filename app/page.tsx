import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from './components/TextPressure/TextPressure';
import WorkCards from "./components/WorkCard/workcard";
import FallingText from './components/FallingText/FallingText';

export default function Home() {
  
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="hero-section container flex mx-auto h-screen w-fit content-center place-self-center sm:landscape:mt-10">
        {/* mobile for vertical */}
        <div className="relative h-500px content-center place-self-center w-fit sm:hidden">
             <TextPressure
          text="Combine"
          flex={false}
          scale={false}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#00000"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-300 md:minFontSize-400 lg:minFontSize-500 text-#000000'
        />
         <TextPressure
          text="Ideas,"
          flex={false}
          scale={false}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="000000"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-200 md:minFontSize-300 lg:minFontSize-400 text-#000000'
        />
           <TextPressure
          text="Craft,"
          flex={false}
          scale={false}
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
          text="__&__"
          flex={false}
          scale={false}
          alpha={false}
          stroke={false}
          width={false}
          weight={true}
          italic={false}
          textColor="#00000"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-200 md:minFontSize-300 lg:minFontSize-400 text-#000000'
        />
         <TextPressure
          text="Innovate."
          flex={false}
          scale={false}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="000000"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-200 md:minFontSize-300 lg:minFontSize-400 text-#000000'
        />
        </div>
        
        {/* Desktop */}
        <div className="relative h-500px content-center place-self-center w-fit hidden sm:block">
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

      <div className="second-section container mx-auto h-screen landscape:mt-20">
        <div className="grid lg:grid-cols-12 h-screen">
          <div className="lg:col-span-6 content-center px-auto mx-auto place-self-start lg:place-self-center landscape:mt-20">
          <p className="text-sm lg:text-lg content-center place-self-center px-auto ml-[30px] mr-[20px] mb-7">A developer focuses on front-end side, crafting web experiences, specializing in React, Next.js, Tailwind CSS, & Shopify.</p>
            < BlurText 
             text="Aria Aji"
             delay={300}
             animateBy="letters"
             direction="top"
             className="text-[clamp(30px,7vw,100px)] font-bold leading-none place-self-center text-[#CA6B48] mt-5"
          />
          <div className="text-center mt-4 mb-5 text-[#EA6B48] h-30">
            <FallingText
              text={`Website Developer`}
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
                    <img src="assets/img/peacock.png" alt="peacock" className="size-40 lg:size-90"/>
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

      <div className="third-section container flex mx-auto h-screen w-fit content-center place-self-center landscape:mt-80 landscape:mb-120 sm:landscape:my-0">
       < WorkCards />
      </div>
      {/* <div className="fourth-section container flex mx-auto h-screen w-fit content-center place-self-center">
       < ContactSection />
      </div> */}
    </main>
  );
}
