// redux/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteMovie {
  id: number;
  title: string;
  score: string;
  image: string;
  overview: string;
  isFavorite: boolean;
}

interface FavoriteState {
  movies: FavoriteMovie[];
}

const initialState: FavoriteState = {
  movies: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
