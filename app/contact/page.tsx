import ContactSection from "../components/Contact/contact"

export default function About() {
  return (
  // <main className="min-h-screen overflow-x-hidden w-full">
  //   <div className="container mx-auto flex min-h-screen flex-col pt-[30px] pb-5 lg:py-0 xl:max-w-[1290px]">
  //     <div className="relative content-center place-self-center w-fit">
  //       <h1>Hero Image</h1>
  //       </div>
  //     <div className="relative content-center place-self-center w-fit">
  //       <h1>About Page</h1>
  //     </div>
  //   </div>
  //   <div className="second-section container mx-auto h-screen">
  //     <div className="grid lg:grid-cols-12 h-screen">
  //     </div>
  //   </div>
  // </main> 
    <main >

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px]">

      <div className="col-span-1 sm:col-span-2  mt-[30px] flex w-full flex-col space-y-2.5 leading-[130%] font-normal">
        <div>Hero Image</div>
      </div>

      <div className="flex col-span-1 h-full items-center">
      <p className="align-middle w-full leading-[130%] lg:leading-[130%] text-2xl md:text-4xl lg:text-5xl xl:max-w-[971px] 2xl:max-w-[1290px]">
          Lorem, ipsum dolor. <span className="font-bold">Lorem ipsum dolor sit amet.</span> Lorem, ipsum. <span className="font-bold">Lorem, ipsum.</span> Lorem, ipsum. <span className="font-bold">Lorem, ipsum..</span>
        </p>
      </div>

       <div className="flex col-span-1 h-full lg:px-10 justify-center align-middle">
        <div className="font-bold text-9xl">About</div>
      </div>
      </div>


      <div className="container flex mx-auto my-20 w-fit content-center place-self-center">
       < ContactSection />
      </div>
    </main>

  )
}