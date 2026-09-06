import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  value: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => String(item.id) === String(product.id));
      if (!exists) {
        state.items.push(product);
        state.value = state.items.length;
      }
    },
    removeFromWishlist: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(id));
      state.value = state.items.length;
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => String(item.id) === String(product.id));
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      state.value = state.items.length;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.value = 0;
    }
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
