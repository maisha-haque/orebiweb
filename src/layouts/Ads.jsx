import React from 'react'
import Container from '../common/Container'
import Flex from '../common/Flex'
import Images from '../common/Images'
import adone from '/src/assets/adone.jpg'
import adtwo from '/src/assets/adtwo.png'
import adthree from '/src/assets/adthree.jpg'
import { Link } from 'react-router-dom'
import Button from '../common/Button'


const Ads = () => {
    return (
        <>
            <div className="mt-20">
                <Container>
                    <Flex className={"items-center"}>
                        <div className="w-[48%]">
                           <div className="relative">
                             <Images imgSrc={adone}/>

                            <Link to={"/shop"}>
                                <Button btntext={"Shop Now"} className={"absolute bottom-15 left-13 "}/>
                            </Link>
                           </div>

                        </div>

                        <div className="w-[48%]">
                            <div className="relative">
                                 <Images imgSrc={adtwo} className={"mb-8"} />

                                <Link to={"/shop"}>
                                   <Button btntext={"Shop Now"} className={"absolute bottom-12 left-11 "}/>
                                </Link>
                            </div>

                           <div className="relative">
                                <Images imgSrc={adthree} />

                                <Link to={"/shop"}>
                                   <Button btntext={"Shop Now"} className={"absolute bottom-12 left-11 "}/>
                                </Link>
                            </div>
                            
                            
                        </div>


                    </Flex>
                </Container>

            </div>


        </>
    )
}

export default Ads