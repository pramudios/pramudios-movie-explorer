import axios from 'axios';

const API_KEY = '4b12fc996a62ee84cdba998af52f8cbf';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

// Tipe data untuk satu movie dari API TMDB
type Movie = {
  poster_path: string;
  original_title: string;
  vote_average: number;
};

// Tipe data untuk movie yang akan digunakan dalam UI
export type MovieType = {
  id: number;
  image: string;
  title: string;
  score: string;
};

export const getTrendingMovies = async (): Promise<MovieType[]> => {
  try {
    const response = await axios.get<{ results: Movie[] }>(
      `/trending/movie/day?api_key=${API_KEY}`
    );

    return response.data.results.map(
      (movie: Movie, index: number): MovieType => ({
        id: index + 1,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.original_title,
        score: `${movie.vote_average.toFixed(1)}/10`,
      })
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
