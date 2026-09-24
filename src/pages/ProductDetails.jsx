import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Product from '../common/Product';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { toggleCompare } from '../features/compare/compareSlice';
import { 
  FaStar, 
  FaHeart, 
  FaExchangeAlt, 
  FaTruck, 
  FaShieldAlt, 
  FaSync, 
  FaChevronRight, 
  FaMinus, 
  FaPlus,
  FaCheck,
  FaSearchPlus,
  FaSpinner
} from 'react-icons/fa';

const ProductDetails = ({ onOpenCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare?.items || []);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImg, setSelectedImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToast, setAddedToast] = useState(false);

  // Zoom lens effect state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Fetch product from API on ID change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    window.scrollTo(0, 0);

    fetchProductById(id)
      .then(data => {
        if (isMounted) {
          setProduct(data);
          setSelectedImg(data.img);
          setSelectedColor(data.color || 'Standard');
          setQuantity(1);

          // Load related products
          if (data.rawCategory) {
            fetchProductsByCategory(data.rawCategory).then(rel => {
              if (isMounted) {
                setRelatedProducts(rel.filter(p => String(p.id) !== String(id)).slice(0, 4));
              }
            }).catch(() => {});
          }
        }
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center min-h-screen bg-white dark:bg-zinc-950">
        <FaSpinner className="animate-spin text-3xl text-gray-500 mx-auto mb-3" />
        <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          Fetching product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center min-h-screen bg-white dark:bg-zinc-950">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Product Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold text-xs uppercase">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some(item => String(item.id) === String(product.id));
  const isInCompare = compareItems.some(item => String(item.id) === String(product.id));

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: selectedImg || product.img,
      color: selectedColor,
      quantity: quantity
    }));
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (onOpenCart) onOpenCart();
  };

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mb-8">
          <Link to="/" className="hover:underline">Home</Link>
          <FaChevronRight className="text-[9px]" />
          <Link to="/shop" className="hover:underline">Shop</Link>
          <FaChevronRight className="text-[9px]" />
          <span className="hover:underline cursor-pointer" onClick={() => navigate(`/shop?category=${product.rawCategory}`)}>
            {product.category}
          </span>
          <FaChevronRight className="text-[9px]" />
          <span className="font-semibold text-black dark:text-white line-clamp-1">{product.name}</span>
        </div>

        {/* Top Details Section: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery with Interactive Hover Zoom */}
          <div className="space-y-4">
            <div 
              ref={imageContainerRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="relative bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm overflow-hidden aspect-square flex items-center justify-center p-4 cursor-crosshair group"
            >
              <img 
                src={selectedImg || product.img} 
                alt={product.name} 
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Hover Zoom Lens Effect */}
              {isZooming && (
                <div 
                  className="absolute inset-0 z-20 pointer-events-none border border-gray-400 bg-no-repeat shadow-2xl transition-opacity duration-150"
                  style={{
                    backgroundImage: `url(${selectedImg || product.img})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '250%'
                  }}
                />
              )}

              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <FaSearchPlus />
                <span>Hover to Zoom</span>
              </div>

              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails Gallery */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(imgUrl)}
                    className={`w-20 h-20 p-1 border rounded-sm bg-gray-50 dark:bg-zinc-900 flex-shrink-0 transition-all ${
                      selectedImg === imgUrl 
                        ? 'border-black dark:border-white ring-2 ring-black dark:ring-white ring-offset-1' 
                        : 'border-gray-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information Panel */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-1">
                {product.brand} • {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-zinc-700'} />
                  ))}
                  <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 ml-1">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-300 dark:text-zinc-700">|</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded">
                  In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Price Banner */}
            <div className="flex items-baseline gap-3 p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-zinc-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 px-2 py-0.5 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description Excerpt */}
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-xs font-bold uppercase text-gray-700 dark:text-zinc-300">Quantity:</label>
                <div className="flex items-center border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="px-5 font-bold text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>

                {addedToast && (
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 animate-fadeIn">
                    <FaCheck /> Added {quantity} item(s) to cart!
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-center"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Wishlist / Compare */}
              <div className="flex items-center gap-6 pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-600 dark:text-zinc-400">
                <button 
                  onClick={() => dispatch(toggleWishlist(product))}
                  className={`flex items-center gap-1.5 font-medium transition-colors ${isInWishlist ? 'text-red-500 font-bold' : 'hover:text-black dark:hover:text-white'}`}
                >
                  <FaHeart className={isInWishlist ? 'text-red-500' : ''} />
                  <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button 
                  onClick={() => dispatch(toggleCompare(product))} 
                  className={`flex items-center gap-1.5 font-medium transition-colors ${isInCompare ? 'text-black dark:text-white font-bold' : 'hover:text-black dark:hover:text-white'}`}
                >
                  <FaExchangeAlt className={isInCompare ? 'rotate-180 transition-transform' : ''} />
                  <span>{isInCompare ? 'In Compare' : 'Compare Product'}</span>
                </button>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm text-center">
              <div className="space-y-1">
                <FaTruck className="mx-auto text-lg text-gray-700 dark:text-zinc-300" />
                <p className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">Free Express Delivery</p>
                <p className="text-[10px] text-gray-500">Orders over $50</p>
              </div>
              <div className="space-y-1 border-x border-gray-200 dark:border-zinc-800">
                <FaShieldAlt className="mx-auto text-lg text-gray-700 dark:text-zinc-300" />
                <p className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">2-Year Warranty</p>
                <p className="text-[10px] text-gray-500">100% Genuine guarantee</p>
              </div>
              <div className="space-y-1">
                <FaSync className="mx-auto text-lg text-gray-700 dark:text-zinc-300" />
                <p className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">30-Day Easy Return</p>
                <p className="text-[10px] text-gray-500">Hassle-free refunds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Specifications, Reviews */}
        <div className="mt-16 border-t border-gray-200 dark:border-zinc-800 pt-10">
          <div className="flex border-b border-gray-200 dark:border-zinc-800 space-x-8 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`pb-4 text-sm font-bold capitalize transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tabKey
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'
                }`}
              >
                {tabKey === 'reviews' ? `Customer Reviews (${product.reviewCount})` : tabKey}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6 max-w-3xl text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                <p>{product.description}</p>
                {product.features && (
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-3 text-base">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {product.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <table className="w-full text-sm text-left border border-gray-200 dark:border-zinc-800">
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                      <td className="p-3 font-semibold text-gray-800 dark:text-zinc-200">Brand</td>
                      <td className="p-3 text-gray-600 dark:text-zinc-400">{product.brand}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-zinc-800">
                      <td className="p-3 font-semibold text-gray-800 dark:text-zinc-200">Category</td>
                      <td className="p-3 text-gray-600 dark:text-zinc-400">{product.category}</td>
                    </tr>
                    {product.specifications && Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={`border-b border-gray-200 dark:border-zinc-800 ${idx % 2 === 1 ? 'bg-gray-50 dark:bg-zinc-900' : ''}`}>
                        <td className="p-3 font-semibold text-gray-800 dark:text-zinc-200">{key}</td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-sm flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-zinc-100">{product.rating}</span>
                    <div className="flex text-amber-400 mt-1 justify-center text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-zinc-800 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-gray-900 dark:text-zinc-100">Alex M.</h5>
                      <span className="text-xs text-gray-400">Verified Buyer • 2 days ago</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300">
                      Exceptional quality! The fit and craftsmanship exceeded my expectations. Fast shipping as well.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-200 dark:border-zinc-800 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Product key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
