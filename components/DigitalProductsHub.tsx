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
          
          {/* Hero Header */}
          <div className="bg-black text-white px-8 py-20 md:py-32 relative overflow-hidden" id="top">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 backdrop-blur-md">
                   V3.4 Quantum Intel
                </div>
                <div className="h-px w-12 bg-white/20"></div>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                The Future of <br/> <span className="text-gray-500">Digital Assets.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-light">
                Nexus provides deep technical analysis and strategic insights into the software tools and digital frameworks powering the next decade of internet business.
              </p>

              {/* Custom Analysis Input */}
              <div className="flex flex-col md:flex-row gap-2 max-w-2xl bg-white/5 p-3 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex-1 flex items-center gap-4 px-4">
                  <Icon name="search" className="w-6 h-6 text-gray-500" />
                  <input 
                    type="text" 
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCustomAnalysis()}
                    placeholder="Enter tool name for AI decomposition..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 font-medium text-lg"
                  />
                </div>
                <button 
                  onClick={handleCustomAnalysis}
                  className="px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-2 uppercase text-xs tracking-widest"
                >
                  <Icon name="zap" className="w-4 h-4" />
                  Analyze
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-5 shadow-sm">
             <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 overflow-x-auto no-scrollbar">
                   <button onClick={() => scrollToSection('top')} className="hover:text-black transition-colors whitespace-nowrap">Search</button>
                   <button onClick={() => scrollToSection('insights')} className="hover:text-black transition-colors whitespace-nowrap text-black border-b-2 border-black pb-1">Insights</button>
                   <button onClick={() => scrollToSection('collections')} className="hover:text-black transition-colors whitespace-nowrap">Stacks</button>
                   <button onClick={() => scrollToSection('categories')} className="hover:text-black transition-colors whitespace-nowrap">Directory</button>
                </div>
                <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-gray-400">
                   <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> 48K Nodes Indexed</span>
                </div>
             </div>
          </div>

          {/* Professional Articles Section (Insights) */}
          <section className="py-24 px-8 border-b border-gray-100" id="insights">
             <div className="max-w-6xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                   <div className="max-w-2xl">
                      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Digital Product Intelligence</h2>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Expert Market Analysis</h3>
                      <p className="text-gray-500 mt-4 text-lg">Detailed editorial content exploring the shift in digital manufacturing and consumption.</p>
                   </div>
                   <button onClick={() => scrollToSection('categories')} className="flex items-center gap-2 text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 transition-colors">
                      Browse Index <Icon name="arrow-right" className="w-4 h-4" />
                   </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Article 1 */}
                   <div className="group cursor-pointer" onClick={() => handleProductClick("The Solopreneur Stack", "Analysis of minimal-overhead high-output tooling for single founders.")}>
                      <div className="aspect-[16/10] bg-gray-900 rounded-2xl mb-6 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-800 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                         <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-2">Strategy</span>
                            <h4 className="text-2xl font-black text-white leading-tight">The Rise of the <br/> Solopreneur Stack.</h4>
                         </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">How lean founders are using AI to replace entire departments and scale to $1M ARR with zero employees.</p>
                      <div className="flex items-center gap-3 text-xs font-bold">
                         <span className="text-black">Read More</span>
                         <div className="w-8 h-px bg-black group-hover:w-12 transition-all"></div>
                      </div>
                   </div>

                   {/* Article 2 */}
                   <div className="group cursor-pointer" onClick={() => handleProductClick("The Economics of SaaS", "Deep dive into recurring revenue models and retention metrics.")}>
                      <div className="aspect-[16/10] bg-gray-900 rounded-2xl mb-6 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-800 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                         <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-2">Economics</span>
                            <h4 className="text-2xl font-black text-white leading-tight">The Monetization <br/> Matrix.</h4>
                         </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">A comparative study of transactional vs. subscription models in the modern creator economy.</p>
                      <div className="flex items-center gap-3 text-xs font-bold">
                         <span className="text-black">Read More</span>
                         <div className="w-8 h-px bg-black group-hover:w-12 transition-all"></div>
                      </div>
                   </div>

                   {/* Article 3 */}
                   <div className="group cursor-pointer" onClick={() => handleProductClick("AI-First Design", "The shift from human-centric to machine-leveraged interface design.")}>
                      <div className="aspect-[16/10] bg-gray-900 rounded-2xl mb-6 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-800 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                         <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-2">Design</span>
                            <h4 className="text-2xl font-black text-white leading-tight">AI-First Product <br/> Design.</h4>
                         </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">Moving beyond static interfaces to dynamic, intent-aware experiences that adapt in real-time.</p>
                      <div className="flex items-center gap-3 text-xs font-bold">
                         <span className="text-black">Read More</span>
                         <div className="w-8 h-px bg-black group-hover:w-12 transition-all"></div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Collections Section */}
          <div className="max-w-6xl mx-auto px-8 py-24" id="collections">
            <div className="mb-12">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Curated Collections</h3>
               <h2 className="text-3xl font-black tracking-tighter">Strategic Stacks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {COLLECTIONS.map((col, idx) => (
                 <div key={idx} className="p-8 border border-gray-100 rounded-3xl hover:shadow-2xl transition-all bg-white hover:border-black/10 cursor-pointer group" onClick={() => handleProductClick(col.title, col.description)}>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                       <Icon name="zap" className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 group-hover:underline">{col.title}</h4>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{col.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {col.tools.map((t, i) => (
                         <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-gray-400">{t}</span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Directory Section */}
          <div className="bg-gray-50 py-24 px-8" id="categories">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16 border-b border-gray-200 pb-8 flex justify-between items-end">
                <div className="max-w-xl">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">The Global Index</h3>
                  <h2 className="text-4xl font-black tracking-tighter">Comprehensive Directory</h2>
                </div>
                <div className="hidden md:block text-xs font-bold text-gray-400">
                  Updated Hourly by Nexus Agents
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {PRODUCT_CATEGORIES.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-black uppercase tracking-widest border-l-4 border-black pl-4 mb-8">
                       {category.name}
                    </h3>
                    <div className="space-y-1">
                      {category.items.map((item, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleProductClick(item.name, item.desc)}
                          className="group flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-lg cursor-pointer transition-all"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-sm group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{item.desc}</p>
                          </div>
                          <Icon name="arrow-right" className="w-4 h-4 text-gray-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};