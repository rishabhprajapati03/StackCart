import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import authSliceReducer from "./slices/authSlice";
import { cartApi } from "./api/cartApi";
import { wishlistApi } from "./api/wishlistApi";
import { addressApi } from "./api/addressApi";
import { ordersApi } from "./api/ordersApi";
import { reviewsApi } from "./api/reviewsApi";
const appStore = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      addressApi.middleware,
      ordersApi.middleware,
      reviewsApi.middleware,
    ),
});
export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
