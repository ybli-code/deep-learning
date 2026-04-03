import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocInfo {
  id: string;
  title: string;
  description: string;
}

function Docs() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError('');
    
    fetch(`/docs/${decodeURIComponent(id)}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('文档未找到');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const getTitle = () => {
    if (!id) return '';
    const decodedId = decodeURIComponent(id);
    const titles: Record<string, string> = {
      '1-TensorFlow 教程': 'TensorFlow 教程',
      '2-测试页面': '测试页面',
      'TensorFlow_教程_菜鸟教程_20260320173744': 'TensorFlow 教程 (菜鸟教程)'
    };
    return titles[decodedId] || decodedId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-400">{error}</h1>
          <Link to="/" className="text-cyan-400 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-orange-400" />
          <h1 className="text-3xl font-bold text-white">{getTitle()}</h1>
        </div>

        <article className="prose prose-invert prose-neutral max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 border-b border-neutral-800 pb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold text-cyan-400 mb-2 mt-4">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="text-neutral-300 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-neutral-300 space-y-2 mb-4 ml-4">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-neutral-300">{children}</li>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-neutral-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-neutral-900 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-neutral-800">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-neutral-900 p-4 rounded-lg overflow-x-auto mb-4 border border-neutral-800">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-neutral-400 my-4">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="border-neutral-800 my-8" />
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="rounded-lg max-w-full h-auto my-4" />
              )
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}

export default Docs;
