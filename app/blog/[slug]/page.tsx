import { notFound } from 'next/navigation';
import { posts } from '../../posts/data';
import MarkdownContent from '@/app/components/MarkdownContent/MarkdownContent';
import Link from 'next/link';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Type untuk params
type Props = {
  params: { slug: string };
};

export default function PostPage({ params }: Props) {
  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[30px] h-screen">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-6 dark:text-white">by <a href="/" className='hover:underline hover:font-bold hover:text-[#FA6B48]'>{post.author}</a></p>
      <p className="text-gray-500 mb-6 dark:text-white">{post.date}</p>
      < MarkdownContent content={post.content} />
      
      <Link href="/blog" className="mt-8 inline-block text-[#FA6B48] hover:underline">
        ← Back to Blog
      </Link>
    </div>
  );
}