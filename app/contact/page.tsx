import ContactSection from "../components/Contact/contact"

export default function Contact() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[100px] px-[20px] md:pt[49px] lg:pt-[100px] lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] lg:gap-x-[30px] md:h-screen">

    <div className="flex col-span-1 h-full lg:px-10 justify-center">
      <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[150%] mb-8 content-center items-center"><span className="font-black">Building thoughtful, interactive, and accessible web experiences.</span>  
              Turn static ideas into fluid interfaces. 
              <span className="font-bold">Tell me what you’re working on.</span>.</div>
    </div>

    <div className="col-span-1 h-full content-center">
      < ContactSection />
    </div>

  </main> 
  )
}