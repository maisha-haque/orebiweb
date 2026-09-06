import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTrash, FaMinus, FaPlus, FaChevronRight, FaTag } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'OREBI10') {
      setDiscount(0.10);
      setCouponApplied(true);
    } else {
      alert("Invalid Coupon Code. Try using 'OREBI10' for 10% OFF!");
    }
  };

  const shippingFee = totalAmount > 50 || totalAmount === 0 ? 0 : 9.99;
  const discountAmount = totalAmount * discount;
  const finalTotal = totalAmount - discountAmount + shippingFee;

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100 flex items-center gap-3">
            <FaShoppingBag className="text-2xl" />
            <span>Shopping Cart</span>
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <Link to="/shop" className="hover:underline">Shop</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">Cart ({items.length})</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-300 dark:border-zinc-800 rounded-sm bg-gray-50 dark:bg-zinc-900/50">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="text-3xl text-gray-400 dark:text-zinc-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-zinc-200">Your shopping cart is empty</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 mb-6">
              Looks like you haven't added any items to your shopping cart yet.
            </p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider inline-block hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 dark:border-zinc-800 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    <div className="sm:col-span-6 flex items-center gap-4">
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 object-contain bg-gray-50 dark:bg-zinc-800 p-1 border border-gray-200 dark:border-zinc-800 flex-shrink-0"
                        />
                      )}
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 hover:underline">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                          Color: {item.color}
                        </p>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-1 sm:hidden"
                        >
                          <FaTrash className="text-[10px]" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2 text-left sm:text-center text-sm font-semibold text-gray-800 dark:text-zinc-200">
                      ${item.price.toFixed(2)}
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                      <div className="flex items-center border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end">
                      <span className="font-bold text-sm text-gray-900 dark:text-zinc-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-gray-400 hover:text-red-500 hidden sm:block p-1 ml-3"
                        title="Remove item"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-gray-200 dark:border-zinc-800">
                <Link
                  to="/shop"
                  className="px-4 py-2 border border-gray-300 dark:border-zinc-700 text-xs font-semibold text-gray-800 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-6 h-fit">
              <h3 className="font-bold text-lg text-gray-900 dark:text-zinc-100 border-b border-gray-200 dark:border-zinc-800 pb-3">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300 flex items-center gap-1">
                  <FaTag /> Promo Code (Use 'OREBI10')
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="OREBI10"
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-xs text-gray-900 dark:text-zinc-100 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ 10% Discount Applied!
                  </p>
                )}
              </form>

              <div className="space-y-3 text-sm pt-2 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">${totalAmount.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount (10%)</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base font-extrabold text-gray-900 dark:text-zinc-100 pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <span>Total</span>
                  <span className="text-xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => alert("Payment Gateway Demo: Order placed successfully!")}
                className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center block"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
