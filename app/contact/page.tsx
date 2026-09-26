import ContactSection from "../components/Contact/contact"

export default function About() {
  return (
    <main>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px]">

        <div className="flex col-span-1 h-full items-start sm:items-center">
          <p className="align-middle w-full leading-[130%] lg:leading-[130%] text-2xl md:text-3xl lg:text-4xl xl:max-w-[971px] 2xl:max-w-[1290px]">
              <span className="font-black">Building thoughtful, interactive, and accessible web experiences.</span>  
              Turn static ideas into fluid interfaces. 
              <span className="font-bold">Tell me what you’re working on.</span>.
          </p>
        </div>

        <div className="flex col-span-1 h-full lg:px-10 justify-center sm:order-last">
          {/* <div className="font-bold text-5xl md:text-4xl lg:text-7xl xl:text-7xl 2xl:text-9xl content-center">Contact</div> */}
          < ContactSection />
        </div>
      </div>


      {/* <div className="container flex mx-auto my-20 w-fit content-center place-self-center">
        < ContactSection />
      </div> */}
    </main>

  )
}