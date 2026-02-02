import { onAuthStateChanged } from "firebase/auth";
import type { AppDispatch } from "../store/store";
import { setUser } from "../store/features/auth/authSlice";
import { auth } from "../core/firebase/firebase";
import { mapFirebaseUserToAuthUser } from "../utils/AuthMapper";

export const initAuthListener = () => (dispatch: AppDispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(mapFirebaseUserToAuthUser(user)));
    } else {
      dispatch(setUser(null));
    }
  });
  return unsubscribe;
};
