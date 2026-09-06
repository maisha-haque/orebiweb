import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart, FaChevronRight } from 'react-icons/fa';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100 flex items-center gap-3">
              <FaHeart className="text-red-500 text-2xl" />
              <span>My Saved Wishlist</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
              <Link to="/" className="hover:underline">Home</Link>
              <FaChevronRight className="text-[9px]" />
              <Link to="/shop" className="hover:underline">Shop</Link>
              <FaChevronRight className="text-[9px]" />
              <span className="font-semibold text-black dark:text-white">Wishlist ({items.length})</span>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearWishlist())}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-300 dark:border-zinc-800 rounded-sm bg-gray-50 dark:bg-zinc-900/50">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-3xl text-gray-400 dark:text-zinc-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-zinc-200">Your wishlist is currently empty</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 mb-6">
              Explore our catalog and click the heart icon on any product to save it here.
            </p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider inline-block hover:opacity-90 transition-opacity"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-4 flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative bg-gray-50 dark:bg-zinc-800 p-4 aspect-square flex items-center justify-center mb-4 rounded-sm">
                    <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.img}
                        alt={product.name || product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <button
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                      className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-zinc-900/80 text-gray-500 hover:text-red-500 rounded-full shadow-sm transition-colors"
                      title="Remove from Wishlist"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>

                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 hover:underline line-clamp-1 mt-0.5">
                      {product.name || product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-extrabold text-lg text-gray-900 dark:text-zinc-100">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
