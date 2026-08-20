import React from 'react'
import Product from '../common/Product'
import Container from '../common/Container'
import Flex from '../common/Flex'
import productone from '/src/assets/productone.png'
import producttwo from '/src/assets/producttwo.png'
import productthree from '/src/assets/productthree.png'
import productfour from '/src/assets/productfour.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Newarrival = () => {
    return (

        <>

            <Container>
                <h2 className={"font-bold text-3xl mt-15 mb-8"}>New Arrivals</h2>

                <Swiper
                    modules={[Navigation, Scrollbar, A11y]}
                    spaceBetween={24}
                    slidesPerView={4.2}
                    navigation
                    loop={true}
                    speed={600}

                >


                    <SwiperSlide>
                        <Product productimg={productone} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={producttwo} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={productthree} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={productfour} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={productone} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={producttwo} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={productthree} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Product productimg={productfour} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"} />
                    </SwiperSlide>


                </Swiper>

            </Container>

     {/* <div className="py-7">
        <Container>
            <h2 className={"font-bold text-3xl mt-15 mb-8"}>New Arrivals</h2>

            <Flex className={"gap-x-3.5"}>
                <div className="w-1/4">
                    <Product productimg={productone} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={producttwo} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productthree} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productfour} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
            </Flex>
        </Container>
     </div> */}



        </>

    )
}

export default Newarrival