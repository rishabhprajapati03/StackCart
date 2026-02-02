/**
 * ONE-TIME CATEGORY SEEDING SCRIPT
 * 
 * WARNING: This script is disposable and should be deleted after use.
 * 
 * Usage:
 * 1. Ensure .env file has Firebase config
 * 2. Temporarily modify firestore.rules to allow category writes:
 *    Change: allow write: if false;
 *    To:     allow write: if true;
 * 3. Run: npx ts-node -r dotenv/config scripts/seedCategories.ts
 * 4. Restore firestore.rules (categories read-only)
 * 5. Delete this script after seeding
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
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

// Category data with predefined IDs
const categories = [
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'furniture', name: 'Furniture', slug: 'furniture' },
  { id: 'groceries', name: 'Groceries', slug: 'groceries' },
  { id: 'home', name: 'Home & Kitchen', slug: 'home' },
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'sports', name: 'Sports & Outdoors', slug: 'sports' },
  { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
];

// Seed function
async function seedCategories() {
  console.log('🌱 Starting category seeding...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const category of categories) {
    try {
      const categoryData = {
        name: category.name,
        slug: category.slug,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'categories', category.id), categoryData);
      console.log(`✅ Added: ${category.name} (ID: ${category.id})`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Failed to add ${category.name}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Seeding complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`\n⚠️  Remember to:`);
  console.log(`   1. Restore firestore.rules (categories read-only)`);
  console.log(`   2. Delete this script after use!`);
  
  process.exit(0);
}

// Run seeding
seedCategories().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
