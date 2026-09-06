import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import Product from '../common/Product';
import { fetchProducts } from '../services/api';
import { FaSpinner } from 'react-icons/fa';

const Specialoffers = () => {
  const [specialOffers, setSpecialOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(8, 18)
      .then(res => setSpecialOffers(res.products.slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 bg-white dark:bg-zinc-950 transition-colors">
      <Container>
        <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-zinc-100 mt-6 mb-8">
          Special Offers
        </h2>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            <FaSpinner className="animate-spin text-2xl mx-auto mb-2" />
            <p className="text-xs">Loading special offers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialOffers.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Specialoffers;