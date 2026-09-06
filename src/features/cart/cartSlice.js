import { createSlice } from "@reduxjs/toolkit";

const calculateTotals = (items) => {
  const value = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { value, totalAmount };
};

const initialState = {
  items: [],
  value: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      const addQty = product.quantity || 1;

      if (existingItem) {
        existingItem.quantity += addQty;
      } else {
        state.items.push({
          id: product.id || `temp-${Date.now()}`,
          name: product.name || product.proTitle || "Product Item",
          price: typeof product.price === 'number' 
            ? product.price 
            : parseFloat((product.proprice || "$0").replace(/[^0-9.]/g, '')) || 0,
          img: product.img || product.productimg || '',
          color: product.color || 'Standard',
          quantity: addQty
        });
      }

      const { value, totalAmount } = calculateTotals(state.items);
      state.value = value;
      state.totalAmount = totalAmount;
    },
    removeFromCart: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const { value, totalAmount } = calculateTotals(state.items);
      state.value = value;
      state.totalAmount = totalAmount;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      const { value, totalAmount } = calculateTotals(state.items);
      state.value = value;
      state.totalAmount = totalAmount;
    },
    clearCart: (state) => {
      state.items = [];
      state.value = 0;
      state.totalAmount = 0;
    }
  },
});

export const { increment, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;