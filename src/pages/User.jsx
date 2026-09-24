import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaShoppingBag, 
  FaHeart, 
  FaSignOutAlt, 
  FaChevronRight, 
  FaCheck, 
  FaBoxOpen, 
  FaShieldAlt, 
  FaMapMarkerAlt,
  FaKey
} from 'react-icons/fa';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';

const User = () => {
  const { user, login, register, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  // Tab state for non-logged-in view ('login' | 'register')
  const [authTab, setAuthTab] = useState('login');

  // Tab state for logged-in view ('profile' | 'orders' | 'wishlist' | 'addresses')
  const [accountTab, setAccountTab] = useState('profile');

  // Form states for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states for register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [notification, setNotification] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert('Please fill in both email and password.');
      return;
    }
    login(loginEmail, loginPassword);
    showNotification(`Welcome back, ${loginEmail.split('@')[0]}!`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert('Please fill in all required fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions.');
      return;
    }
    register(regName, regEmail, regPassword);
    showNotification(`Account created successfully! Welcome, ${regName}!`);
  };

  const handleDemoLogin = (email) => {
    login(email, 'demo1234');
    showNotification(`Logged in as demo user (${email})!`);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Mock Orders Data + Placed Orders
  const mockOrders = [
    {
      id: 'ORD-89214',
      date: '2026-09-02',
      status: 'Delivered',
      total: '$149.00',
      itemsCount: 3
    },
    {
      id: 'ORD-76410',
      date: '2026-08-20',
      status: 'Delivered',
      total: '$85.50',
      itemsCount: 2
    }
  ];

  const savedOrders = (() => {
    try {
      return JSON.parse(localStorage.getItem('orebi_orders') || '[]');
    } catch {
      return [];
    }
  })();

  const allOrders = [
    ...savedOrders.map(o => ({
      id: o.id,
      date: o.date,
      status: 'Processing',
      total: `$${typeof o.total === 'number' ? o.total.toFixed(2) : o.total}`,
      itemsCount: o.items?.length || 1
    })),
    ...mockOrders
  ];

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">User Account</span>
          </div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">
            {isAuthenticated ? `Welcome, ${user.name}` : 'My Account'}
          </h1>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-sm flex items-center gap-3 animate-fadeIn">
            <FaCheck className="text-emerald-600 text-base" />
            <span className="text-xs font-semibold">{notification}</span>
          </div>
        )}

        {/* LOGGED IN USER INTERFACE */}
        {isAuthenticated ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="space-y-2">
              <div className="p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm text-center mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-black dark:border-white p-0.5 bg-white dark:bg-zinc-800"
                />
                <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100">{user.name}</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">{user.email}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase rounded-full">
                  VIP Member
                </span>
              </div>

              <div className="space-y-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-2 rounded-sm">
                <button
                  onClick={() => setAccountTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
                    accountTab === 'profile'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <FaUser /> Profile Information
                </button>

                <button
                  onClick={() => setAccountTab('orders')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${
                    accountTab === 'orders'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaBoxOpen /> My Orders
                  </div>
                  <span className="text-[10px] bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 px-2 py-0.5 rounded-full">
                    {mockOrders.length}
                  </span>
                </button>

                <button
                  onClick={() => setAccountTab('wishlist')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${
                    accountTab === 'wishlist'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaHeart className="text-red-500" /> Saved Wishlist
                  </div>
                  <span className="text-[10px] bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 px-2 py-0.5 rounded-full">
                    {wishlistItems.length}
                  </span>
                </button>

                <button
                  onClick={() => setAccountTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${
                    accountTab === 'addresses'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <FaMapMarkerAlt /> Saved Addresses
                </button>

                <button
                  onClick={() => { logout(); navigate('/user'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors pt-2 border-t border-gray-100 dark:border-zinc-800"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </aside>

            {/* Main Tab Content */}
            <main className="lg:col-span-3">
              {/* Profile Details Tab */}
              {accountTab === 'profile' && (
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm space-y-6">
                  <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Personal Information</h2>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Manage your profile details and security.</p>
                    </div>
                    <button onClick={() => alert("Profile updated!")} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase">
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Full Name</span>
                      <p className="font-bold text-sm text-gray-900 dark:text-zinc-100 mt-1">{user.name}</p>
                    </div>

                    <div className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Email Address</span>
                      <p className="font-bold text-sm text-gray-900 dark:text-zinc-100 mt-1">{user.email}</p>
                    </div>

                    <div className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Account Status</span>
                      <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-1">Active & Verified</p>
                    </div>

                    <div className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Member Since</span>
                      <p className="font-bold text-sm text-gray-900 dark:text-zinc-100 mt-1">
                        {new Date(user.loggedInAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaKey className="text-gray-500 text-lg" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Security Password</h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">••••••••••••</p>
                      </div>
                    </div>
                    <button onClick={() => alert("Password reset link sent to " + user.email)} className="px-3 py-1.5 border border-gray-300 dark:border-zinc-700 text-xs font-semibold text-gray-800 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800">
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {accountTab === 'orders' && (
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm space-y-6">
                  <div className="border-b border-gray-200 dark:border-zinc-800 pb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Order History</h2>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">View and track your previous orders.</p>
                  </div>

                  <div className="space-y-4">
                    {allOrders.map((order) => (
                      <div key={order.id} className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900 dark:text-zinc-100">{order.id}</span>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                            Placed on {order.date} • {order.itemsCount} Items
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="font-extrabold text-base text-gray-900 dark:text-zinc-100">{order.total}</span>
                          <button onClick={() => alert(`Invoice for ${order.id} downloaded!`)} className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold">
                            View Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {accountTab === 'wishlist' && (
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm space-y-6">
                  <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Saved Wishlist Items ({wishlistItems.length})</h2>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Quick access to products you saved.</p>
                    </div>
                    <Link to="/wishlist" className="text-xs font-bold underline">
                      View Full Wishlist Page →
                    </Link>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-10 text-xs text-gray-500">
                      No saved items in wishlist yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm flex gap-3 items-center">
                          <img src={item.img} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 dark:bg-zinc-900 p-1" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs truncate text-gray-900 dark:text-zinc-100">{item.name || item.title}</h4>
                            <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300 mt-0.5">${item.price.toFixed(2)}</p>
                            <button
                              onClick={() => {
                                dispatch(addToCart(item));
                                dispatch(removeFromWishlist(item.id));
                              }}
                              className="text-[11px] text-black dark:text-white font-bold underline mt-1 block"
                            >
                              + Move to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {accountTab === 'addresses' && (
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm space-y-6">
                  <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Saved Delivery Addresses</h2>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Manage shipping addresses for faster checkout.</p>
                    </div>
                    <button onClick={() => alert("Add address form demo")} className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase">
                      + Add New Address
                    </button>
                  </div>

                  <div className="p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase rounded">
                          Default Address
                        </span>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 mt-2">{user.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                          575 Crescent Ave.<br />
                          Quakertown, PA 18951<br />
                          United States
                        </p>
                      </div>
                      <button onClick={() => alert("Edit address demo")} className="text-xs font-semibold underline">Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        ) : (
          /* NON-LOGGED IN USER INTERFACE: TABBED LOGIN / SIGN UP */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-sm">
              {/* Tab Selector */}
              <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-6">
                <button
                  onClick={() => setAuthTab('login')}
                  className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                    authTab === 'login'
                      ? 'border-black text-black dark:border-white dark:text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-zinc-300'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthTab('register')}
                  className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
                    authTab === 'register'
                      ? 'border-black text-black dark:border-white dark:text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-zinc-300'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Login Form Tab */}
              {authTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-zinc-400">
                      <input type="checkbox" defaultChecked className="accent-black" />
                      <span>Remember me</span>
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset email sent!"); }} className="text-gray-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Sign In
                  </button>

                  {/* Quick Demo Logins */}
                  <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                    <p className="text-xs text-center text-gray-500 dark:text-zinc-400">Or sign in instantly with demo accounts:</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDemoLogin('alex@orebi.com')}
                        className="flex-1 py-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100"
                      >
                        Demo User
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoLogin('admin@orebi.com')}
                        className="flex-1 py-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100"
                      >
                        Demo Admin
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Register Form Tab */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                      />
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-zinc-400 pt-1">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="accent-black"
                    />
                    <span>I agree to the Terms & Privacy Policy</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Create Account
                  </button>
                </form>
              )}
            </div>

            {/* Why Join Orebi Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-zinc-100">Why Create an Account?</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                  Join Orebi to enjoy a seamless shopping experience and exclusive member privileges.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full mt-0.5">
                      <FaBoxOpen className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Live Order Tracking</h4>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Track shipment status and order history effortlessly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full mt-0.5">
                      <FaHeart className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Wishlist Synchronization</h4>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Save items across all your mobile and desktop devices.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-full mt-0.5">
                      <FaShieldAlt className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Express Checkout</h4>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">Save addresses for 1-click speed checkout.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default User;
