// hooks/useFavorite.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  addToFavorites,
  removeFromFavorites,
  FavoriteMovie,
} from '@/redux/favoriteSlice/favoriteSlice';

export const useFavorite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorite.movies
  );

  const handleAddToFavorites = (item: FavoriteMovie) => {
    dispatch(addToFavorites(item));
  };

  const handleRemoveFromFavorites = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  return {
    favoriteMovies,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};
