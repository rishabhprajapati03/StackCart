import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: unknown | null;
  initialized: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  initialized: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initialized = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
