# StackCart

A modern e-commerce web application built with React and Redux, featuring product browsing, smart filtering, and cart management.

**Live Demo:** https://stackcart-sandy.vercel.app

---

## Features

- **Product Catalog** - Browse products with real-time API data
- **Advanced Filtering** - Multi-filter support with category, price range, and search
- **Smart Search** - Real-time product search across titles and categories
- **Shopping Cart** - Add/remove items with quantity management and live price calculations
- **Wishlist** - Save favorite products for later
- **Grid & List View** - Toggle between viewing modes
- **Recently Viewed** - Track last 8 browsed products
- **Pagination** - 20 products per page with smooth navigation
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Filter Chips** - Visual active filters with one-click removal

## Tech Stack

- **React 18** - UI Framework
- **Redux Toolkit** - State Management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **DummyJSON API** - Product Data
- **Vite** - Build Tool
- **Vercel** - Deployment

## Key Files

- `src/components/product/Products.jsx` - Main product listing with filtering
- `src/redux/cartSlice.js` - Shopping cart state and calculations
- `src/redux/productFilterSlice.js` - All filter logic (sort, category, price)
- `src/utils/functions/productFilter.js` - Multi-filter processing
- `src/components/pagination/Pagination.jsx` - Pagination implementation
- `src/hooks/useProductsApi.js` - Product API fetching with AbortController

## How It Works

**Multi-Filter System** - Combines category, price range, search, and sorting. Filters process sequentially: category → price → search → sort

**Cart Calculations** - Automatically calculates per-item discounts based on percentages, sums total price, discount, and final amount in real-time

**Filter Chips** - Active filters display as removable chips. Click to remove individual filters or "Clear All" button

**Recently Viewed** - Stores last 8 viewed products in Redux, displayed on product detail pages

**Pagination State** - Filter changes automatically reset to page 1 while maintaining filter selections

## What I Learned

- Managing complex state across multiple filters with Redux Toolkit
- Implementing reusable pagination component
- Handling API requests with proper cleanup (AbortController)
- Building responsive layouts with Tailwind CSS
- Writing custom React hooks for cleaner code
- Deploying React applications to production

---

**Made with ❤️ by Rishabh Prajapati**
