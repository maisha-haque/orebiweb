import React from 'react'
import Images from './Images'
import Badge from './Badge'
import Heading from './Heading'
import Flex from './Flex'
import { HiHeart } from 'react-icons/hi'
import { TbRefresh } from 'react-icons/tb'
import { FaShoppingCart } from 'react-icons/fa'

import { useDispatch } from "react-redux";
import { increment } from "/src/features/cart/cartSlice";

const Product = ({ productimg, badgeT, proTitle, proprice }) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(increment());
    };


    return (
        <div className="relative group">
            <Images imgSrc={productimg} />
            <Badge badgeText={badgeT} className={"absolute top-4 left-4"} />
            <div className="bg-white p-6.25 hidden group-hover:block duration-300 absolute bottom-5 left-0 w-full">
                <Flex className={"justify-end gap-x-2 cursor-pointer"}>
                    <h3 className={"font-light  hover:font-semibold "}>Add To Wish List</h3>
                    <HiHeart />
                </Flex>
                <Flex className={"justify-end gap-x-2 cursor-pointer"}>
                    <h3 className={"font-light  hover:font-semibold "}>Compare</h3>
                    <TbRefresh />
                </Flex>
                <Flex className={"justify-end gap-x-2 cursor-pointer"}>
                    <h3 className={"font-light  hover:font-semibold "} onClick={handleAddToCart}>Add To Cart</h3>
                    <FaShoppingCart />
                </Flex>
            </div>
            <div className="flex justify-between">
                <Heading className={"text-[14px] font-semibold"} text={proTitle} as={"h3"} />
                <Heading className={"text-xs text-gray-500"} text={proprice} as={"p"} />
            </div>

        </div>
    )
}

export default Product