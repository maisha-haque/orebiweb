import React from 'react';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaAward, FaTruck, FaUsers, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">About Orebi</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">About Us</span>
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 sm:p-16 mb-16 rounded-sm">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Our Story & Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100 leading-tight">
              Crafting Minimalist Luxury for Everyday Life
            </h2>
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              Founded with a passion for clean aesthetics, Orebi is a premier lifestyle brand focused on functional simplicity, timeless design, and uncompromised quality. We believe that true luxury lies in thoughtful design details and sustainable craftsmanship.
            </p>
          </div>
        </div>

        {/* Stats Counter Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 mb-16 border-y border-gray-200 dark:border-zinc-800 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100">120K+</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Happy Customers</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100">15+</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Design Awards</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100">45+</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Countries Shipped</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100">99.8%</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Customer Satisfaction</p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Why Choose Orebi?</h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2">
              Our commitment to excellence guides every product we create and deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-3">
              <FaAward className="text-2xl text-gray-800 dark:text-zinc-200" />
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">Minimal Design</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Stripping away clutter to focus on pure form, functionality, and clean silhouettes.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-3">
              <FaLeaf className="text-2xl text-gray-800 dark:text-zinc-200" />
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">Eco-Friendly</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Sourcing organic materials and implementing zero-waste packaging practices.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-3">
              <FaTruck className="text-2xl text-gray-800 dark:text-zinc-200" />
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">Global Shipping</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Fast, insured worldwide delivery with live end-to-end package tracking.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-3">
              <FaUsers className="text-2xl text-gray-800 dark:text-zinc-200" />
              <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">24/7 Support</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Dedicated customer support team available round-the-clock for any inquiry.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;