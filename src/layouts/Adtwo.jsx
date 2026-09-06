import React from 'react';
import Container from '../common/Container';
import Images from '../common/Images';
import adtwo from '/src/assets/Ads2.png';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Adtwo = () => {
  return (
    <section className="py-8 bg-white dark:bg-zinc-950 transition-colors">
      <Container>
        <div className="relative group overflow-hidden rounded-sm border border-gray-100 dark:border-zinc-800">
          <Images imgSrc={adtwo} className="w-full h-auto object-cover" />
          <Link to="/shop" className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 lg:right-20">
            <Button btntext="Shop Now" className="px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Adtwo;