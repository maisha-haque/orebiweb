import React from 'react';
import Banner from '../layouts/Banner';
import Ads from '../layouts/Ads';
import Newarrival from '../layouts/Newarrival';
import Bestseller from '../layouts/Bestseller';
import Adtwo from '../layouts/Adtwo';
import Specialoffers from '../layouts/Specialoffers';

const Home = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <Banner />
      <Ads />
      <Newarrival />
      <Bestseller />
      <Adtwo />
      <Specialoffers />
    </div>
  );
};

export default Home;