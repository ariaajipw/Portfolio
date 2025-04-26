import { notFound } from 'next/navigation';
import { posts } from '../../posts/data';
import MarkdownContent from '@/app/components/MarkdownContent/MarkdownContent';
import Link from 'next/link';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Solusi: Gunakan type langsung tanpa interface
export default function Page({
  params
}: {
  params: { slug: string }
}) {
  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    notFound();
  }


  return (
    <article className="max-w-4xl mx-auto p-4 mt-[30px] h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 dark:text-white">{post.title}</h1>
        <p className="text-gray-700 mb-2 dark:text-gray-300">
          by{' '}
          <Link 
            href="/" 
            className="hover:underline hover:font-bold hover:text-[#FA6B48] transition-colors"
          >
            {post.author}
          </Link>
        </p>
        <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
          {post.date}
        </time>
      </header>

      <section className="prose dark:prose-invert max-w-none">
        <MarkdownContent content={post.content} />
      </section>

      <footer className="mt-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[#FA6B48] hover:underline gap-1 transition-colors"
        >
          <span>←</span> Back to Blog
        </Link>
      </footer>
    </article>
  );
}