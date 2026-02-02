# Product Seeding Guide

## Prerequisites

1. Categories must be seeded first (see README_CATEGORIES.md)
2. Firebase project configured with Firestore
3. `.env` file with Firebase credentials
4. Updated `firestore.rules` deployed to Firebase

## Step-by-Step Instructions

### Step 1: Deploy Updated Firestore Rules

Your current `firestore.rules` file needs to be deployed to Firebase:

```bash
firebase deploy --only firestore:rules
```

If you don't have Firebase CLI installed:

```bash
npm install -g firebase-cli
firebase login
```

### Step 2: Temporarily Allow Product Writes

Edit `firestore.rules` and find the products section:

```
// Products collection - read-only for authenticated users
match /products/{productId} {
  allow read: if isAuthenticated();
  allow write: if false;  // <-- Change this line
```

Change to:

```
allow write: if true;  // Temporary for seeding
```

Deploy the temporary rules:

```bash
firebase deploy --only firestore:rules
```

### Step 3: Run Product Seeding Script

```bash
npx ts-node -r dotenv/config scripts/seedProducts.ts
```

Expected output:

```
🌱 Starting product seeding...

✅ Added: Classic Cotton T-Shirt (ID: abc123, Category: clothing)
✅ Added: Slim Fit Denim Jeans (ID: def456, Category: clothing)
...

📊 Seeding complete!
   Success: 60
   Errors: 0

⚠️  Remember to:
   1. Restore firestore.rules (products read-only)
   2. Delete this script after use!
```

### Step 4: Restore Read-Only Rules

Edit `firestore.rules` and change back:

```
match /products/{productId} {
  allow read: if isAuthenticated();
  allow write: if false;  // Restored to read-only
```

Deploy the restored rules:

```bash
firebase deploy --only firestore:rules
```

### Step 5: Clean Up

Delete the seeding scripts:

```bash
del scripts\seedProducts.ts
del scripts\seedCategories.ts
del scripts\README_PRODUCTS.md
del scripts\README_CATEGORIES.md
```

## Product Data Overview

The script seeds 60 products across 5 categories:

- **Clothing**: 20 products (t-shirts, jeans, dresses, jackets, etc.)
- **Electronics**: 15 products (headphones, smartwatch, keyboard, etc.)
- **Furniture**: 12 products (chairs, tables, wardrobes, etc.)
- **Groceries**: 8 products (rice, flour, oil, dry fruits, etc.)
- **Home & Kitchen**: 5 products (cookware, microwave, vacuum, etc.)

All products include:

- Title and description
- Price in INR
- Placeholder images
- Available sizes
- Category ID reference
- Creation timestamp

## Troubleshooting

### Error: "Missing or insufficient permissions"

- Make sure you deployed the temporary rules with `allow write: if true`
- Verify Firebase CLI is authenticated: `firebase login`

### Error: "Cannot find module 'dotenv'"

Install dependencies:

```bash
npm install
```

### Error: "VITE_FIREBASE_API_KEY is undefined"

Check your `.env` file has all required Firebase config variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Products created but categories missing

You must seed categories first using `seedCategories.ts`. Products reference category IDs that must exist.
