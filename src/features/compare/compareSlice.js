import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  value: 0,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => String(item.id) === String(product.id));
      if (!exists) {
        state.items.push(product);
        state.value = state.items.length;
      }
    },
    removeFromCompare: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.items = state.items.filter((item) => String(item.id) !== String(id));
      state.value = state.items.length;
    },
    toggleCompare: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => String(item.id) === String(product.id));
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      state.value = state.items.length;
    },
    clearCompare: (state) => {
      state.items = [];
      state.value = 0;
    }
  },
});

export const { addToCompare, removeFromCompare, toggleCompare, clearCompare } = compareSlice.actions;

export default compareSlice.reducer;
