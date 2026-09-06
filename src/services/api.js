import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalize DummyJSON product data structure to fit our store components
export const formatProduct = (item) => {
  if (!item) return null;

  const originalPrice = item.discountPercentage 
    ? +(item.price * (1 + item.discountPercentage / 100)).toFixed(2)
    : +(item.price * 1.2).toFixed(2);

  // Capitalize category name for display
  const categoryFormatted = typeof item.category === 'string'
    ? item.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'General';

  return {
    id: String(item.id),
    name: item.title,
    title: item.title,
    price: item.price,
    originalPrice: originalPrice,
    discountPercentage: item.discountPercentage || 0,
    category: categoryFormatted,
    rawCategory: item.category,
    brand: item.brand || 'Orebi',
    color: item.color || 'Standard',
    rating: item.rating || 4.5,
    reviewCount: item.reviews ? item.reviews.length : Math.floor(Math.random() * 50) + 10,
    stock: item.stock ?? 20,
    badge: item.discountPercentage > 15 ? `${Math.round(item.discountPercentage)}% OFF` : (item.rating > 4.5 ? 'Bestseller' : 'New'),
    img: item.thumbnail || (item.images && item.images[0]) || '',
    gallery: item.images && item.images.length > 0 ? item.images : [item.thumbnail],
    description: item.description || 'Premium quality product crafted for excellence and everyday utility.',
    features: [
      `Brand: ${item.brand || 'Orebi Signature'}`,
      `Category: ${categoryFormatted}`,
      `Customer Rating: ${item.rating || 4.5} / 5`,
      `Warranty: 1 Year Manufacturer Warranty`,
      `Return Policy: 30-Day Easy Returns`
    ],
    specifications: {
      "SKU": item.sku || `SKU-${item.id}`,
      "Weight": item.weight ? `${item.weight} kg` : "0.5 kg",
      "Dimensions": item.dimensions ? `${item.dimensions.width}x${item.dimensions.height}x${item.dimensions.depth} cm` : "10x10x5 cm",
      "Shipping": item.shippingInformation || "Ships in 1-2 business days",
      "Availability": item.availabilityStatus || "In Stock"
    }
  };
};

// Fetch All Products with optional pagination
export const fetchProducts = async (limit = 30, skip = 0) => {
  try {
    const response = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);
    const formatted = response.data.products.map(formatProduct);
    return {
      products: formatted,
      total: response.data.total,
      limit: response.data.limit,
      skip: response.data.skip
    };
  } catch (error) {
    console.error('Error fetching products from DummyJSON:', error);
    throw error;
  }
};

// Fetch Product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return formatProduct(response.data);
  } catch (error) {
    console.error(`Error fetching product ID ${id}:`, error);
    throw error;
  }
};

// Search Products
export const searchProducts = async (query) => {
  if (!query || query.trim() === '') return [];
  try {
    const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data.products.map(formatProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Fetch Categories List
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/products/category-list');
    const rawCategories = response.data;
    // Format categories to Title Case
    const formatted = rawCategories.map(cat => ({
      slug: cat,
      name: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }));
    return [{ slug: 'all', name: 'All Categories' }, ...formatted];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [
      { slug: 'all', name: 'All Categories' },
      { slug: 'beauty', name: 'Beauty' },
      { slug: 'fragrances', name: 'Fragrances' },
      { slug: 'furniture', name: 'Furniture' },
      { slug: 'groceries', name: 'Groceries' },
      { slug: 'home-decoration', name: 'Home Decoration' },
      { slug: 'kitchen-accessories', name: 'Kitchen Accessories' },
      { slug: 'laptops', name: 'Laptops' },
      { slug: 'mens-shirts', name: "Men's Shirts" },
      { slug: 'mens-shoes', name: "Men's Shoes" },
      { slug: 'mens-watches', name: "Men's Watches" },
      { slug: 'womens-bags', name: "Women's Bags" },
      { slug: 'womens-dresses', name: "Women's Dresses" },
      { slug: 'womens-jewellery', name: "Women's Jewellery" }
    ];
  }
};

// Fetch Products by Category
export const fetchProductsByCategory = async (categorySlug) => {
  if (categorySlug === 'all' || !categorySlug) {
    const res = await fetchProducts(30);
    return res.products;
  }
  try {
    const response = await apiClient.get(`/products/category/${categorySlug}`);
    return response.data.products.map(formatProduct);
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
};
