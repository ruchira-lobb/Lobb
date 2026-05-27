// src/redux/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Add other fields if needed
}

interface FavoritesState {
  items: Meal[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Meal>) {
      // Prevent duplicates
      if (!state.items.find(item => item.idMeal === action.payload.idMeal)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.idMeal !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<Meal>) {
      const exists = state.items.find(item => item.idMeal === action.payload.idMeal);
      if (exists) {
        state.items = state.items.filter(item => item.idMeal !== action.payload.idMeal);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
