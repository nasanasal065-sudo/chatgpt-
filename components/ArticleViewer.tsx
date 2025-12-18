import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArticleState } from '../types';

interface ArticleViewerProps {
  article: ArticleState;
  onClose?: () => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article }) => {
  if (!article.title && !article.isLoading) return null;

  return (
    <div className="w-full bg-gray-50 border-t border-b border-gray-200 py-12 px-4 md:px-8 lg:px-16 scroll-mt-20" id="article-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 font-semibold">
           <span>In-Depth Analysis</span>
           <div className="h-px w-8 bg-gray-300"></div>
        </div>

        {article.isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-40 bg-gray-200 rounded w-full mt-6"></div>
          </div>
        ) : (
          <div className="prose prose-lg prose-gray max-w-none text-black">
            <h2 className="text-3xl font-bold mb-6">{article.title}</h2>
            <div className="markdown-content">
              {/* Simple markdown rendering without a heavy library, handling paragraphs and headers manually if needed, 
                  but for simplicity using a div since text is robust. 
                  If real markdown parsing is needed, we usually add react-markdown, 
                  but here we will use a simple whitespace preserve since we can't easily add npm packages.
               */}
               <div className="whitespace-pre-wrap leading-relaxed">
                 {article.content}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};