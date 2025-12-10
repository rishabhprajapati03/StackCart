import { createSlice } from "@reduxjs/toolkit";
import { MAX_RECENT_ITEMS } from "../utils/constants";

const recentlyViewedItemsSlice = createSlice({
  name: "recentlyvieweditems",
  initialState: {
    items: [],
  },
  reducers: {
    addRecentlyViewedItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) return;
      state.items.splice(MAX_RECENT_ITEMS, 1);
      state.items.unshift(product);
    },
  },
});

export const { addRecentlyViewedItem } = recentlyViewedItemsSlice.actions;
export default recentlyViewedItemsSlice.reducer;
