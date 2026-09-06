import React from 'react';
import Container from '../common/Container';
import Images from '../common/Images';
import adone from '/src/assets/adone.jpg';
import adtwo from '/src/assets/adtwo.png';
import adthree from '/src/assets/adthree.jpg';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Ads = () => {
  return (
    <section className="py-12 bg-white dark:bg-zinc-950 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Large Ad */}
          <div className="relative group overflow-hidden rounded-sm border border-gray-100 dark:border-zinc-800">
            <Images imgSrc={adone} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
            <Link to="/shop" className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
              <Button btntext="Shop Now" className="px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md" />
            </Link>
          </div>

          {/* Right Two Ads Stacked */}
          <div className="flex flex-col gap-6">
            <div className="relative group overflow-hidden rounded-sm border border-gray-100 dark:border-zinc-800 flex-1">
              <Images imgSrc={adtwo} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <Link to="/shop" className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <Button btntext="Shop Now" className="px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md" />
              </Link>
            </div>

            <div className="relative group overflow-hidden rounded-sm border border-gray-100 dark:border-zinc-800 flex-1">
              <Images imgSrc={adthree} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <Link to="/shop" className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <Button btntext="Shop Now" className="px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Ads;