import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { FaTrash, FaTimes, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaShoppingBag className="text-lg" />
              <h2 className="font-bold text-lg">Your Shopping Cart</h2>
              <span className="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full font-semibold">
                {items.length} items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <FaTimes />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <FaShoppingBag className="text-3xl text-gray-400 dark:text-zinc-500" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800 rounded-sm group"
                >
                  {item.img && (
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover bg-white dark:bg-zinc-800 p-1 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Color: {item.color}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-xs"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-xs"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <span className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/90 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-zinc-400">Subtotal</span>
                <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-zinc-500">Shipping and taxes calculated at checkout.</p>

              <div className="space-y-2 pt-2">
                <button 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center block uppercase tracking-wider cursor-pointer"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="w-full py-2 text-xs text-gray-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-center"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
