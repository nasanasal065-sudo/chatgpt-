import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Icon } from './Icon';

const ITEMS_PER_PAGE = 8;
const CATEGORIES = ['All', 'Software', 'Template', 'Marketing', 'AI Pack', 'Ebook', 'Creative', 'Course'];
const SORT_OPTIONS = ['Popular', 'Price: Low to High', 'Price: High to Low'];

export const Marketplace: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return pA - pB;
      });
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return pB - pA;
      });
    }

    return result;
  }, [selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
     setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSortBy('Popular');
    setIsFilterOpen(false);
  };

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black/10 pb-8">
        <div>
           <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Commerce Tier</div>
           <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight">Asset Marketplace</h2>
           <p className="text-gray-500 mt-2 max-w-md">Premium digital infrastructure and creative resources for elite builders.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-end w-full md:w-auto">
            <div className="flex items-center gap-2 mb-2 sm:mb-0 mr-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Total Catalog</span>
              <span className="text-sm font-black font-mono bg-black text-white px-2 py-0.5 rounded">
                {filteredProducts.length.toLocaleString()}
              </span>
            </div>
            
            <div className="relative group w-full sm:w-auto">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full px-5 py-3 border-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-between gap-4 transition-all ${
                  isFilterOpen || selectedCategory !== 'All' 
                  ? 'bg-black text-white border-black shadow-xl scale-[1.02]' 
                  : 'bg-white border-gray-100 hover:border-black text-gray-500'
                }`}
              >
                <div className="flex items-center gap-2">
                   <Icon name="layout-grid" className="w-4 h-4" />
                   Category: {selectedCategory}
                </div>
                <Icon name="arrow-right" className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-100 shadow-2xl rounded-2xl z-40 overflow-hidden animate-in slide-in-from-top-2">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-3 px-2 pt-2">
                       <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Domain</div>
                       {selectedCategory !== 'All' && (
                         <button onClick={clearFilters} className="text-[10px] font-bold text-blue-600 hover:underline">Reset</button>
                       )}
                    </div>
                    <div className="space-y-1">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                            selectedCategory === cat ? 'bg-black text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          {cat}
                          {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full sm:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent hover:border-black rounded-xl text-xs font-black uppercase tracking-widest outline-none transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>Sort: {opt}</option>)}
              </select>
            </div>
        </div>
      </div>

      {/* Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {displayedProducts.map(product => (
            <div 
              key={product.id} 
              className="group flex flex-col h-full bg-white transition-all hover:-translate-y-2"
            >
              <div className={`aspect-[4/5] rounded-3xl bg-gradient-to-br ${product.imageGradient} mb-6 relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all`}>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                     <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-black/60">
                        {product.category}
                     </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                      <a 
                        href={product.buyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                      >
                         Secure Acquisition
                         <Icon name="shopping-bag" className="w-4 h-4" />
                      </a>
                  </div>
              </div>
              <div className="flex justify-between items-start gap-4">
                 <div className="flex-1">
                   <h3 className="text-xl font-black leading-tight tracking-tighter mb-1">{product.title}</h3>
                   <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">{product.description}</p>
                 </div>
                 <div className="text-lg font-black font-mono tracking-tighter bg-gray-50 px-3 py-1 rounded-lg">
                    {product.price}
                 </div>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
                 <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                 Encrypted Listing 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
           <div className="inline-block p-6 bg-white rounded-3xl shadow-xl mb-6">
              <Icon name="search" className="w-10 h-10 text-gray-200" />
           </div>
           <h3 className="text-3xl font-black tracking-tighter mb-3 uppercase">Zero Matches Found</h3>
           <p className="text-gray-400 max-w-xs mx-auto text-sm">Our agents couldn't find products matching your current criteria.</p>
           <button 
             onClick={clearFilters}
             className="mt-8 px-8 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
           >
             Clear All Parameters
           </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-100 mb-20">
           <div className="text-xs font-black uppercase tracking-widest text-gray-400">
             Indexing Page {currentPage.toLocaleString()} <span className="mx-2 opacity-30">/</span> {totalPages.toLocaleString()}
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  currentPage === 1 
                    ? 'border-gray-100 text-gray-200 cursor-not-allowed' 
                    : 'border-black text-black hover:bg-gray-50 active:scale-90'
                }`}
              >
                <Icon name="arrow-right" className="w-5 h-5 rotate-180" />
              </button>

              <button 
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-4 px-10 py-4 rounded-2xl transition-all text-xs font-black uppercase tracking-[0.2em] ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800 shadow-xl active:scale-95'
                }`}
              >
                Next Node
                <Icon name="arrow-right" className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};