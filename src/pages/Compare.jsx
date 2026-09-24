import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare, clearCompare } from '../features/compare/compareSlice';
import { addToCart } from '../features/cart/cartSlice';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { TbRefresh } from 'react-icons/tb';
import { 
  FaTrash, 
  FaShoppingCart, 
  FaChevronRight, 
  FaStar, 
  FaCheck, 
  FaTimes
} from 'react-icons/fa';

const Compare = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.compare);
  const [toastProduct, setToastProduct] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setToastProduct(product.name || product.title);
    setTimeout(() => setToastProduct(null), 2500);
  };

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors min-h-screen">
      <Container>
        {/* Toast Alert for Add To Cart from Compare */}
        {toastProduct && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded shadow-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
            <FaCheck className="text-green-400 dark:text-green-600" />
            <span>Added "{toastProduct}" to Cart!</span>
          </div>
        )}

        {/* Breadcrumb & Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100 flex items-center gap-3">
              <TbRefresh className="text-2xl text-gray-800 dark:text-zinc-200" />
              <span>Product Comparison</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
              <Link to="/" className="hover:underline">Home</Link>
              <FaChevronRight className="text-[9px]" />
              <Link to="/shop" className="hover:underline">Shop</Link>
              <FaChevronRight className="text-[9px]" />
              <span className="font-semibold text-black dark:text-white">
                Compare ({items.length})
              </span>
            </div>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <Link
                to="/shop"
                className="px-4 py-2 text-xs font-semibold border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                + Add More Products
              </Link>
              <button
                onClick={() => dispatch(clearCompare())}
                className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline px-2 py-1"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-300 dark:border-zinc-800 rounded-sm bg-gray-50 dark:bg-zinc-900/50">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbRefresh className="text-3xl text-gray-400 dark:text-zinc-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-zinc-200">
              No products to compare
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 mb-6 max-w-md mx-auto">
              You haven't added any products to comparison yet. Explore our shop and click the Compare icon on any product to see their details side by side.
            </p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider inline-block hover:opacity-90 transition-opacity"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          /* Comparison Table / Matrix */
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-800">
                    <th className="p-4 text-left w-48 text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Product Info
                    </th>
                    {items.map((product) => (
                      <th
                        key={product.id}
                        className="p-5 text-center min-w-[240px] max-w-[280px] bg-white dark:bg-zinc-900 relative group align-top"
                      >
                        <button
                          onClick={() => dispatch(removeFromCompare(product.id))}
                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          title="Remove from comparison"
                        >
                          <FaTimes className="text-sm" />
                        </button>

                        <div className="w-36 h-36 mx-auto mb-3 bg-gray-50 dark:bg-zinc-800 p-2 rounded-sm flex items-center justify-center">
                          <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                            <img
                              src={product.img}
                              alt={product.name || product.title}
                              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                            />
                          </Link>
                        </div>

                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-sm text-gray-900 dark:text-zinc-100 hover:underline line-clamp-2 min-h-[40px]">
                            {product.name || product.title}
                          </h3>
                        </Link>

                        <div className="mt-3">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <FaShoppingCart className="text-xs" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 text-xs">
                  {/* Price Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Price
                    </td>
                    {items.map((product) => {
                      const priceVal = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
                      return (
                        <td key={product.id} className="p-4 text-center">
                          <span className="font-extrabold text-base text-gray-900 dark:text-zinc-100">
                            ${priceVal.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > priceVal && (
                            <span className="text-[11px] text-gray-400 line-through ml-2">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Rating Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Rating & Reviews
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-xs ${
                                star <= Math.round(product.rating || 4.5) ? 'text-amber-400' : 'text-gray-300 dark:text-zinc-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-500 dark:text-zinc-400">
                          {product.rating ? `${product.rating} / 5` : '4.5 / 5'} ({product.reviewCount || 15} reviews)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Availability Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Availability
                    </td>
                    {items.map((product) => {
                      const inStock = (product.stock === undefined || product.stock > 0);
                      return (
                        <td key={product.id} className="p-4 text-center">
                          {inStock ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                              <FaCheck className="text-[10px]" /> In Stock ({product.stock ?? 25})
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold text-xs">Out of Stock</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Category Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Category
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-700 dark:text-zinc-300 font-medium">
                        {product.category || 'General'}
                      </td>
                    ))}
                  </tr>

                  {/* Brand Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Brand
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-700 dark:text-zinc-300 font-medium">
                        {product.brand || 'Orebi Signature'}
                      </td>
                    ))}
                  </tr>

                  {/* Description / Summary Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Summary
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {product.description || 'Premium quality crafted for optimal everyday performance.'}
                      </td>
                    ))}
                  </tr>

                  {/* Shipping Info Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Shipping
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-700 dark:text-zinc-300">
                        {product.specifications?.Shipping || 'Ships in 1-2 business days'}
                      </td>
                    ))}
                  </tr>

                  {/* Weight / Dimensions Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Dimensions / Weight
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-700 dark:text-zinc-300">
                        {product.specifications?.Dimensions || 'Standard'} • {product.specifications?.Weight || '0.5 kg'}
                      </td>
                    ))}
                  </tr>

                  {/* Bottom Action Row */}
                  <tr>
                    <td className="p-4 font-bold text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900/90 sticky left-0 z-10">
                      Action
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <button
                          onClick={() => dispatch(removeFromCompare(product.id))}
                          className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold inline-flex items-center gap-1.5"
                        >
                          <FaTrash className="text-[10px]" />
                          <span>Remove</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Compare;
