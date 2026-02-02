# Category Seeding Guide

## Prerequisites

1. Firebase project configured with Firestore
2. `.env` file with Firebase credentials
3. Updated `firestore.rules` deployed to Firebase

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

### Step 2: Temporarily Allow Category Writes

Edit `firestore.rules` and find the categories section:

```
// Categories collection - read-only for authenticated users
match /categories/{categoryId} {
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

### Step 3: Run Category Seeding Script

```bash
npx ts-node -r dotenv/config scripts/seedCategories.ts
```

Expected output:

```
🌱 Starting category seeding...

✅ Added: Clothing (ID: clothing)
✅ Added: Electronics (ID: electronics)
✅ Added: Furniture (ID: furniture)
✅ Added: Groceries (ID: groceries)
✅ Added: Home & Kitchen (ID: home)
✅ Added: Books (ID: books)
✅ Added: Sports & Outdoors (ID: sports)
✅ Added: Beauty & Personal Care (ID: beauty)

📊 Seeding complete!
   Success: 8
   Errors: 0

⚠️  Remember to:
   1. Restore firestore.rules (categories read-only)
   2. Delete this script after use!
```

### Step 4: Restore Read-Only Rules

Edit `firestore.rules` and change back:

```
match /categories/{categoryId} {
  allow read: if isAuthenticated();
  allow write: if false;  // Restored to read-only
```

Deploy the restored rules:

```bash
firebase deploy --only firestore:rules
```

### Step 5: Proceed to Product Seeding

Now that categories are seeded, you can proceed to seed products.
See `README_PRODUCTS.md` for instructions.

## Category Data Overview

The script seeds 8 categories with predefined IDs:

- `clothing` - Clothing
- `electronics` - Electronics
- `furniture` - Furniture
- `groceries` - Groceries
- `home` - Home & Kitchen
- `books` - Books
- `sports` - Sports & Outdoors
- `beauty` - Beauty & Personal Care

Each category includes:

- Predefined ID (used by products)
- Display name
- URL-friendly slug
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
