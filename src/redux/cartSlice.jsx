import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    total: {
      totalPrice: 0,
      totalDiscount: 0,
      totalAmount: 0,
    },
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.quantity = state.items.length;
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;
      state.items = state.items.filter((item) => item.id !== id);
      state.quantity -= 1;
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.quantity = 0;
      state.totalAmount = 0;

      cartSlice.caseReducers.calculateTotals(state);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;
      existingItem.quantity += 1;
      cartSlice.caseReducers.calculateTotals(state);
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
        state.quantity -= 1;
      } else {
        existingItem.quantity -= 1;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      let totalDiscount = 0;
      state.items.forEach((item) => {
        const price = item.price;
        const discountPercentage = item.discountPercentage || 0;
        const quantity = item.quantity;

        totalPrice += price * quantity;
        totalDiscount += ((price * discountPercentage) / 100) * quantity;
      });

      totalPrice = Math.ceil(totalPrice * 10);
      totalDiscount = Math.ceil(totalDiscount * 10);
      totalAmount = totalPrice - totalDiscount;
      state.total.totalPrice = totalPrice;
      state.total.totalDiscount = totalDiscount;
      state.total.totalAmount = totalAmount;
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
