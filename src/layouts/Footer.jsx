import React from 'react'
import Container from '../common/Container'
import Flex from '../common/Flex'
import Images from '../common/Images'
import logo from '/src/assets/logo.png'
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
        <footer className="bg-[#F5F5F3] pt-16 pb-8 mt-20">
      <Container>

        {/* Top */}
        <Flex>

          {/* Left Side */}
          <div className="flex gap-24">

            {/* Menu */}
            <div>
              <h3 className="font-bold text-sm mb-5 uppercase">Menu</h3>

              <ul className="space-y-2 text-sm text-gray-500">

                <Link to={"/"}>
                <li className="hover:text-black duration-300 cursor-pointer mb-2">Home</li>
                </Link>

                <Link to={"/shop"}>
                <li className="hover:text-black duration-300 cursor-pointer mb-2">Shop</li>
                </Link>

                <Link to={"/about"}>
                <li className="hover:text-black duration-300 cursor-pointer mb-2">About</li>
                </Link>

                <Link to={"/contact"}>
                <li className="hover:text-black duration-300 cursor-pointer mb-2">Contact</li>
                </Link>
                <Link>
                <li className="hover:text-black duration-300 cursor-pointer mb-2">Journal</li>
                </Link>
    
              </ul>
            </div>

            {/* Shop */}
            <div>

            <Link to={"/shop"}>
              <h3 className="font-bold text-sm mb-5 uppercase">Shop</h3>
            </Link>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>Category 1</li>
                <li>Category 2</li>
                <li>Category 3</li>
                <li>Category 4</li>
                <li>Category 5</li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-bold text-sm mb-5 uppercase">Help</h3>

              <ul className="space-y-2 text-sm text-gray-500">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Special E-shop</li>
                <li>Shipping</li>
                <li>Secure Payments</li>
              </ul>
            </div>

          </div>

          {/* Middle */}
          <div className="mr-20">
            <h2 className="font-bold text-lg">(052) 611-5711</h2>

            <p className="font-semibold mt-2 cursor-pointer">
              company@domain.com
            </p>

            <p className="text-sm text-gray-500 mt-5 leading-6">
              575 Crescent Ave.
              <br />
              Quakertown, PA 18951
            </p>
          </div>

        
          <Link to={"/"}>
            <Images imgSrc={logo}/>
          </Link>

        </Flex>


        <Flex className="mt-18">

          <div className="flex gap-6 text-lg">

            <FaFacebookF className="cursor-pointer hover:text-gray-600 duration-300" />

            <FaLinkedinIn className="cursor-pointer hover:text-gray-600 duration-300" />

            <FaInstagram className="cursor-pointer hover:text-gray-600 duration-300" />

          </div>

          <p className="text-xs text-gray-500">
            2020 Orebi Minimal eCommerce Figma Template by Adveits
          </p>

        </Flex>

      </Container>
    </footer>
  )
}

export default Footer