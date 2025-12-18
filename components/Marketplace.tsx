import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Icon } from './Icon';

const ITEMS_PER_PAGE = 8;
const CATEGORIES = ['All', 'Software', 'Template', 'Marketing', 'AI Pack', 'Ebook', 'Creative', 'Course'];

export const Marketplace: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular'); // Popular, Price: Low to High, Price: High to Low

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort (simple string price parsing "$49.00")
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
    // 'Popular' leaves it as is (mock order, which is effectively random/generated)

    return result;
  }, [selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Reset page when filter changes
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

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-end border-b border-black pb-4">
        <div>
           <h2 className="text-3xl font-black uppercase tracking-tighter">Digital Asset Marketplace</h2>
           <p className="text-gray-500 mt-2">Premium resources for the modern creator economy.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 items-end md:items-center relative">
            <span className="text-xs font-bold mr-2 text-gray-400">
               {filteredProducts.length.toLocaleString()} Results
            </span>
            
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-4 py-2 border rounded text-sm font-medium flex items-center gap-2 ${isFilterOpen ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
              >
                <Icon name="layout-grid" className="w-4 h-4" />
                Filter: {selectedCategory}
              </button>
              
              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-2">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 pt-2">Category</div>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === cat ? 'bg-black text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setSortBy(prev => prev === 'Popular' ? 'Price: Low to High' : prev === 'Price: Low to High' ? 'Price: High to Low' : 'Popular')}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm font-medium min-w-[160px]"
            >
              Sort: {sortBy.replace('Price: ', '')}
            </button>
        </div>
      </div>

      {/* Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-in fade-in duration-500">
          {displayedProducts.map(product => (
            <a 
              key={product.id} 
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className={`h-64 rounded-xl bg-gradient-to-br ${product.imageGradient} mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                      <Icon name="shopping-bag" className="w-5 h-5" />
                  </div>
              </div>
              <div className="flex justify-between items-start">
                 <div>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                   <h3 className="text-lg font-bold leading-tight mt-1 group-hover:underline">{product.title}</h3>
                 </div>
                 <span className="text-lg font-mono font-bold group-hover:bg-black group-hover:text-white px-2 py-1 rounded transition-colors -mr-2">{product.price}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
            </a>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
           <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Icon name="search" className="w-8 h-8 text-gray-400" />
           </div>
           <h3 className="text-xl font-bold mb-2">No products found</h3>
           <p className="text-gray-500">Try adjusting your filters.</p>
           <button 
             onClick={() => setSelectedCategory('All')}
             className="mt-4 px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800"
           >
             Clear Filters
           </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 pt-8 border-t border-gray-100">
           <button 
             onClick={handlePrev}
             disabled={currentPage === 1}
             className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
               currentPage === 1 
                 ? 'text-gray-300 cursor-not-allowed' 
                 : 'text-black hover:bg-gray-100 border border-gray-200 hover:border-black'
             }`}
           >
             <Icon name="arrow-right" className="w-4 h-4 rotate-180" />
             Previous
           </button>

           <div className="text-sm font-mono text-gray-400">
             Page {currentPage.toLocaleString()} <span className="text-gray-200">/</span> {totalPages.toLocaleString()}
           </div>

           <button 
             onClick={handleNext}
             disabled={currentPage === totalPages}
             className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
               currentPage === totalPages 
                 ? 'text-gray-300 cursor-not-allowed' 
                 : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
             }`}
           >
             Next Page
             <Icon name="arrow-right" className="w-4 h-4" />
           </button>
        </div>
      )}
    </div>
  );
};