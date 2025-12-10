import { configureStore } from "@reduxjs/toolkit";
import productCategoriesReducer from "./productCategoriesSlice";
import productFilterReducer from "./productFilterSlice";
import cartReducer from "./cartSlice";
import recentlyViewedItemsReducer from "./recentlyViewedItemsSlice";
import wishlistReducer from "./wishlistSlice";

const appStore = configureStore({
  reducer: {
    productcategories: productCategoriesReducer,
    productfilter: productFilterReducer,
    cart: cartReducer,
    recentlyvieweditems: recentlyViewedItemsReducer,
    wishlist: wishlistReducer,
  },
});
export default appStore;
