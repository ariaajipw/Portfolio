import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from './components/TextPressure/TextPressure';


export default function Home() {
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="hero-section container flex mx-auto h-screen w-fit content-center place-self-center">
        <div className="relative h-500px content-center place-self-center w-fit">
             <TextPressure
          text="_Combine_Ideas,_"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#ffffff"
          strokeColor="#ff0000"
          // minFontSize={400}
          className='sm:minFontSize-200 md:minFontSize-300 lg:minFontSize-400'
        />
         <TextPressure
          text="_Craft_&_Innovate._"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#ffffff"
          strokeColor="#ff0000"
          // minFontSize={400}
        />
        </div>
      </div>
      <div className="second-section container mx-auto h-screen">
        <div className="grid lg:grid-cols-12 h-screen">
          <div className="lg:col-span-6 content-center px-auto mx-auto place-self-center">
            < BlurText 
             text="Aria Aji"
             delay={70}
             animateBy="letters"
             direction="bottom"
             className="text-4xl lg:text-[100px] font-bold leading-none place-self-center"
          />
            <h2 className="text-2xl lg:text-5xl py-10 place-self-center">Website Developer</h2>
            <p className="text-small lg:text-large content-center place-self-center px-auto mx-auto mb-9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat incidunt accusamus voluptatem ullam qui ducimus officia perspiciatis, rem repellat aperiam?</p>
            <button className="button border p-2 rounded-full content-center place-self-center text-center bg-white hover:bg-slate-500 text-black hover:text-white" type="button" >Contact Me</button>
          </div>
          <div className="lg:col-span-6 content-center place-self-center order-first lg:order-last">
            <PixelTransition 
              firstContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#111"
                  }}
                >
                  <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Hover Me...</p>
                </div>
              }
              secondContent={
                 <img
                  src="assets/img/ariaaji.jpg"
                  alt="ariaaji"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              gridSize={12}
              pixelColor='#ffffff'
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
          </div>
        </div>
      </div>
      <div className="third-section container flex mx-auto h-screen w-fit content-center place-self-center">
       <div>Works</div>
      </div>
      <div className="fourth-section container flex mx-auto h-screen w-fit content-center place-self-center">
       <div></div>
      </div>
    </div>
  );
}
