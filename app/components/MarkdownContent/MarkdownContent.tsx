'use client';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

export default function MarkdownContent({ content }: { content: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Versi paling kompatibel
    const parseMarkdown = async () => {
      const parsed = await marked.parse(content);
      setHtml(parsed);
    };
    
    parseMarkdown();
  }, [content]);

  return (
    <div 
      className="prose max-w-none" 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}