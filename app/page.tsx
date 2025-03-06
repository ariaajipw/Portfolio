import PixelTransition from "./components/PixelTransition/PixelTransition";
import BlurText from "./components/BlurText/BlurText";
import TextPressure from './components/TextPressure/TextPressure';


export default function Home() {
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="hero-section container flex mx-auto h-screen">
        <div className="relative h-500px content-center place-self-center">
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
          minFontSize={400}
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
          minFontSize={400}
        />
        </div>
      </div>
      <div className="second-section container mx-auto h-screen">
        <div className="grid grid-cols-12 h-screen">
          <div className="col-span-6 content-center">
            < BlurText 
             text="Aria Aji"
             delay={70}
             animateBy="letters"
             direction="bottom"
             className="text-[75px] font-bold leading-none place-self-center"
          />
            <h2 className="text-4xl py-10 place-self-center">Website Developer</h2>
            <p className="text-large place-self-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat incidunt accusamus voluptatem ullam qui ducimus officia perspiciatis, rem repellat aperiam?</p>
          </div>
          <div className="col-span-6 content-center place-self-center">
            <PixelTransition 
              firstContent={
                // <img
                //   src="assets/img/ariaaji.jpg"
                //   alt="ariaaji"
                //   style={{ width: "100%", height: "100%", objectFit: "cover" }}
                // />
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
                // <div
                //   style={{
                //     width: "100%",
                //     height: "100%",
                //     display: "grid",
                //     placeItems: "center",
                //     backgroundColor: "#111"
                //   }}
                // >
                //   <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Aria Aji</p>
                // </div>
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
    </div>
  );
}
