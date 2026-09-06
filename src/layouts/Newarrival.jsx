import React, { useState, useEffect } from 'react';
import Product from '../common/Product';
import Container from '../common/Container';
import { fetchProducts } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { FaSpinner } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Newarrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(10, 0)
      .then(res => setNewArrivals(res.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 bg-white dark:bg-zinc-950 transition-colors">
      <Container>
        <div className="flex items-center justify-between mt-8 mb-6">
          <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-zinc-100">
            New Arrivals
          </h2>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            <FaSpinner className="animate-spin text-2xl mx-auto mb-2" />
            <p className="text-xs">Loading products...</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 3.2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 }
            }}
            navigation
            loop={newArrivals.length > 4}
            speed={600}
            className="pb-4"
          >
            {newArrivals.map((product) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  );
};

export default Newarrival;