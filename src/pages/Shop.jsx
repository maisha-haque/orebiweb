import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Container from '../common/Container';
import Product from '../common/Product';
import { fetchProducts, fetchCategories } from '../services/api';
import { FaThLarge, FaList, FaFilter, FaTimes, FaSearch, FaChevronRight, FaSpinner } from 'react-icons/fa';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // All API Products State
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([{ slug: 'all', name: 'All Categories' }]);
  const [loading, setLoading] = useState(true);

  // Active Filter States
  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState(2000);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load All Products and Categories on mount once
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetchProducts(100, 0),
      fetchCategories()
    ]).then(([prodRes, catRes]) => {
      if (isMounted) {
        setAllProducts(prodRes.products);
        setCategories(catRes);
      }
    }).catch(err => {
      console.error("Failed to load shop API data:", err);
    }).finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => { isMounted = false; };
  }, []);

  // Sync state with URL params whenever searchParams changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const srch = searchParams.get('search');
    if (cat !== null) {
      setSelectedCategory(cat);
    }
    if (srch !== null) {
      setSearchQuery(srch);
    }
  }, [searchParams]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, priceRange, searchQuery, sortBy]);

  // Extract unique brands from loaded products
  const availableBrands = useMemo(() => {
    const brands = new Set(allProducts.map(p => p.brand).filter(Boolean));
    return ['All Brands', ...Array.from(brands)];
  }, [allProducts]);

  // Helper function for instant exact and normalized category matching
  const isCategoryMatched = (product, targetCat) => {
    if (!targetCat || targetCat === 'all' || targetCat === 'All Categories') return true;
    const targetNorm = targetCat.toLowerCase().replace(/[^a-z0-9]/g, '');
    const catNorm1 = (product.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const catNorm2 = (product.rawCategory || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return catNorm1.includes(targetNorm) || targetNorm.includes(catNorm1) || catNorm2.includes(targetNorm) || targetNorm.includes(catNorm2);
  };

  // Filter products logic (Instant, local filtering over all 100 API products)
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category Filter
      if (!isCategoryMatched(product, selectedCategory)) {
        return false;
      }
      // Brand Filter
      if (selectedBrand !== 'All Brands' && product.brand !== selectedBrand) {
        return false;
      }
      // Price Filter
      if (product.price > priceRange) {
        return false;
      }
      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = (product.name || product.title).toLowerCase().includes(query);
        const matchesCategory = (product.category || '').toLowerCase().includes(query);
        const matchesBrand = (product.brand || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesBrand) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name-asc') return (a.name || a.title).localeCompare(b.name || b.title);
      if (sortBy === 'name-desc') return (b.name || b.title).localeCompare(a.name || a.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [allProducts, selectedCategory, selectedBrand, priceRange, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Clear all active filters
  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('All Brands');
    setPriceRange(2000);
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  const handleSelectCategory = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedBrand !== 'All Brands' || 
    priceRange < 2000 || 
    searchQuery !== '';

  const activeCatObj = categories.find(c => c.slug === selectedCategory);
  const activeCategoryName = activeCatObj ? activeCatObj.name : selectedCategory;

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">Product Catalog</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <FaChevronRight className="text-[9px]" />
                <span className="font-medium text-gray-700 dark:text-zinc-300">
                  {activeCategoryName}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="bg-[#F5F5F3] dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm font-semibold text-gray-800 dark:text-zinc-200"
            >
              <FaFilter className="text-xs" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-gray-300 dark:border-zinc-700 p-0.5 bg-white dark:bg-zinc-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-zinc-400 hover:text-black'}`}
                title="Grid View"
              >
                <FaThLarge className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-zinc-400 hover:text-black'}`}
                title="List View"
              >
                <FaList className="text-sm" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Showing <span className="font-semibold text-gray-800 dark:text-zinc-200">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Sort & Pagination per page controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-600 dark:text-zinc-400">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-xs text-gray-800 dark:text-zinc-200 px-3 py-1.5 outline-none font-medium cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-600 dark:text-zinc-400">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-xs text-gray-800 dark:text-zinc-200 px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm">
            <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mr-2">Active Filters:</span>
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-gray-800 dark:text-zinc-200 rounded-full">
                Category: {activeCategoryName}
                <button onClick={() => handleSelectCategory('all')} className="hover:text-red-500"><FaTimes className="text-[10px]" /></button>
              </span>
            )}

            {selectedBrand !== 'All Brands' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-gray-800 dark:text-zinc-200 rounded-full">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All Brands')} className="hover:text-red-500"><FaTimes className="text-[10px]" /></button>
              </span>
            )}

            {priceRange < 2000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-gray-800 dark:text-zinc-200 rounded-full">
                Max Price: ${priceRange}
                <button onClick={() => setPriceRange(2000)} className="hover:text-red-500"><FaTimes className="text-[10px]" /></button>
              </span>
            )}

            {searchQuery !== '' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-gray-800 dark:text-zinc-200 rounded-full">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-500"><FaTimes className="text-[10px]" /></button>
              </span>
            )}

            <button
              onClick={handleClearAllFilters}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline ml-auto"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Shop Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            {/* Categories */}
            <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 mb-4">Categories</h3>
              <ul className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const count = cat.slug === 'all'
                    ? allProducts.length
                    : allProducts.filter(p => isCategoryMatched(p, cat.slug)).length;
                  return (
                    <li key={cat.slug}>
                      <button
                        onClick={() => handleSelectCategory(cat.slug)}
                        className={`w-full flex items-center justify-between text-xs py-1.5 font-medium transition-colors ${
                          selectedCategory === cat.slug
                            ? 'text-black dark:text-white font-bold underline'
                            : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-gray-500 dark:text-zinc-400">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Range */}
            <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 mb-3">Shop by Price</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={10}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-zinc-300">
                  <span>$10.00</span>
                  <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 font-bold">
                    Max: ${priceRange}.00
                  </span>
                  <span>$2000.00</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 mb-3">Brands</h3>
              <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {availableBrands.map((brand) => (
                  <li key={brand}>
                    <button
                      onClick={() => setSelectedBrand(brand)}
                      className={`text-xs font-medium transition-colors ${
                        selectedBrand === brand
                          ? 'text-black dark:text-white font-bold underline'
                          : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid / List Display */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="py-24 text-center">
                <FaSpinner className="animate-spin text-3xl text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
                  Loading products...
                </p>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-gray-300 dark:border-zinc-800 rounded-sm">
                <FaSearch className="mx-auto text-4xl text-gray-300 dark:text-zinc-700 mb-4" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-zinc-200">No matching products found</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 mb-6">
                  Try adjusting your category, price range, brand, or search terms.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm group hover:shadow-md transition-shadow"
                  >
                    <Link to={`/product/${product.id}`} className="w-full sm:w-48 h-48 bg-gray-50 dark:bg-zinc-800 p-2 flex-shrink-0 flex items-center justify-center">
                      <img src={product.img} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </Link>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 text-gray-600 dark:text-zinc-300">
                          {product.category}
                        </span>
                        {product.badge && (
                          <span className="text-[11px] font-bold uppercase bg-black text-white dark:bg-white dark:text-black px-2 py-0.5">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-zinc-100 hover:underline">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-gray-900 dark:text-zinc-100">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2">{product.description}</p>
                      <Link
                        to={`/product/${product.id}`}
                        className="inline-block mt-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase"
                      >
                        View Product Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors ${
                      currentPage === pageNum
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* Mobile Sidebar Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 p-6 overflow-y-auto shadow-2xl z-50">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="font-bold text-lg">Filter Products</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-bold text-sm mb-3">Categories</h3>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => { handleSelectCategory(cat.slug); setIsMobileFilterOpen(false); }}
                      className={`block w-full text-left text-xs py-1 ${selectedCategory === cat.slug ? 'font-bold underline text-black dark:text-white' : 'text-gray-600 dark:text-zinc-400'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-bold text-sm mb-3">Max Price: ${priceRange}</h3>
                <input
                  type="range"
                  min={10}
                  max={2000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => { handleClearAllFilters(); setIsMobileFilterOpen(false); }}
                className="w-full py-2 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;