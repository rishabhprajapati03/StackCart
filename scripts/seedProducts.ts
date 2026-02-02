/**
 * ONE-TIME PRODUCT SEEDING SCRIPT
 * 
 * WARNING: This script is disposable and should be deleted after use.
 * 
 * Usage:
 * 1. Ensure .env file has Firebase config
 * 2. Seed categories FIRST using seedCategories.ts
 * 3. Temporarily modify firestore.rules to allow product writes
 * 4. Run: npx ts-node -r dotenv/config scripts/seedProducts.ts
 * 5. Restore firestore.rules (products read-only)
 * 6. Delete this script after seeding
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Product data with categoryId
const products = [
  {
    title: "Classic Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt perfect for everyday wear.",
    price: 499,
    images: [
      "https://picsum.photos/seed/tshirt-1/800/800",
      "https://picsum.photos/seed/tshirt-2/800/800",
      "https://picsum.photos/seed/tshirt-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "t-shirts",
  },
  {
    title: "Oversized Streetwear T-Shirt",
    description: "Relaxed fit oversized tee for daily streetwear style.",
    price: 699,
    images: [
      "https://picsum.photos/seed/oversized-tee-1/800/800",
      "https://picsum.photos/seed/oversized-tee-2/800/800",
      "https://picsum.photos/seed/oversized-tee-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    categoryId: "t-shirts",
  },
  {
    title: "Formal White Shirt",
    description: "Crisp formal shirt for office, meetings, and occasions.",
    price: 899,
    images: [
      "https://picsum.photos/seed/formal-shirt-1/800/800",
      "https://picsum.photos/seed/formal-shirt-2/800/800",
      "https://picsum.photos/seed/formal-shirt-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "shirts",
  },
  {
    title: "Casual Linen Shirt",
    description: "Breathable linen shirt for summer comfort and style.",
    price: 1099,
    images: [
      "https://picsum.photos/seed/linen-shirt-1/800/800",
      "https://picsum.photos/seed/linen-shirt-2/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "shirts",
  },
  {
    title: "Slim Fit Denim Jeans",
    description: "Slim-fit denim jeans with stretch for all-day comfort.",
    price: 1299,
    images: [
      "https://picsum.photos/seed/jeans-1/800/800",
      "https://picsum.photos/seed/jeans-2/800/800",
      "https://picsum.photos/seed/jeans-3/800/800",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    categoryId: "jeans",
  },
  {
    title: "Straight Fit Jeans",
    description: "Classic straight fit jeans, durable and versatile.",
    price: 1399,
    images: [
      "https://picsum.photos/seed/straight-jeans-1/800/800",
      "https://picsum.photos/seed/straight-jeans-2/800/800",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    categoryId: "jeans",
  },
  {
    title: "Everyday Chino Pants",
    description: "Smart casual chinos for work and weekend outfits.",
    price: 1199,
    images: [
      "https://picsum.photos/seed/chinos-1/800/800",
      "https://picsum.photos/seed/chinos-2/800/800",
      "https://picsum.photos/seed/chinos-3/800/800",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    categoryId: "trousers",
  },
  {
    title: "Relaxed Fit Joggers",
    description: "Soft joggers designed for comfort and movement.",
    price: 899,
    images: [
      "https://picsum.photos/seed/joggers-1/800/800",
      "https://picsum.photos/seed/joggers-2/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "trousers",
  },
  {
    title: "Casual Hoodie",
    description: "Warm, cozy hoodie with front pocket and soft lining.",
    price: 1099,
    images: [
      "https://picsum.photos/seed/hoodie-1/800/800",
      "https://picsum.photos/seed/hoodie-2/800/800",
      "https://picsum.photos/seed/hoodie-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "hoodies",
  },
  {
    title: "Zip-Up Hoodie",
    description: "Comfortable zip-up hoodie perfect for layering.",
    price: 1199,
    images: [
      "https://picsum.photos/seed/zip-hoodie-1/800/800",
      "https://picsum.photos/seed/zip-hoodie-2/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "hoodies",
  },
  {
    title: "Denim Jacket",
    description: "Classic denim jacket with timeless street style.",
    price: 1899,
    images: [
      "https://picsum.photos/seed/denim-jacket-1/800/800",
      "https://picsum.photos/seed/denim-jacket-2/800/800",
      "https://picsum.photos/seed/denim-jacket-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "jackets",
  },
  {
    title: "Bomber Jacket",
    description: "Trendy bomber jacket with ribbed cuffs and snug fit.",
    price: 2199,
    images: [
      "https://picsum.photos/seed/bomber-1/800/800",
      "https://picsum.photos/seed/bomber-2/800/800",
    ],
    sizes: ["M", "L", "XL"],
    categoryId: "jackets",
  },
  {
    title: "Women’s Floral Dress",
    description: "Light and breezy floral dress perfect for summer days.",
    price: 1499,
    images: [
      "https://picsum.photos/seed/floral-dress-1/800/800",
      "https://picsum.photos/seed/floral-dress-2/800/800",
      "https://picsum.photos/seed/floral-dress-3/800/800",
    ],
    sizes: ["S", "M", "L"],
    categoryId: "women",
  },
  {
    title: "Women’s Maxi Skirt",
    description: "Elegant maxi skirt with a comfortable waistband.",
    price: 999,
    images: [
      "https://picsum.photos/seed/maxi-skirt-1/800/800",
      "https://picsum.photos/seed/maxi-skirt-2/800/800",
    ],
    sizes: ["S", "M", "L"],
    categoryId: "women",
  },
  {
    title: "Men’s Polo Shirt",
    description: "Classic polo shirt with collar and button placket.",
    price: 699,
    images: [
      "https://picsum.photos/seed/polo-1/800/800",
      "https://picsum.photos/seed/polo-2/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "men",
  },
  {
    title: "Men’s Full Sleeve Tee",
    description: "Soft full sleeve tee for everyday casual outfits.",
    price: 599,
    images: [
      "https://picsum.photos/seed/full-sleeve-tee-1/800/800",
      "https://picsum.photos/seed/full-sleeve-tee-2/800/800",
      "https://picsum.photos/seed/full-sleeve-tee-3/800/800",
    ],
    sizes: ["S", "M", "L", "XL"],
    categoryId: "men",
  },
];

// Seed function
async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      const productData = {
        ...product,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log(`✅ Added: ${product.title} (ID: ${docRef.id}, Category: ${product.categoryId})`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Failed to add ${product.title}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Seeding complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`\n⚠️  Remember to:`);
  console.log(`   1. Restore firestore.rules (products read-only)`);
  console.log(`   2. Delete this script after use!`);
  
  process.exit(0);
}

// Run seeding
seedProducts().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
