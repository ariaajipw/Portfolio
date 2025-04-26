export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    author: "Jane Doe",
    date: "2023-05-15",
    content: "# Welcome to Next.js\n\nThis is your first post content..."
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    author: "John Smith",
    date: "2023-06-20",
    content: "# TypeScript Tips\n\nHere are some useful TypeScript patterns..."
  }
];