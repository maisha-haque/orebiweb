import React from 'react';
import Button from '../common/Button';
import Container from '../common/Container';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative bg-[url(/src/assets/banner.png)] bg-no-repeat bg-center bg-cover h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full flex items-center">
      <Container>
        <div className="max-w-md pt-20 sm:pt-32">
          <Link to="/shop">
            <Button className="px-8 py-3 text-sm sm:text-base font-semibold shadow-lg hover:scale-105 transition-transform" btntext="Shop Now" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Banner;