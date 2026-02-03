
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
