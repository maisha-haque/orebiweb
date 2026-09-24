import React, { useState } from 'react';
import Images from './Images';
import Badge from './Badge';
import Heading from './Heading';
import { HiHeart } from 'react-icons/hi';
import { TbRefresh } from 'react-icons/tb';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { toggleCompare } from "../features/compare/compareSlice";
import { Link } from 'react-router-dom';

const Product = ({ productimg, badgeT, proTitle, proprice, id, product }) => {
  const dispatch = useDispatch();
  const [addedToast, setAddedToast] = useState(false);
  const [compareToast, setCompareToast] = useState(false);
  const [compareToastMsg, setCompareToastMsg] = useState('');

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare?.items || []);

  // Extract properties whether passed as single object or individual props
  const pId = String(product?.id || id || `p-${Date.now()}`);
  const img = product?.img || productimg;
  const title = product?.name || product?.title || proTitle || 'Product Item';
  const priceDisplay = typeof product?.price === 'number' 
    ? `$${product.price.toFixed(2)}` 
    : (proprice || '$44.00');
  const badgeText = product?.badge || badgeT || 'New';

  const isInWishlist = wishlistItems.some((item) => String(item.id) === pId);
  const isInCompare = compareItems.some((item) => String(item.id) === pId);

  const productObj = product || {
    id: pId,
    name: title,
    title: title,
    price: typeof product?.price === 'number' ? product.price : parseFloat(priceDisplay.replace(/[^0-9.]/g, '')) || 44,
    img: img,
    category: product?.category || 'General',
    color: 'Standard',
    quantity: 1
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    dispatch(addToCart(productObj));
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleWishlist(productObj));
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleCompare(productObj));
    const willBeIn = !isInCompare;
    setCompareToastMsg(willBeIn ? 'Added to Compare' : 'Removed from Compare');
    setCompareToast(true);
    setTimeout(() => setCompareToast(false), 2500);
  };

  return (
    <div className="relative group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg rounded-sm overflow-hidden flex flex-col h-full">
      {/* Toast alert when added to cart */}
      {addedToast && (
        <div className="absolute top-2 right-2 z-30 bg-black text-white dark:bg-white dark:text-black text-[11px] font-semibold px-2.5 py-1 rounded shadow-md flex items-center gap-1.5 animate-fadeIn">
          <FaCheck className="text-green-400 dark:text-green-600 text-xs" />
          <span>Added to Cart</span>
        </div>
      )}

      {/* Toast alert when added/removed from compare */}
      {compareToast && (
        <div className="absolute top-2 right-2 z-30 bg-black text-white dark:bg-white dark:text-black text-[11px] font-semibold px-2.5 py-1.5 rounded shadow-md flex items-center gap-2 animate-fadeIn">
          <span>{compareToastMsg}</span>
          <Link to="/compare" onClick={(e) => e.stopPropagation()} className="underline font-bold text-amber-300 dark:text-amber-500 hover:opacity-80">
            View
          </Link>
        </div>
      )}

      {/* Image & Badges Container */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-800 flex items-center justify-center p-3 cursor-pointer aspect-square">
        <Link to={`/product/${pId}`} className="w-full h-full flex items-center justify-center">
          <Images 
            imgSrc={img} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>

        {badgeText && (
          <Badge 
            badgeText={badgeText} 
            className="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-3 py-1 uppercase tracking-wider" 
          />
        )}

        {/* Wishlist quick toggle button on top right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-sm transition-all ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 dark:bg-zinc-800/80 text-gray-400 hover:text-red-500'
          }`}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <HiHeart className="text-sm" />
        </button>

        {/* Hover Action Drawer Overlay */}
        <div className="bg-white/95 dark:bg-zinc-900/95 p-4 duration-300 absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform flex flex-col gap-2 border-t border-gray-100 dark:border-zinc-800 z-20 shadow-md">
          <div 
            onClick={handleWishlist}
            className="flex items-center justify-end gap-x-2 cursor-pointer text-gray-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <span className="text-xs font-medium">{isInWishlist ? 'In Wishlist' : 'Add To Wish List'}</span>
            <HiHeart className={`text-sm ${isInWishlist ? 'text-red-500' : ''}`} />
          </div>

          <div 
            onClick={handleCompare}
            className={`flex items-center justify-end gap-x-2 cursor-pointer transition-colors ${
              isInCompare 
                ? 'text-black dark:text-white font-bold' 
                : 'text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'
            }`}
            title={isInCompare ? "Remove from Compare" : "Add to Compare"}
          >
            <span className="text-xs font-medium">{isInCompare ? 'In Compare' : 'Compare'}</span>
            <TbRefresh className={`text-sm ${isInCompare ? 'text-black dark:text-white font-bold' : ''}`} />
          </div>

          <div 
            onClick={handleAddToCart}
            className="flex items-center justify-end gap-x-2 cursor-pointer text-gray-900 dark:text-zinc-100 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="text-xs font-bold">Add To Cart</span>
            <FaShoppingCart className="text-sm" />
          </div>
        </div>
      </div>

      {/* Product Details info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${pId}`} className="hover:underline flex-1 min-w-0">
            <Heading 
              className="text-[14px] font-semibold text-gray-900 dark:text-zinc-100 line-clamp-1" 
              text={title} 
              as="h3" 
            />
          </Link>
          <Heading 
            className="text-xs font-bold text-gray-600 dark:text-zinc-400 whitespace-nowrap ml-2" 
            text={priceDisplay} 
            as="p" 
          />
        </div>

        {product?.category && (
          <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-1">
            {product.category}
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;