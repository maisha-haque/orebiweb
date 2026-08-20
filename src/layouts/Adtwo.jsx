import React from 'react'
import Container from '../common/Container'
import Images from '../common/Images'
import adtwo from '/src/assets/Ads2.png'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

const Adtwo = () => {
  return (
    <Container>
        <div className="relative mt-15">
             <Images imgSrc={adtwo}/>

            <Link to={"/shop"}>
                 <Button btntext={"Shop Now"} className={"absolute bottom-10 left-140 "}/>
            </Link>
        </div>
        
    </Container>
  )
}

export default Adtwo