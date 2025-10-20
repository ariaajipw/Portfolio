import Link from 'next/link';
import { posts } from '../posts/data';

export default function BlogPage() {
  return (
    // <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px] h-screen">
    // <div className="max-w-3xl mx-auto p-4">
    //   <h1 className="font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[180px] mb-8">Blog</h1>
      
    //   <div className="space-y-9 mt-[100px]">
    //     {posts.map((post) => (
    //       <Link 
    //       key={post.id} 
    //       href={`/blog/${post.id}`}
    //       className="block p-2 border-4 border-gray-400 rounded-lg hover:bg-orange-800 transition">
    //         <div className="p-4 border-2 border-gray-600 rounded-lg hover:bg-[#FA6B48]">
    //           <h2 className="text-xl font-semibold">{post.title}</h2>
    //           <p className="text-gray-500 text-sm">{post.date}</p>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    // </main>
    // test
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] lg:gap-x-[30px] h-screen">

      <div className="flex col-span-1 h-full lg:px-10 justify-center">
        <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[150%] mb-8 content-center items-center">This is a platform for living story of ideas and experiences, & space for thoughtful reflection.</div>
      </div>

      <div className="col-span-1 h-full content-center overflow-hidden">
        <div className="h-full overflow-y-auto space-y-8 pr-2 scroll-custom content-start sm:content-center">
            {posts.map((post) => (
              <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="block p-2 border-4 border-gray-600 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                <div className="p-4 border-2 border-gray-400 rounded-lg hover:bg-[#FA6B48]">
                  <h2 className=" text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-500 text-sm">{post.date}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

    </main> 
  );
}

{/* <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px] h-screen">

<div className="flex col-span-1 h-full lg:px-10 justify-center align-middle">
  <h1 className="font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[180px] mb-8">Blog</h1>
</div>

<div className="flex col-span-1 h-full items-center">
  <<div className="space-y-9 mt-[100px]">
        {posts.map((post) => (
          <Link 
          key={post.id} 
          href={`/blog/${post.id}`}
          className="block p-2 border-4 border-gray-400 rounded-lg hover:bg-orange-800 transition">
            <div className="p-4 border-2 border-gray-600 rounded-lg hover:bg-[#FA6B48]">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
</div>

</main>  */}