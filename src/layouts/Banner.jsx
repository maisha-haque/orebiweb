import React from 'react'
import Button from '../common/Button'
import Container from '../common/Container'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="bg-[url(/src/assets/banner.png)] bg-no-repeat bg-center bg-cover h-150 w-full">

       <Container>
        <Link to={"/shop"}>
          <Button className={"mt-81 ml-17.5"} btntext={"Shop Now"}/>
        </Link>
       </Container>

    </div>
  )
}

export default Banner