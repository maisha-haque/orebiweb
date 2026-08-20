import React from 'react'
import Container from '../common/Container'
import Flex from '../common/Flex'
import Product from '../common/Product'
import productoneb from '/src/assets/productoneb.png'
import producttwob from '/src/assets/producttwob.png'
import productthreeb from '/src/assets/productthreeb.png'
import productfourb from '/src/assets/productfourb.png'

const Bestseller = () => {
  return (
       <>

        <div className="py-7">
        <Container>
            <h2 className={"font-bold text-3xl mt-12 mb-8"}>Our Bestsellers</h2>

            <Flex className={"gap-x-3.5"}>
                <div className="w-1/4">
                    <Product productimg={productoneb} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={producttwob} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productthreeb} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
                <div className="w-1/4">
                    <Product productimg={productfourb} badgeT={"New"} proTitle={"Basic Crew Neck Tee"} proprice={"$44.00"}/>
                </div>
            </Flex>
        </Container>
     </div>
   </>
  )
}

export default Bestseller