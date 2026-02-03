# 🛒 E-Commerce Frontend (Mobile-First)

A mobile-first e-commerce frontend built with **React + TypeScript**, integrated with a real backend API.  
The focus of this project is **frontend architecture, authentication, and API integration**, not UI animations or desktop layouts.

> Note: This project is intentionally optimized for **mobile screens only**.

---

## 🔗 Live Demo

https://my-stackcart-shop.vercel.app

---

## 📱 Project Scope

- Mobile-first UI (no desktop layout)
- Real backend integration (no mock or fake data)
- Firebase authentication
- API state management using RTK Query
- Clear separation between UI, state, and API logic

This project was built to practice **real-world frontend integration**, not just UI design.

---

## 🧠 How the App Works

- Single Page Application (SPA)
- Routing handled on the client using React Router
- All server data (products, cart, orders, etc.) fetched via RTK Query
- Firebase handles authentication
- Backend is responsible for:
  - User creation
  - Price validation
  - Stock validation
  - Order creation

The frontend does not calculate prices or manage stock logic on its own.

---

## 🛠 Tech Stack

**Core**
- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router

**UI & Forms**
- Tailwind CSS
- React Hook Form
- Lucide Icons

**UX**
- react-hot-toast (notifications)
- sweetalert2 (confirmation dialogs)

**Authentication**
- Firebase Authentication (Email / Password)

---

## 🔐 Authentication Flow

1. User signs in using Firebase Authentication
2. Firebase returns an ID token
3. Token is sent to backend with every protected request:
4. Backend `/auth/bootstrap` endpoint:
   - Creates the user if it doesn’t exist
   - Returns the backend user object
5. Same token is reused for all authenticated API calls

User data is owned and validated by the backend.

---

## 🌐 API Usage

- Base URL: `http://localhost:5000/api`
- Protected routes require Firebase ID token
- RTK Query is used for:
  - Data fetching
  - Caching
  - Loading and error handling
  - Automatic refetching

### Implemented Features

- Product listing and filtering
- Categories
- Cart (size-based items)
- Wishlist
- Reviews
- Addresses
- Orders
- User profile

All features are driven by backend APIs.

---

## 🧺 Cart Logic

- Each cart item is identified by **product + size**
- Same product with different sizes → separate cart items
- Quantity updates are validated against stock
- Only active products can be added
- Cart state always stays in sync with the backend

---

## 📦 Orders

- Orders are created only from the cart
- Backend handles:
  - Price re-validation
  - Stock checks per size
  - Atomic transactions
- Frontend:
  - Sends selected address and payment method
  - Displays order history

Orders are immutable once placed.

---

## ⚠️ Known Limitations

- No desktop layout
- No admin panel
- No server-side rendering
- No payment gateway integration (flow only)

These are intentional scope limits.

---

## 👤 Author

**Rishabh Prajapati**  
Frontend Developer (React, TypeScript, Redux)

---

## 📝 License

This project is for learning and portfolio purposes.
