import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import CartDrawer from '../components/CartDrawer';

const RootLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ onOpenCart: () => setIsCartOpen(true) }} />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default RootLayout;