import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useAuth } from '../context/AuthContext';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaTruck, 
  FaShieldAlt, 
  FaChevronRight, 
  FaLock, 
  FaShoppingBag
} from 'react-icons/fa';

const Checkout = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.totalAmount);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : '',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    orderNotes: '',
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'cod' | 'paypal'

  // Card details
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: user?.name || '',
    expiryDate: '',
    cvv: '',
  });

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Submission / Loading / Success States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Calculate pricing
  const subtotal = cartTotal;
  const discountAmount = subtotal * discountPercent;
  const shippingFee = shippingMethod === 'express' ? 15.00 : (subtotal > 50 ? 0 : 9.99);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    // Format card number nicely
    if (name === 'cardNumber') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 16);
      const matches = v.match(/\d{4,16}/g);
      const match = matches && matches[0] || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      setCardData((prev) => ({ ...prev, cardNumber: parts.length ? parts.join(' ') : value }));
    } else if (name === 'expiryDate') {
      const v = value.replace(/[^0-9]/g, '').slice(0, 4);
      if (v.length >= 3) {
        setCardData((prev) => ({ ...prev, expiryDate: `${v.slice(0, 2)}/${v.slice(2)}` }));
      } else {
        setCardData((prev) => ({ ...prev, expiryDate: v }));
      }
    } else if (name === 'cvv') {
      setCardData((prev) => ({ ...prev, cvv: value.replace(/[^0-9]/g, '').slice(0, 4) }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'OREBI10' || couponCode.trim().toUpperCase() === 'DISCOUNT10') {
      setDiscountPercent(0.10);
      setCouponMsg('Success! 10% discount applied to your order.');
    } else if (couponCode.trim().toUpperCase() === 'OREBI20') {
      setDiscountPercent(0.20);
      setCouponMsg('Success! 20% discount applied to your order.');
    } else {
      setDiscountPercent(0);
      setCouponMsg('Invalid coupon code. Try "OREBI10".');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber.trim() || cardData.cardNumber.replace(/\s/g, '').length < 15) {
        errors.cardNumber = 'Valid 16-digit card number is required';
      }
      if (!cardData.cardHolder.trim()) errors.cardHolder = 'Cardholder name is required';
      if (!cardData.expiryDate.trim() || cardData.expiryDate.length < 5) errors.expiryDate = 'MM/YY required';
      if (!cardData.cvv.trim() || cardData.cvv.length < 3) errors.cvv = 'CVC required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Add products to your cart before checking out.');
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement processing
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: [...cartItems],
        subtotal: subtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        total: totalAmount,
        shippingMethod: shippingMethod === 'express' ? 'Express Delivery' : 'Standard Delivery',
        paymentMethod: paymentMethod === 'card' 
          ? `Credit Card (ending in ${cardData.cardNumber.slice(-4) || '4242'})` 
          : (paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal / Online Wallet'),
      };

      // Save to localStorage history
      try {
        const existing = JSON.parse(localStorage.getItem('orebi_orders') || '[]');
        localStorage.setItem('orebi_orders', JSON.stringify([completedOrder, ...existing]));
      } catch {
        // ignore
      }

      // Clear the Redux cart
      dispatch(clearCart());
      setIsSubmitting(false);
      setOrderSuccess(completedOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // SUCCESS STATE VIEW
  if (orderSuccess) {
    return (
      <div className="py-16 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors min-h-screen">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Clean Checkmark and Order Placed banner */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                <FaCheckCircle className="text-4xl text-emerald-500 dark:text-emerald-400" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
                Payment & Order Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-zinc-100 mt-2">
                Order Placed!
              </h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
                Thank you for your purchase. We have received your order and are getting it ready for shipment.
              </p>
            </div>

            {/* Order Confirmation Card */}
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-200 dark:border-zinc-800">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Order Reference</span>
                  <p className="font-extrabold text-lg text-gray-900 dark:text-zinc-100">{orderSuccess.id}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Date & Time</span>
                  <p className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                    {orderSuccess.date} at {orderSuccess.time}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold">Status</span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded inline-block mt-0.5">
                    Processing
                  </p>
                </div>
              </div>

              {/* Delivery & Payment Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:border-zinc-800 text-xs">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 mb-2 flex items-center gap-1.5">
                    <FaTruck className="text-gray-500" /> Shipping Details
                  </h4>
                  <p className="font-semibold text-gray-800 dark:text-zinc-200">{orderSuccess.customer.name}</p>
                  <p className="text-gray-600 dark:text-zinc-400 mt-0.5">
                    {orderSuccess.shippingAddress.address}
                    {orderSuccess.shippingAddress.apartment && `, ${orderSuccess.shippingAddress.apartment}`}
                  </p>
                  <p className="text-gray-600 dark:text-zinc-400">
                    {orderSuccess.shippingAddress.city}, {orderSuccess.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-zinc-400">{orderSuccess.shippingAddress.country}</p>
                  <p className="text-gray-500 mt-2 font-medium">Method: {orderSuccess.shippingMethod}</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 mb-2 flex items-center gap-1.5">
                    <FaCreditCard className="text-gray-500" /> Payment & Contact
                  </h4>
                  <p className="text-gray-700 dark:text-zinc-300 font-semibold">{orderSuccess.paymentMethod}</p>
                  <p className="text-gray-600 dark:text-zinc-400 mt-1">Email: {orderSuccess.customer.email}</p>
                  <p className="text-gray-600 dark:text-zinc-400">Phone: {orderSuccess.customer.phone}</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                    ✓ Confirmation sent to your email
                  </p>
                </div>
              </div>

              {/* Items Purchased List */}
              <div className="pb-6 border-b border-gray-200 dark:border-zinc-800">
                <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 mb-3 flex items-center gap-1.5">
                  <FaShoppingBag className="text-gray-500" /> Items ({orderSuccess.items.length})
                </h4>
                <div className="space-y-3">
                  {orderSuccess.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-10 h-10 object-contain bg-white dark:bg-zinc-800 p-1 border border-gray-200 dark:border-zinc-700 rounded-xs" 
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-zinc-100 line-clamp-1">{item.name}</p>
                          <p className="text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-zinc-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>${orderSuccess.subtotal.toFixed(2)}</span>
                </div>
                {orderSuccess.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span>-${orderSuccess.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span>{orderSuccess.shippingFee === 0 ? 'FREE' : `$${orderSuccess.shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center text-base font-extrabold text-gray-900 dark:text-zinc-100 pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <span>Total Paid</span>
                  <span className="text-xl text-black dark:text-white">${orderSuccess.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity text-center"
              >
                Continue Shopping
              </Link>
              <Link
                to="/user"
                className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-center"
              >
                View Account & Orders
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // EMPTY CART CHECK
  if (cartItems.length === 0) {
    return (
      <div className="py-20 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors min-h-screen">
        <Container>
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm">
            <FaShoppingBag className="text-4xl text-gray-400 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Your cart is empty</h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2 mb-6">
              You must have at least one product in your cart before you can proceed to checkout.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 inline-block"
            >
              Return to Shop
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">Checkout</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <Link to="/cart" className="hover:underline">Cart</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Columns: Checkout Form */}
            <div className="lg:col-span-7 space-y-8">
              {/* Section 1: Customer Details */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                  <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs">1</span>
                    Customer Information
                  </h3>
                  {!isAuthenticated && (
                    <Link to="/user" className="text-xs text-gray-500 hover:text-black dark:hover:text-white underline">
                      Already have an account? Sign in
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                    />
                    {formErrors.firstName && <p className="text-[11px] text-red-500 mt-1">{formErrors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                    />
                    {formErrors.lastName && <p className="text-[11px] text-red-500 mt-1">{formErrors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.email ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                    />
                    {formErrors.email && <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                    />
                    {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Address */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm shadow-xs space-y-4">
                <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs">2</span>
                  Delivery Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your street address"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.address ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                    />
                    {formErrors.address && <p className="text-[11px] text-red-500 mt-1">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                      Apartment, suite, unit (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, or unit"
                      className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.city ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                      />
                      {formErrors.city && <p className="text-[11px] text-red-500 mt-1">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Your state or province"
                        className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Your postal code"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.postalCode ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                      />
                      {formErrors.postalCode && <p className="text-[11px] text-red-500 mt-1">{formErrors.postalCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Method Options */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-2">
                    Shipping Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800' : 'border-gray-200 dark:border-zinc-800'}`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-black dark:accent-white"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-zinc-100">Standard Delivery</p>
                          <p className="text-[10px] text-gray-400">3-5 business days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {subtotal > 50 ? 'FREE' : '$9.99'}
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-3.5 border rounded-xs cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800' : 'border-gray-200 dark:border-zinc-800'}`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-black dark:accent-white"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-zinc-100">Express Delivery</p>
                          <p className="text-[10px] text-gray-400">1-2 business days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-zinc-100">$15.00</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm shadow-xs space-y-4">
                <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 border rounded-xs flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === 'card' ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800 font-bold' : 'border-gray-200 dark:border-zinc-800 text-gray-500'}`}
                  >
                    <FaCreditCard className="text-lg" />
                    <span className="text-[11px]">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 border rounded-xs flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === 'cod' ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800 font-bold' : 'border-gray-200 dark:border-zinc-800 text-gray-500'}`}
                  >
                    <FaMoneyBillWave className="text-lg" />
                    <span className="text-[11px]">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-3 px-2 border rounded-xs flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === 'paypal' ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800 font-bold' : 'border-gray-200 dark:border-zinc-800 text-gray-500'}`}
                  >
                    <FaLock className="text-lg" />
                    <span className="text-[11px]">PayPal / Online</span>
                  </button>
                </div>

                {/* Credit Card Inputs */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="Enter card number"
                        maxLength="19"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                      />
                      {formErrors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardHolder"
                          value={cardData.cardHolder}
                          onChange={handleCardChange}
                          placeholder="Name on card"
                          className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.cardHolder ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                        />
                        {formErrors.cardHolder && <p className="text-[11px] text-red-500 mt-1">{formErrors.cardHolder}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                            Expiry *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={cardData.expiryDate}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.expiryDate ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                          />
                          {formErrors.expiryDate && <p className="text-[11px] text-red-500 mt-1">{formErrors.expiryDate}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                            CVV *
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="CVV"
                            maxLength="4"
                            className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border ${formErrors.cvv ? 'border-red-500' : 'border-gray-200 dark:border-zinc-700'} rounded-xs outline-none focus:border-black dark:focus:border-white transition-colors`}
                          />
                          {formErrors.cvv && <p className="text-[11px] text-red-500 mt-1">{formErrors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xs text-xs text-gray-600 dark:text-zinc-400 space-y-1">
                    <p className="font-bold text-gray-800 dark:text-zinc-200">Pay upon delivery</p>
                    <p>Have the exact cash ready when your package arrives at your delivery address.</p>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700 rounded-xs text-xs text-gray-600 dark:text-zinc-400 space-y-1">
                    <p className="font-bold text-gray-800 dark:text-zinc-200">Express Online Payment</p>
                    <p>You will be redirected securely to finalize your payment transaction.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Order Summary & Placement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm space-y-5 sticky top-28">
                <h3 className="font-bold text-base text-gray-900 dark:text-zinc-100 border-b border-gray-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-gray-500 font-normal">({cartItems.length} items)</span>
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 object-contain bg-white dark:bg-zinc-800 p-1 border border-gray-200 dark:border-zinc-700 rounded-xs flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-zinc-100 line-clamp-1">{item.name}</p>
                          <p className="text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-zinc-100 whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 outline-none uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-[11px] mt-1.5 font-medium ${discountPercent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                      {couponMsg}
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs pt-3 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Discount ({(discountPercent * 100)}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                    <span>Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span className="font-semibold text-gray-900 dark:text-zinc-100">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-base font-extrabold text-gray-900 dark:text-zinc-100 pt-3 border-t border-gray-200 dark:border-zinc-800">
                    <span>Total Amount</span>
                    <span className="text-xl">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <FaLock className="text-xs" />
                      <span>Place Order • ${totalAmount.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
                  <span className="flex items-center gap-1">
                    <FaShieldAlt /> 256-bit SSL Secure
                  </span>
                  <span>•</span>
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Checkout;
