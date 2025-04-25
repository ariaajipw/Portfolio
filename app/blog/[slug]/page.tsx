import { notFound } from 'next/navigation';
import { posts } from '../../posts/data';
import MarkdownContent from '@/app/components/MarkdownContent/MarkdownContent';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[30px] h-screen">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6 dark:text-white">{post.date}</p>
      < MarkdownContent content={post.content} />
      
      <a 
        href="/blog" 
        className="mt-8 inline-block text-blue-600 hover:underline"
      >
        ← Back ke Blog
      </a>
    </div>
  );
}