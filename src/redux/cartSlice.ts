// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // other fields as needed
}

export interface CartItem extends Meal {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Meal>) {
      const existing = state.items.find(item => item.idMeal === action.payload.idMeal);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.idMeal !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ idMeal: string; quantity: number }>
    ) {
      const item = state.items.find(i => i.idMeal === action.payload.idMeal);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.idMeal !== action.payload.idMeal);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
