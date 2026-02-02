import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SearchPage from "./pages/search/SearchPage";
import WishlistPage from "./pages/saved/WishlistPage";
import CartPage from "./pages/cart/CartPage";
import AccountPage from "./pages/account/AccountPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import OrdersPage from "./pages/order/OrdersPage";
import MyDetailsPage from "./pages/account/MyDetailsPage";
import HelpCenterPage from "./pages/account/HelpCenterPage";
import FAQsPage from "./pages/account/FAQsPage";
import NotificationSettingsPage from "./pages/account/NotificationSettingsPage";
import CustomerServicePage from "./pages/account/CustomerServicePage";
import ProductPage from "./pages/product/ProductPage";
import SecondaryLayout from "./layouts/SecondaryLayout";
import CheckoutPage from "./pages/order/CheckoutPage";
import AddressPage from "./pages/order/AddressPage";
import PaymentMethodPage from "./pages/order/PaymentMethodPage";
import AddNewCard from "./pages/order/AddNewCard";
import TrackOrderPage from "./pages/order/TrackOrderPage";
import AddNewAddress from "./pages/order/AddNewAddress";
import PublicOnlyRoute from "./components/common/PublicOnlyRoute";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/authService";
import { clearUser, setUser } from "./store/slices/authSlice";
import { authApi } from "./store/api/authApi";
import ManageAddressesPage from "./pages/address/ManageAddressesPage";
import EditAddressPage from "./pages/address/EditAddressPage";

const App = () => {
  const hasBootstrappedRef = useRef(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearUser());
        hasBootstrappedRef.current = false; // reset on logout
        return;
      }

      // 🔒 HARD STOP — already bootstrapped in this session
      if (hasBootstrappedRef.current) return;

      hasBootstrappedRef.current = true;

      try {
        const token = await firebaseUser.getIdToken();
        if (!token) return;

        const user = await dispatch(
          authApi.endpoints.bootStrap.initiate(undefined),
        ).unwrap();

        dispatch(setUser(user));
      } catch (err) {
        console.error("Bootstrap failed", err);
        hasBootstrappedRef.current = false;
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/saved" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/my-details" element={<MyDetailsPage />} />
          <Route path="/addresses" element={<ManageAddressesPage />} />
          <Route
            path="/notification-settings"
            element={<NotificationSettingsPage />}
          />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="/faqs" element={<FAQsPage />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/addresses/new" element={<AddNewAddress />} />
          <Route path="/addresses/edit/:id" element={<EditAddressPage />} />

          {/* checkout address selction*/}
          <Route path="/checkout/address" element={<AddressPage />} />

          <Route path="/payment-method" element={<PaymentMethodPage />} />
          <Route path="/addnewcard" element={<AddNewCard />} />
          <Route path="/track-order/:id" element={<TrackOrderPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
