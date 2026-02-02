import { authApi } from "./api/authApi";
import { cartApi } from "./api/cartApi";
import { wishlistApi } from "./api/wishlistApi";
import { ordersApi } from "./api/ordersApi";
import { reviewsApi } from "./api/reviewsApi";
import { addressApi } from "./api/addressApi";

export const resetAllApiState = (dispatch: any) => {
  dispatch(authApi.util.resetApiState());
  dispatch(cartApi.util.resetApiState());
  dispatch(wishlistApi.util.resetApiState());
  dispatch(ordersApi.util.resetApiState());
  dispatch(reviewsApi.util.resetApiState());
  dispatch(addressApi.util.resetApiState());
};
