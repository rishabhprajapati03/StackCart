import { createSlice } from "@reduxjs/toolkit";

const productFilterSlice = createSlice({
  name: "productfilter",
  initialState: {
    filterChips: {
      sortValue: "",
      categoryValue: "",
      priceRangeValue: { min: "₹0", max: "₹30000+" },
      searchValue: "",
    },
    sortBy: "",
    sortCurrentValue: "default",
    priceRangeCurrentValue: { min: 0, max: 1000000000 },
    priceRange: { min: 0, max: 1000000000 },
    categoryCurrentValue: "",
    category: "",
  },
  reducers: {
    //Sort
    setSortCurrentValue: (state, action) => {
      state.sortCurrentValue = action.payload;
    },
    setSortBy: (state, action) => {
      if (state.sortBy == action.payload) return;

      state.sortBy = action.payload;
      state.filterChips.sortValue = action.payload;
    },
    removeSortBy: (state) => {
      state.filterChips.sortValue = "";
      state.sortBy = "";
    },

    // Category
    setCategoryCurrentValue: (state, action) => {
      state.categoryCurrentValue = action.payload;
    },
    setCategory: (state, action) => {
      if (state.category == action.payload) return;
      state.category = action.payload;
      state.filterChips.categoryValue = action.payload;
    },
    removeCategory: (state) => {
      state.category = "";
      state.filterChips.categoryValue = "";
    },

    // Price Range
    setPriceRangeCurrentValue: (state, action) => {
      const { min, max } = action.payload;
      if (min !== undefined) {
        state.priceRangeCurrentValue.min = min;
      } else if (max !== undefined) {
        state.priceRangeCurrentValue.max = max;
      }
    },
    setPriceRange: (state, action) => {
      const { min, max } = action.payload;

      if (min !== undefined) {
        state.priceRange.min = min;
        state.filterChips.priceRangeValue.min = `₹${min * 10}`;
      } else if (max !== undefined) {
        state.priceRange.max = max;
        if (max === 1000000000) {
          state.filterChips.priceRangeValue.max = `₹${30000}+`;
        } else {
          state.filterChips.priceRangeValue.max = `₹${max * 10}`;
        }
      }
    },
    removePriceRange: (state) => {
      state.priceRange.min = 0;
      state.priceRange.max = 1000000000;
      state.priceRangeCurrentValue.min = 0;
      state.priceRangeCurrentValue.max = 1000000000;
      state.filterChips.priceRangeValue = { min: "₹0", max: "₹30000+" };
    },
    setSearchValue: (state, action) => {
      state.filterChips.searchValue = action.payload;
    },
    removeSearchValue: (state) => {
      state.filterChips.searchValue = "";
    },
  },
});

export const selectProductFilter = (store) => store.productfilter;
export const {
  setSortBy,
  removeSortBy,
  setSortCurrentValue,
  setCategoryCurrentValue,
  setCategory,
  removeCategory,
  setPriceRangeCurrentValue,
  setPriceRange,
  removePriceRange,
  setSearchValue,
  removeSearchValue,
} = productFilterSlice.actions;
export default productFilterSlice.reducer;
