import React from 'react';
import Container from '../common/Container';
import Images from '../common/Images';
import logo from '/src/assets/logo.png';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <footer className="bg-[#F5F5F3] dark:bg-zinc-900 pt-16 pb-8 mt-20 border-t border-gray-200 dark:border-zinc-800 transition-colors">
      <Container>
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Menu Column */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-gray-900 dark:text-zinc-100">
              Menu
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-zinc-400">
              <li>
                <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-black dark:hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-black dark:hover:text-white transition-colors">Journal</Link>
              </li>
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-gray-900 dark:text-zinc-100">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-zinc-400">
              <li>
                <button onClick={() => handleCategoryClick("Electronics & Office")} className="hover:text-black dark:hover:text-white transition-colors text-left">
                  Electronics & Office
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Backpacks & Bags")} className="hover:text-black dark:hover:text-white transition-colors text-left">
                  Backpacks & Bags
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Shoes & Heels")} className="hover:text-black dark:hover:text-white transition-colors text-left">
                  Shoes & Heels
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Men's Wear")} className="hover:text-black dark:hover:text-white transition-colors text-left">
                  Men's Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Women's Wear")} className="hover:text-black dark:hover:text-white transition-colors text-left">
                  Women's Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="font-bold text-sm mb-5 uppercase tracking-wider text-gray-900 dark:text-zinc-100">
              Help & Info
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-zinc-400">
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Special E-shop</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Secure Payments</li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-bold text-lg text-gray-900 dark:text-zinc-100">(052) 611-5711</h2>
            <p className="font-semibold text-sm mt-2 text-gray-800 dark:text-zinc-200 cursor-pointer hover:underline">
              company@domain.com
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-4 leading-relaxed">
              575 Crescent Ave.<br />
              Quakertown, PA 18951
            </p>
          </div>

          {/* Logo Branding Column */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <Link to="/">
              <Images imgSrc={logo} className="h-7 w-auto dark:invert" />
            </Link>
          </div>
        </div>

        {/* Bottom Social & Copyright Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-lg text-gray-600 dark:text-zinc-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>

          <p className="text-xs text-gray-500 dark:text-zinc-400 text-center sm:text-right">
            © 2026 Orebi Minimal eCommerce Store. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;