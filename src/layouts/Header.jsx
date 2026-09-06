import React, { useState, useRef, useEffect } from 'react';
import Container from '../common/Container';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaSearch, 
  FaUser, 
  FaShoppingCart, 
  FaHeart, 
  FaBars, 
  FaCaretDown, 
  FaSun, 
  FaMoon, 
  FaTimes, 
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import Images from '../common/Images';
import logo from '/src/assets/logo.png';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { fetchCategories, searchProducts } from '../services/api';

const Header = ({ onOpenCart }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = useSelector((state) => state.cart.value);
  const wishlistCount = useSelector((state) => state.wishlist.value);
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([{ slug: 'all', name: 'All Categories' }]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const userMenuRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories().then(data => setCategories(data)).catch(() => {});
  }, []);

  // Handle Search Input Change via API
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchProducts(searchQuery);
        setSearchResults(results.slice(0, 6));
      } catch (err) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsCategoryOpen(false);
    setIsSearchFocused(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleCategorySelect = (catSlug) => {
    setIsCategoryOpen(false);
    if (catSlug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${catSlug}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contacts', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 transition-colors">
      {/* Primary Top Bar */}
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Images imgSrc={logo} className="h-6 w-auto dark:invert" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `text-[15px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-black dark:text-white font-bold underline underline-offset-8'
                        : 'text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Top Right Action Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Dark/Light Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-lg hover:text-indigo-600 transition-colors" />
                ) : (
                  <FaSun className="text-lg text-amber-400 hover:text-amber-300 transition-colors" />
                )}
              </button>

              {/* User Account Person Icon (Navigates to /user Page or Quick Dropdown) */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => navigate('/user')}
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  className="flex items-center gap-1 text-gray-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
                  title="User Account Page"
                  aria-label="User Account"
                >
                  {isAuthenticated ? (
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full border border-gray-300 dark:border-zinc-700" />
                  ) : (
                    <FaUser className="text-lg" />
                  )}
                  <FaCaretDown className="text-xs" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-sm py-2 z-50 animate-fadeIn"
                  >
                    {isAuthenticated ? (
                      <div>
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                          <p className="text-xs font-bold text-gray-900 dark:text-zinc-100">{user.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/user"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        >
                          <FaUserCircle className="inline mr-2" /> My Profile & Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-xs text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        >
                          <FaHeart className="inline mr-2 text-red-500" /> Wishlist ({wishlistCount})
                        </Link>
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); navigate('/user'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 flex items-center gap-2 border-t border-gray-100 dark:border-zinc-800 mt-1"
                        >
                          <FaSignOutAlt /> Sign Out
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                          <p className="text-xs font-bold text-gray-900 dark:text-zinc-100">User Account</p>
                          <p className="text-[11px] text-gray-400">Sign in or register</p>
                        </div>
                        <Link
                          to="/user"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-xs font-bold text-gray-800 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        >
                          Sign In / Register Page
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Icon with Badge */}
              <Link
                to="/wishlist"
                className="relative p-1.5 text-gray-700 dark:text-zinc-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                title="My Wishlist"
                aria-label="Wishlist"
              >
                <FaHeart className="text-lg" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Badge */}
              <button
                onClick={onOpenCart}
                className="relative p-1.5 text-gray-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
                title="Shopping Cart"
                aria-label="Cart"
              >
                <FaShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileNavOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Secondary Bar: Responsive Category Dropdown & API Search Bar */}
      <div className="bg-[#F5F5F3] dark:bg-zinc-800/90 border-t border-gray-200/60 dark:border-zinc-800 py-3 transition-colors">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Category Dropdown Toggle */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full md:w-auto gap-3 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-sm font-medium text-gray-800 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <FaBars className="text-xs" />
                  <span>Shop by Category</span>
                </div>
                <FaCaretDown className={`text-xs transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Responsive Category Menu Overlay */}
              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-1 w-full md:w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-2xl z-50 py-2 max-h-96 overflow-y-auto rounded-sm">
                  <ul>
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <button
                          onClick={() => handleCategorySelect(cat.slug)}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white hover:pl-7 transition-all flex items-center justify-between"
                        >
                          <span>{cat.name}</span>
                          <FaChevronRight className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Product Search Input with Autocomplete Suggestions via Axios */}
            <div className="relative flex-1 max-w-2xl" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products by title, brand, or category..."
                  className="w-full h-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 pr-10 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:border-black dark:focus:border-white transition-colors"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 p-1"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white p-1"
                  aria-label="Search"
                >
                  <FaSearch className="text-sm" />
                </button>
              </form>

              {/* Live Autocomplete Suggestions Box */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-2xl z-50 rounded-sm overflow-hidden">
                  {isSearching ? (
                    <div className="p-4 text-center text-xs text-gray-500 dark:text-zinc-400">
                      Searching API products...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 dark:bg-zinc-800 text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-700 flex justify-between">
                        <span>API Search Results ({searchResults.length})</span>
                        <span className="normal-case text-gray-400">Click to view</span>
                      </div>
                      <div className="divide-y divide-gray-100 dark:divide-zinc-800 max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setIsSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors"
                          >
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-12 h-12 object-contain bg-gray-100 dark:bg-zinc-800 flex-shrink-0 p-1"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-zinc-400">
                                {product.category} • <span className="font-medium text-black dark:text-white">${product.price.toFixed(2)}</span>
                              </p>
                            </div>
                            {product.badge && (
                              <span className="text-[10px] bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 font-bold uppercase">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full py-2.5 bg-gray-100 dark:bg-zinc-800 text-xs font-semibold text-center text-gray-700 dark:text-zinc-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-gray-500 dark:text-zinc-400">
                      No products matched "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 py-4 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                      : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;