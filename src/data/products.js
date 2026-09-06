import productone from '/src/assets/productone.png';
import producttwo from '/src/assets/producttwo.png';
import productthree from '/src/assets/productthree.png';
import productfour from '/src/assets/productfour.png';
import productoneb from '/src/assets/productoneb.png';
import producttwob from '/src/assets/producttwob.png';
import productthreeb from '/src/assets/productthreeb.png';
import productfourb from '/src/assets/productfourb.png';
import productoneso from '/src/assets/productoneso.png';
import producttwoso from '/src/assets/producttwoso.png';
import productthreeso from '/src/assets/productthreeso.png';
import productfourso from '/src/assets/productfourso.png';

export const categoriesList = [
  "All Categories",
  "Electronics & Office",
  "Backpacks & Bags",
  "Shoes & Heels",
  "Men's Wear",
  "Women's Wear",
  "Kid's Wear",
  "Health & Beauty",
  "Home & Living",
  "Accessories & Jewellery"
];

export const brandsList = [
  "All Brands",
  "Orebi",
  "Nike",
  "Apple",
  "Sony",
  "Adidas",
  "Zara",
  "Casio",
  "Fossil"
];

export const colorsList = [
  "All Colors",
  "Black",
  "White",
  "Blue",
  "Gray",
  "Red",
  "Green",
  "Brown"
];

