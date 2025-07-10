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
    title: "Getting Started Crafting a Website",
    author: "Aria Aji",
    date: "2025-07-10",
    content: "# Embrace the Journey \n\n The path to becoming a web developer is equal parts exciting and overwhelming, especially at the beginning. You’ll face moments of frustration, but every challenge is a chance to grow your problem-solving muscles. Start by acknowledging that confusion is normal—even seasoned developers Google daily questions! What matters most is your curiosity and willingness to experiment. Welcome to a field where lifelong learning isn’t optional; it’s the core of the craft. \n\n Build Your Foundation \n\n Begin with the absolute basics: HTML for structure, CSS for styling, and JavaScript for interactivity. Free resources like freeCodeCamp, MDN Web Docs, or Codecademy offer structured, hands-on tutorials to solidify these skills. Don’t rush—master positioning elements with CSS before jumping into frameworks like React. Use tools like VS Code and Chrome DevTools early; they’ll become your daily companions. Consistency beats intensity: code for 30 minutes daily rather than 8 hours once a week. \n\n Create, Don’t Just Consume \n\n Tutorials are helpful, but real growth happens when you build projects you design. Start tiny: a personal bio page, a recipe card, or a calculator. When stuck, break problems into micro-tasks (e.g., “How do I center this button?” instead of “How do I build a full app?”). Share your work on GitHub—it’s your developer resume. Embrace ugly first drafts; refactoring is where magic happens.\n\n Join the Community \n\n Web development thrives on collaboration, so engage with others from day one. Ask questions on Stack Overflow, join Discord groups like The Odin Project, or follow devs on Twitter/X. Attend local meetups or online events; hearing others’ struggles normalizes your own. Remember, every developer’s journey looks different—avoid comparing your Chapter 1 to someone’s Chapter 20. Your unique voice and perspective belong here."
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    author: "John Smith",
    date: "2023-06-20",
    content: "# TypeScript Tips\n\nHere are some useful TypeScript patterns..."
  }
];