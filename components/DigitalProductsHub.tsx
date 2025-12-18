import React, { useState } from 'react';
import { Icon } from './Icon';
import { PRODUCT_CATEGORIES, FEATURED_LINKS, COLLECTIONS } from '../constants';
import { generateArticleForResource } from '../services/geminiService';
import { ArticleState } from '../types';
import { ArticleViewer } from './ArticleViewer';

export const DigitalProductsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [customQuery, setCustomQuery] = useState('');
  const [articleState, setArticleState] = useState<ArticleState>({ title: '', content: '', isLoading: false });

  const handleProductClick = async (productName: string, productDesc: string) => {
    setArticleState({ title: `Analysis: ${productName}`, content: '', isLoading: true });
    setActiveTab('read');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const content = await generateArticleForResource(productName, productDesc);
    setArticleState({ title: `Deep Dive: ${productName}`, content, isLoading: false });
  };

  const handleCustomAnalysis = async () => {
    if (!customQuery.trim()) return;
    setArticleState({ title: `Analysis: ${customQuery}`, content: '', isLoading: true });
    setActiveTab('read');
    const content = await generateArticleForResource(customQuery, "A digital product or technology topic requested by user.");
    setArticleState({ title: `Custom Analysis: ${customQuery}`, content, isLoading: false });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Article Viewer Overlay Mode */}
      {activeTab === 'read' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-8 pt-8">
            <button 
              onClick={() => setActiveTab('browse')}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-4 font-medium"
            >
              <Icon name="arrow-right" className="w-4 h-4 rotate-180" />
              Back to Hub
            </button>
          </div>
          <ArticleViewer article={articleState} />
        </div>
      )}

      {/* Main Browse Mode */}
      {activeTab === 'browse' && (
        <div className="animate-in fade-in duration-500">
          
          {/* Header */}
          <div className="bg-black text-white px-8 py-16 md:py-24 relative overflow-hidden" id="top">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="flex items-center gap-2 mb-4 text-gray-400 font-bold tracking-widest uppercase text-sm">
                <Icon name="cpu" className="w-4 h-4" />
                <span>Product Intelligence Unit</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                Master the Digital <br/> Product Landscape.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
                Detailed breakdowns, reviews, and strategic analysis of the tools shaping the future. 
                Powered by our autonomous research agents.
              </p>

              {/* Custom Analysis Input */}
              <div className="flex flex-col md:flex-row gap-2 max-w-xl bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Icon name="search" className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomAnalysis()}
                    placeholder="Analyze any tool (e.g. 'Webflow', 'Docker')..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 font-medium"
                  />
                </div>
                <button 
                  onClick={handleCustomAnalysis}
                  className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Icon name="zap" className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Hub Menu - Sticky Navigation */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200 px-8 py-4 overflow-x-auto no-scrollbar shadow-sm">
             <div className="max-w-6xl mx-auto flex gap-8 min-w-max text-sm font-bold uppercase tracking-wider text-gray-500">
                <button onClick={() => scrollToSection('top')} className="hover:text-black transition-colors">Search</button>
                <button onClick={() => scrollToSection('featured-links')} className="hover:text-black transition-colors">Network</button>
                <button onClick={() => scrollToSection('collections')} className="hover:text-black transition-colors">Collections</button>
                <button onClick={() => scrollToSection('categories')} className="hover:text-black transition-colors">Directory</button>
                <button onClick={() => scrollToSection('why-it-matters')} className="hover:text-black transition-colors">Insights</button>
             </div>
          </div>

          {/* Featured Resources Links */}
          <div className="bg-gray-50 border-b border-gray-200 py-6 px-8 overflow-x-auto" id="featured-links">
            <div className="max-w-6xl mx-auto flex items-center gap-8 min-w-max">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Featured Network:</span>
              {FEATURED_LINKS.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:border-blue-200">
                  <Icon name="globe" className="w-3 h-3" />
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Collections Section */}
          <div className="max-w-6xl mx-auto px-8 py-16" id="collections">
            <div className="mb-8">
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Curated Collections</h3>
               <p className="text-gray-500">Hand-picked stacks for specific use-cases.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {COLLECTIONS.map((col, idx) => (
                 <div key={idx} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all bg-white hover:border-black cursor-pointer group" onClick={() => handleCustomAnalysis()}>
                    <h4 className="font-bold text-lg mb-2 group-hover:underline">{col.title}</h4>
                    <p className="text-sm text-gray-500 mb-4 h-10">{col.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {col.tools.map((t, i) => (
                         <span key={i} className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{t}</span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="max-w-6xl mx-auto px-8 py-8" id="categories">
             <div className="mb-12 border-b border-black pb-4">
               <h3 className="text-3xl font-black uppercase tracking-tighter">Comprehensive Directory</h3>
               <p className="text-gray-500 mt-2">Browse the complete index of tools monitored by our agents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {PRODUCT_CATEGORIES.map((category, idx) => (
                <div key={idx} className="scroll-mt-24">
                  <div className="flex items-center justify-between mb-8 pb-2 border-b border-gray-100">
                    <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                       <div className="w-2 h-2 bg-black rounded-full"></div>
                       {category.name}
                    </h3>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{category.items.length} Tools</span>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => handleProductClick(item.name, item.desc)}
                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-200"
                      >
                        <div className="w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-colors">
                          <span className="font-bold text-sm">{item.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                             <h4 className="font-bold text-lg group-hover:underline decoration-2 underline-offset-2">{item.name}</h4>
                             <Icon name="arrow-right" className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed mt-1">{item.desc}</p>
                        </div>
                        <div className="hidden md:block text-xs font-bold text-gray-300 group-hover:text-black uppercase tracking-widest self-center">
                          Analyze
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends / Why it matters */}
          <div className="bg-gray-900 text-white py-24 px-8 mt-16" id="why-it-matters">
             <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-6">Why Product Intelligence Matters</h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                   In the age of AI, the tool stack you choose defines your velocity. 
                   Our autonomous agents continuously scan the market to bring you the latest insights on 
                   software that compounds your leverage.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                   <Icon name="search" className="w-8 h-8 mb-4 text-blue-400" />
                   <h3 className="font-bold text-xl mb-2">Deep Discovery</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">We go beyond the landing page. Our articles dissect features, pricing models, and hidden capabilities.</p>
                </div>
                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                   <Icon name="bar-chart" className="w-8 h-8 mb-4 text-green-400" />
                   <h3 className="font-bold text-xl mb-2">Market Trends</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">Understand where the industry is moving with aggregated data from Indie Hackers and Product Hunt.</p>
                </div>
                <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                   <Icon name="brain" className="w-8 h-8 mb-4 text-purple-400" />
                   <h3 className="font-bold text-xl mb-2">AI-Generated</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">Content is generated on-the-fly by our Gemini-powered models, ensuring you get the most up-to-date context.</p>
                </div>
             </div>
          </div>

        </div>
      )}
    </div>
  );
};