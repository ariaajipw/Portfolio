import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { posts } from '../../posts/data';
import MarkdownContent from '@/app/components/MarkdownContent/MarkdownContent';

interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export async function generateStaticParams() {
  return posts.map((post: Post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({
  params,
}: any): Promise<Metadata> {
  const post = posts.find((post: Post) => post.id === params.slug);

  return {
    title: post?.title || 'Post Not Found',
  };
}

export default function BlogPostPage({ params }: any) {
  const post = posts.find(
    (post: Post) => post.id === params.slug
  );

  if (!post) {
    notFound();
    return null;
  }

  return (
    <article className="site-container max-w-4xl mx-auto px-4 py-12 my-[50px]">
      {/* Article Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-black/70 dark:text-gray-300">
            by
          </span>

          <Link
            href="/"
            className="hover:underline hover:font-bold hover:text-[#FA6B48] transition-colors"
          >
            {post.author}
          </Link>

          <span className="text-black/40 dark:text-gray-500">
            •
          </span>

          <time
            dateTime={post.date}
            className="text-black/60 dark:text-gray-400"
          >
            {post.date}
          </time>
        </div>
      </header>

      {/* Article Content */}
      <section className="prose dark:prose-invert max-w-none">
        <MarkdownContent content={post.content} />
      </section>

      {/* Article Footer */}
      <footer className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#FA6B48] hover:underline gap-1 transition-colors"
        >
          <span>←</span>
          Back to Blog
        </Link>
      </footer>
    </article>
  );
}