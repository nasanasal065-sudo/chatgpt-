import React, { useState } from 'react';
import { RESOURCES, FEATURED_LINKS } from './constants';
import { ViewState, ArticleState, BlogPost } from './types';
import { Icon } from './components/Icon';
import { Marketplace } from './components/Marketplace';
import { AgentHub } from './components/AgentHub';
import { BlogFeed } from './components/BlogFeed';
import { ChatBot } from './components/ChatBot';
import { CreatePost } from './components/CreatePost';
import { ArticleViewer } from './components/ArticleViewer'; 
import { DigitalProductsHub } from './components/DigitalProductsHub';
import { generateArticleForResource } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [articleState, setArticleState] = useState<ArticleState>({ title: '', content: '', isLoading: false });
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Navigation Sidebar
  const SidebarItem = ({ view, icon, label }: { view: ViewState, icon: string, label: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        if (view === 'create') setEditingPost(null); // Reset editing state when clicking create from menu
      }}
      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 mb-1 ${
        currentView === view 
          ? 'bg-black text-white shadow-md' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-black'
      }`}
    >
      <Icon name={icon} className="w-5 h-5" />
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </button>
  );

  const handleResourceClick = async (e: React.MouseEvent, resource: typeof RESOURCES[0]) => {
    e.preventDefault();
    setArticleState({ title: resource.name, content: '', isLoading: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const content = await generateArticleForResource(resource.name, resource.description);
    setArticleState({ title: resource.name, content, isLoading: false });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      
      {/* Fixed Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col fixed left-0 top-0 z-40 hidden md:flex">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center gap-3 font-black text-xl tracking-tighter">
             <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded">N</div>
             NEXUS
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="mb-6">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Platform</div>
             <SidebarItem view="landing" icon="layout-grid" label="Home" />
             <SidebarItem view="product-hub" icon="cpu" label="Product Intel" />
             <SidebarItem view="marketplace" icon="shopping-bag" label="Marketplace" />
             <SidebarItem view="blog" icon="book-open" label="Blog Feed" />
          </div>
          
          <div className="mb-6">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Intelligence</div>
             <SidebarItem view="agents" icon="bot" label="Agent Hub" />
             <SidebarItem view="directory" icon="search" label="Resources" />
          </div>

          <div className="mb-6">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Create</div>
             <SidebarItem view="create" icon="pen-tool" label="Studio" />
          </div>

          {/* External Links embedded in sidebar */}
          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Network</div>
             {FEATURED_LINKS.map((link, idx) => (
               <a 
                 key={idx} 
                 href={link.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 p-3 text-gray-500 hover:text-black transition-colors rounded-lg hover:bg-gray-50"
               >
                 <Icon name="globe" className="w-4 h-4" />
                 <span className="text-sm font-medium truncate">{link.title}</span>
               </a>
             ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
           <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
              <div className="flex-1 overflow-hidden">
                 <div className="text-sm font-bold truncate">John Doe</div>
                 <div className="text-xs text-gray-500">Pro Member</div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto bg-white scroll-smooth relative">
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 p-4 flex justify-between items-center">
             <div className="font-black text-xl">NEXUS</div>
             <button onClick={() => setCurrentView('landing')} className="p-2 border border-gray-200 rounded">Menu</button>
        </div>

        {/* View Routing */}
        {currentView === 'landing' && (
           <div className="animate-in fade-in duration-500">
              {/* Hero */}
              <section className="px-6 py-24 md:py-32 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-6">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      AI SYSTEM ONLINE
                   </div>
                   <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                      The Operating System <br/> for <span className="text-gray-400">Digital Creators.</span>
                   </h1>
                   <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                      Deploy autonomous agents. Sell digital assets. Scale your knowledge base. 
                      All in one unified ecosystem powered by Quantum AI.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button onClick={() => setCurrentView('product-hub')} className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105">
                         Explore Product Intel
                      </button>
                      <button onClick={() => setCurrentView('marketplace')} className="px-8 py-4 border-2 border-gray-200 text-black font-bold rounded-full hover:border-black transition-all">
                         Browse Market
                      </button>
                   </div>
                </div>
              </section>

              {/* Stats / Teaser */}
              <section className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 divide-x divide-gray-100">
                  {[
                      { label: 'AI Agents Active', val: '4' },
                      { label: 'Articles Generated', val: '12.4k' },
                      { label: 'Products Listed', val: '850+' },
                      { label: 'Uptime', val: '99.9%' }
                  ].map((stat, i) => (
                      <div key={i} className="p-8 text-center bg-gray-50 hover:bg-white transition-colors">
                          <div className="text-3xl font-black mb-1">{stat.val}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                      </div>
                  ))}
              </section>
           </div>
        )}

        {currentView === 'product-hub' && <DigitalProductsHub />}
        {currentView === 'marketplace' && <div className="animate-in slide-in-from-right duration-300"><Marketplace /></div>}
        {currentView === 'agents' && <div className="animate-in slide-in-from-right duration-300"><AgentHub /></div>}
        {currentView === 'blog' && <div className="animate-in slide-in-from-right duration-300"><BlogFeed onEdit={handleEditPost} /></div>}
        {currentView === 'create' && <div className="animate-in slide-in-from-right duration-300"><CreatePost editingPost={editingPost} /></div>}
        
        {currentView === 'directory' && (
            <div className="p-8 animate-in slide-in-from-right duration-300">
                 <ArticleViewer article={articleState} onClose={() => setArticleState({title: '', content: '', isLoading: false})} />
                 
                 <div className="mb-8 border-b border-black pb-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Legacy Directory</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {RESOURCES.map((r) => (
                        <div key={r.id} onClick={(e) => handleResourceClick(e, r)} className="cursor-pointer block p-6 border border-gray-200 hover:border-black rounded-xl transition-all group bg-white relative">
                            <div className="flex justify-between items-start mb-4">
                                <Icon name={r.iconName} className="w-8 h-8 text-gray-800" />
                                <a href={r.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="z-10">
                                  <Icon name="external-link" className="w-4 h-4 text-gray-300 hover:text-black" />
                                </a>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{r.name}</h3>
                            <p className="text-sm text-gray-500">{r.description}</p>
                        </div>
                    ))}
                 </div>
            </div>
        )}

      </main>

      {/* Global Chat Bot Overlay */}
      <ChatBot />

    </div>
  );
};

export default App;