export const products = [
  {
    id: "p1",
    name: "Basic Crew Neck Tee",
    price: 44.00,
    originalPrice: 55.00,
    category: "Men's Wear",
    brand: "Orebi",
    color: "Black",
    rating: 4.8,
    reviewCount: 42,
    stock: 25,
    badge: "New",
    isNewArrival: true,
    isBestseller: false,
    isSpecialOffer: false,
    img: productone,
    gallery: [
      productone,
      producttwo,
      productthree,
      productfour
    ],
    description: "Essential minimalist black crew neck t-shirt crafted from 100% premium combed cotton. Perfect for daily casual wear, layering, or lightweight performance. Features double-stitched hems and a tailored fit.",
    features: [
      "100% Organic Combed Cotton",
      "Breathable and ultra-soft fabric",
      "Pre-shrunk fabric to prevent shrinking",
      "Tagless neck label for maximum comfort"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Fit Type": "Regular Fit",
      "Care Instructions": "Machine Wash Cold",
      "Country of Origin": "Designed in USA"
    }
  },
  {
    id: "p2",
    name: "Minimalist Desk Clock & Timer",
    price: 35.00,
    originalPrice: 45.00,
    category: "Home & Living",
    brand: "Orebi",
    color: "Black",
    rating: 4.6,
    reviewCount: 28,
    stock: 15,
    badge: "15% OFF",
    isNewArrival: true,
    isBestseller: false,
    isSpecialOffer: true,
    img: producttwo,
    gallery: [
      producttwo,
      productone,
      productthree,
      productfour
    ],
    description: "Sleek table clock with an elegant matte black finish. Keeps silent precise time while adding a sophisticated modern touch to your workspace or nightstand.",
    features: [
      "Silent quartz sweep movement",
      "Matte finish aluminum casing",
      "Runs on 1 AA battery (included)",
      "Compact lightweight design"
    ],
    specifications: {
      "Material": "Aluminum & Glass",
      "Dimensions": "12cm x 12cm x 4cm",
      "Movement": "Quartz",
      "Warranty": "1 Year Limited"
    }
  },
  {
    id: "p3",
    name: "Smart Ceramic Coffee Mug",
    price: 25.00,
    originalPrice: 30.00,
    category: "Home & Living",
    brand: "Orebi",
    color: "Gray",
    rating: 4.9,
    reviewCount: 64,
    stock: 40,
    badge: "Bestseller",
    isNewArrival: true,
    isBestseller: true,
    isSpecialOffer: false,
    img: productthree,
    gallery: [
      productthree,
      productone,
      producttwo,
      productfour
    ],
    description: "Ergonomically designed ceramic mug crafted for coffee and tea connoisseurs. Retains beverage temperature longer with double-wall heat retention.",
    features: [
      "Premium lead-free ceramic",
      "Comfortable wide grip handle",
      "Microwave and dishwasher safe",
      "350ml optimal capacity"
    ],
    specifications: {
      "Capacity": "350 ml / 12 oz",
      "Material": "High-fired Ceramic",
      "Dishwasher Safe": "Yes",
      "Microwave Safe": "Yes"
    }
  },
  {
    id: "p4",
    name: "Nordic Minimal Table Lamp",
    price: 80.00,
    originalPrice: 100.00,
    category: "Home & Living",
    brand: "Orebi",
    color: "White",
    rating: 4.7,
    reviewCount: 19,
    stock: 12,
    badge: "20% OFF",
    isNewArrival: true,
    isBestseller: false,
    isSpecialOffer: true,
    img: productfour,
    gallery: [
      productfour,
      productone,
      producttwo,
      productthree
    ],
    description: "Sculptural table lamp inspired by modern Scandinavian design. Provides warm ambient lighting with touch dimmer controls.",
    features: [
      "Integrated dimmable LED bulb",
      "Touch sensor brightness adjustment",
      "Energy efficient power consumption",
      "Matte white acrylic shade"
    ],
    specifications: {
      "Power Source": "Plug-in AC 110-240V",
      "Light Color": "Warm White (3000K)",
      "Height": "40 cm",
      "Warranty": "2 Years"
    }
  },
  {
    id: "p5",
    name: "Canvas Utility Backpack",
    price: 65.00,
    originalPrice: 85.00,
    category: "Backpacks & Bags",
    brand: "Orebi",
    color: "Black",
    rating: 4.9,
    reviewCount: 88,
    stock: 30,
    badge: "Hot",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: false,
    img: productoneb,
    gallery: [
      productoneb,
      producttwob,
      productthreeb,
      productfourb
    ],
    description: "Durable water-resistant canvas backpack equipped with padded laptop compartment, organized interior pockets, and ergonomic shoulder straps.",
    features: [
      "Fits up to 15.6-inch laptop",
      "Heavy-duty water-repellent canvas",
      "Padded mesh airflow back panel",
      "Anti-theft hidden back pocket"
    ],
    specifications: {
      "Capacity": "22 Liters",
      "Laptop Sleeve": "Up to 15.6\"",
      "Weight": "0.85 kg",
      "Material": "Waxed Canvas & Leather"
    }
  },
  {
    id: "p6",
    name: "Classic Leather Wristwatch",
    price: 120.00,
    originalPrice: 150.00,
    category: "Accessories & Jewellery",
    brand: "Casio",
    color: "Brown",
    rating: 4.8,
    reviewCount: 52,
    stock: 18,
    badge: "New",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: false,
    img: producttwob,
    gallery: [
      producttwob,
      productoneb,
      productthreeb,
      productfourb
    ],
    description: "Timeless analog watch featuring a genuine Italian leather strap, stainless steel case, and scratch-resistant mineral crystal glass.",
    features: [
      "Japanese quartz three-hand movement",
      "Water resistant to 30 meters (3 ATM)",
      "Genuine full-grain leather strap",
      "Polished stainless steel bezel"
    ],
    specifications: {
      "Case Size": "40 mm",
      "Strap Width": "20 mm",
      "Water Resistance": "30m",
      "Warranty": "2 Years International"
    }
  },
  {
    id: "p7",
    name: "Retro Style Sunglasses",
    price: 49.00,
    originalPrice: 60.00,
    category: "Accessories & Jewellery",
    brand: "Fossil",
    color: "Black",
    rating: 4.5,
    reviewCount: 34,
    stock: 22,
    badge: "Sale",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: true,
    img: productthreeb,
    gallery: [
      productthreeb,
      productoneb,
      producttwob,
      productfourb
    ],
    description: "Iconic square frame sunglasses with UV400 polarized lenses that eliminate glare and provide crisp optical clarity.",
    features: [
      "100% UV400 Protection (UVA/UVB)",
      "Polarized HD glare-reducing lenses",
      "Lightweight acetate frame construction",
      "Includes microfiber cleaning pouch"
    ],
    specifications: {
      "Lens Width": "54 mm",
      "Bridge Width": "18 mm",
      "Temple Length": "145 mm",
      "Frame Material": "Premium Acetate"
    }
  },
  {
    id: "p8",
    name: "Modern Over-Ear Headphones",
    price: 150.00,
    originalPrice: 199.00,
    category: "Electronics & Office",
    brand: "Sony",
    color: "Black",
    rating: 4.9,
    reviewCount: 110,
    stock: 14,
    badge: "Bestseller",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: false,
    img: productfourb,
    gallery: [
      productfourb,
      productoneb,
      producttwob,
      productthreeb
    ],
    description: "Wireless over-ear headphones featuring active noise cancellation, deep bass acoustic tuning, and up to 35 hours of battery life.",
    features: [
      "Active Noise Cancellation (ANC)",
      "Bluetooth 5.2 seamless connection",
      "Ultra-soft memory foam ear cushions",
      "35-hour extended battery playtime"
    ],
    specifications: {
      "Battery Life": "Up to 35 Hours",
      "Charging Port": "USB Type-C",
      "Weight": "250g",
      "Driver Size": "40mm Dynamic"
    }
  },
  {
    id: "p9",
    name: "Lightweight Runner Sneakers",
    price: 95.00,
    originalPrice: 120.00,
    category: "Shoes & Heels",
    brand: "Nike",
    color: "White",
    rating: 4.7,
    reviewCount: 76,
    stock: 20,
    badge: "Special",
    isNewArrival: false,
    isBestseller: false,
    isSpecialOffer: true,
    img: productoneso,
    gallery: [
      productoneso,
      producttwoso,
      productthreeso,
      productfourso
    ],
    description: "Responsive running shoes designed with breathable flyknit mesh uppers and cushioned impact-absorbing midsoles.",
    features: [
      "Breathable engineered mesh upper",
      "Cushioned EVA foam midsole",
      "Durable rubber outsole with high traction",
      "Lightweight athletic construction"
    ],
    specifications: {
      "Closure": "Lace-Up",
      "Shoe Width": "Medium (D)",
      "Sole Material": "Rubber",
      "Activity": "Running / Gym"
    }
  },
  {
    id: "p10",
    name: "Minimalist Leather Tote Bag",
    price: 110.00,
    originalPrice: 140.00,
    category: "Backpacks & Bags",
    brand: "Zara",
    color: "Brown",
    rating: 4.8,
    reviewCount: 45,
    stock: 16,
    badge: "Sale",
    isNewArrival: false,
    isBestseller: false,
    isSpecialOffer: true,
    img: producttwoso,
    gallery: [
      producttwoso,
      productoneso,
      productthreeso,
      productfourso
    ],
    description: "Versatile everyday tote bag made from soft supple vegan leather. Features a spacious main compartment with zippered interior pocket.",
    features: [
      "Premium eco-friendly vegan leather",
      "Reinforced dual shoulder handles",
      "Magnetic snap closure + zipper pocket",
      "Fits 13-inch MacBook or tablet"
    ],
    specifications: {
      "Dimensions": "38cm x 30cm x 12cm",
      "Material": "PU Vegan Leather",
      "Drop Handle": "24 cm",
      "Color": "Tan / Warm Brown"
    }
  },
  {
    id: "p11",
    name: "Ergonomic Office Chair Cushion",
    price: 40.00,
    originalPrice: 50.00,
    category: "Electronics & Office",
    brand: "Orebi",
    color: "Gray",
    rating: 4.6,
    reviewCount: 31,
    stock: 25,
    badge: "20% OFF",
    isNewArrival: false,
    isBestseller: false,
    isSpecialOffer: true,
    img: productthreeso,
    gallery: [
      productthreeso,
      productoneso,
      producttwoso,
      productfourso
    ],
    description: "High-density memory foam seat cushion designed to relieve lower back pain, improve posture, and provide all-day comfort.",
    features: [
      "100% Pure Memory Foam core",
      "U-shaped ergonomic tailbone cutout",
      "Non-slip rubberized bottom surface",
      "Removable washable velour cover"
    ],
    specifications: {
      "Cover Material": "Washable Plush Velour",
      "Filling": "High-Density Memory Foam",
      "Dimensions": "45cm x 35cm x 7cm",
      "Weight Capacity": "Tested to 120 kg"
    }
  },
  {
    id: "p12",
    name: "Minimalist Wireless Keyboard",
    price: 75.00,
    originalPrice: 90.00,
    category: "Electronics & Office",
    brand: "Apple",
    color: "White",
    rating: 4.9,
    reviewCount: 94,
    stock: 28,
    badge: "Hot",
    isNewArrival: false,
    isBestseller: false,
    isSpecialOffer: true,
    img: productfourso,
    gallery: [
      productfourso,
      productoneso,
      producttwoso,
      productthreeso
    ],
    description: "Ultra-slim Bluetooth wireless keyboard with low-profile scissor keys, rechargeable battery, and multi-device quick pairing.",
    features: [
      "Sleek aluminum frame construction",
      "Multi-device pairing (up to 3 devices)",
      "Rechargeable USB-C lithium battery",
      "Quiet scissor-switch keys"
    ],
    specifications: {
      "Connection": "Bluetooth 5.0 / 2.4GHz",
      "Battery Life": "Up to 3 Months per charge",
      "Compatibility": "Windows, macOS, iOS, Android",
      "Layout": "Compact 75%"
    }
  },
  {
    id: "p13",
    name: "Women's Casual Linen Shirt",
    price: 52.00,
    originalPrice: 65.00,
    category: "Women's Wear",
    brand: "Zara",
    color: "White",
    rating: 4.7,
    reviewCount: 39,
    stock: 18,
    badge: "New",
    isNewArrival: true,
    isBestseller: false,
    isSpecialOffer: false,
    img: productone,
    gallery: [productone, producttwo, productthree, productfour],
    description: "Relaxed fit button-up shirt crafted from 100% natural pure linen. Lightweight, breathable, and styled for easy summer elegance.",
    features: [
      "100% Pure Natural Linen",
      "Breathable moisture-wicking weave",
      "Relaxed oversized silhouette",
      "Mother-of-pearl style buttons"
    ],
    specifications: {
      "Material": "100% Linen",
      "Fit": "Relaxed Fit",
      "Care": "Hand Wash or Delicate Cycle"
    }
  },
  {
    id: "p14",
    name: "Organic Hydrating Face Serum",
    price: 38.00,
    originalPrice: 48.00,
    category: "Health & Beauty",
    brand: "Orebi",
    color: "White",
    rating: 4.9,
    reviewCount: 67,
    stock: 35,
    badge: "Top Rated",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: false,
    img: productthree,
    gallery: [productthree, productone, producttwo, productfour],
    description: "Nourishing facial serum infused with Hyaluronic Acid and Vitamin C for intense hydration, firm skin elasticity, and natural radiance.",
    features: [
      "Pure Hyaluronic Acid + Niacinamide",
      "Cruelty-free, vegan & paraben-free",
      "Non-greasy rapid absorption formula",
      "Suitable for all skin types"
    ],
    specifications: {
      "Volume": "50 ml / 1.7 fl oz",
      "Skin Type": "All Skin Types",
      "Origin": "Made in USA"
    }
  },
  {
    id: "p15",
    name: "Kid's Denim Jacket & Hoodie",
    price: 42.00,
    originalPrice: 50.00,
    category: "Kid's Wear",
    brand: "Adidas",
    color: "Blue",
    rating: 4.6,
    reviewCount: 22,
    stock: 14,
    badge: "New",
    isNewArrival: true,
    isBestseller: false,
    isSpecialOffer: false,
    img: productfour,
    gallery: [productfour, productone, producttwo, productthree],
    description: "Trendy 2-in-1 denim jacket for kids featuring a soft fleece hood and sleeves for extra warmth and casual streetwear style.",
    features: [
      "Durable cotton denim body",
      "Soft cotton-blend hoodie sleeves",
      "Button front closure + chest pockets",
      "Machine washable and durable"
    ],
    specifications: {
      "Age Group": "4-12 Years",
      "Material": "80% Cotton, 20% Polyester",
      "Care": "Machine Wash Warm"
    }
  },
  {
    id: "p16",
    name: "Leather Block Heel Pumps",
    price: 88.00,
    originalPrice: 110.00,
    category: "Shoes & Heels",
    brand: "Zara",
    color: "Black",
    rating: 4.8,
    reviewCount: 41,
    stock: 16,
    badge: "Popular",
    isNewArrival: false,
    isBestseller: true,
    isSpecialOffer: false,
    img: producttwob,
    gallery: [producttwob, productoneb, productthreeb, productfourb],
    description: "Chic mid-height block heels featuring soft padded footbeds and square toe design. Perfect for office hours and evening outings.",
    features: [
      "Genuine leather upper",
      "5cm sturdy comfortable block heel",
      "Cushioned memory foam insole",
      "Non-slip rubber sole"
    ],
    specifications: {
      "Heel Height": "5 cm (2 inches)",
      "Toe Shape": "Square Toe",
      "Upper Material": "Leather"
    }
  }
];
