import React, { useRef } from 'react'
import Container from '../common/Container'
import Flex from '../common/Flex'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Images from '../common/Images';
import logo from '/src/assets/logo.png'

import { useSelector } from "react-redux";

const Header = () => {
  let dropRef = useRef(null)
  let handledrop = () => {
    if (dropRef.current.style.display == "block") {
      dropRef.current.style.display = "none"
    } else {
      dropRef.current.style.display = "block"
    }
  };

  const cartCount = useSelector((state) => state.cart.value);

  return (
    <>
      <div className="w-full py-3 bg-white border-b border-gray-200">
        <Container>
          <Flex>

            <Link to={"/"}>
              <Images imgSrc={logo} />
            </Link>



            <ul className="flex items-center gap-10 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[15px] text-gray-500 hover:font-semibold hover:text-black duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-[15px] text-gray-500 hover:font-semibold hover:text-black duration-300"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[15px] text-gray-500 hover:font-semibold hover:text-black duration-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-[15px] text-gray-500 hover:font-semibold hover:text-black duration-300"
                >
                  Contacts
                </Link>
              </li>
            </ul>


            <div className="w-20"></div>

          </Flex>
        </Container>
      </div>




      <div className="w-full py-3 bg-[#F5F5F3]">
        <Container>
          <Flex>

            <div className="relative">

              <div className="flex items-center gap-2 cursor-pointer" onClick={handledrop}>
                <FaBars className="text-sm" />
                <p className="text-sm">Shop by Category</p>
              </div>

              <div className="absolute p-2 w-52 bg-gray-100 border-2 border-gray-800 shadow-md left-0 top-8 hidden" ref={dropRef}>
                <ul className="py-2">
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Electronics & Office</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Backpacks & Bags</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Shoes & Heels</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Men's Wear</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Women's Wear</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Kid's Wear</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Health & Beauty</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Home & Living</li>
                  <li className="px-5 py-3 text-[15px]  cursor-pointer hover:bg-white hover:text-black hover:font-semibold duration-300 hover:pl-7">Accessories & Jewellery</li>


                </ul>

              </div>


            </div>


            <div className="relative w-150">

              <input
                type="text"
                placeholder="Search Products"
                className="w-full h-10 bg-white px-5 outline-none text-sm"
              />

              <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" />

            </div>


            <div className="flex items-center gap-7">

              <div className="flex items-center gap-1 cursor-pointer">
                <FaUser />
                <FaCaretDown className="text-xs" />
              </div>

              <div className={"relative ml-10.25 cursor-pointer"}>
                <FaShoppingCart />

                {cartCount > 0 && (
                  <span
                    className={
                      "absolute -top-3 -right-3 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center"
                    }
                  >
                    {cartCount}
                  </span>
                )}
              </div>

            </div>

          </Flex>
        </Container>
      </div>

    </>
  )
}

export default Header