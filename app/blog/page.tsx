import Link from 'next/link';
import { posts } from '../posts/data';

export default function BlogPage() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px]">
    <div className="max-w-3xl mx-auto p-4 h-screen">
      <h1 className="text-9xl font-bold mb-8">Blog</h1>
      
      <div className="space-y-9 mt-[100px]">
        {posts.map((post) => (
          <Link 
          key={post.id} 
          href={`/blog/${post.id}`}
          className="block p-4 border-4 border-gray-400 rounded-lg hover:bg-gray-800 transition">
            <div className="p-4 border-2 border-gray-800 rounded-lg hover:bg-gray-400">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </main> 
  );
}
{/* <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start py-[50px] px-[20px] md:pt[49px] lg:pt-[100px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:pt-[120px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px]">

<div className="col-span-1 sm:col-span-2  mt-[30px] flex w-full flex-col space-y-2.5 leading-[130%] font-normal">
  <div>Hero Image</div>
</div>

<div className="flex col-span-1 h-full items-center">
  <p className="align-middle w-full leading-[130%] lg:leading-[130%] text-2xl md:text-4xl lg:text-5xl xl:max-w-[971px] 2xl:max-w-[1290px]">
    Lorem, ipsum dolor. <span className="font-bold">Lorem ipsum dolor sit amet.</span> Lorem, ipsum. <span className="font-bold">Lorem, ipsum.</span> Lorem, ipsum. <span className="font-bold">Lorem, ipsum..</span>
  </p>
</div>

<div className="flex col-span-1 h-full lg:px-10 justify-center">
  <div>Service</div>
</div>



</main> */}