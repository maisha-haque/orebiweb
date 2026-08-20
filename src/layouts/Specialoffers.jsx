import React from 'react'
import Container from '../common/Container'
import Flex from '../common/Flex'
import Product from '../common/Product'
import productoneso from '/src/assets/productoneso.png'
import producttwoso from '/src/assets/producttwoso.png'
import productthreeso from '/src/assets/productthreeso.png'
import productfourso from '/src/assets/productfourso.png'

const Specialoffers = () => {
  return (
        <div className="py-7">
        <Container>
            <h2 className={"font-bold text-3xl mt-12 mb-8"}>Special Offers</h2>

            <Flex className={"gap-x-3.5"}>
                <div className="w-1/4">
                    <Product productimg={productoneso} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={producttwoso} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productthreeso} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productfourso} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
            </Flex>
        </Container>
     </div>
       )
}

export default Specialoffers