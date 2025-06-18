import { createContext, useContext, useEffect, useState } from 'react';
import { getTrendingMovies, MovieType } from '@/api/movies';

// ✅ Tipe data context
type MovieContextType = {
  movies: MovieType[];
  searchQuery: string;
  searchMovie: (query: string) => void;
};

// ✅ Context
export const MovieContext = createContext<MovieContextType | null>(null);

// ✅ Hook pemanggil context
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

// ✅ Provider function mirip usePokemonProvider
export const useMovieProvider = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const fetched = await getTrendingMovies();
      setAllMovies(fetched);
      setMovies(fetched);
    };
    fetchMovies();
  }, []);

  const searchMovie = (query: string) => {
    setSearchQuery(query);
    const result = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(result);
  };

  return { movies, searchQuery, searchMovie };
};
