import { createSlice } from "@reduxjs/toolkit";

const productCategoriesSlice = createSlice({
  name: "productcategories",
  initialState: {
    categories: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = [
        {
          slug: "all",
          name: "All",
          url: "https://dummyjson.com/products?limit=100",
        },
        ...action.payload,
      ];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectProductCategories = (store) => store.productcategories;
export const { setCategories, setError, setisLoading } =
  productCategoriesSlice.actions;
export default productCategoriesSlice.reducer;
