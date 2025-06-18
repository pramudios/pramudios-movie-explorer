import axios from 'axios';

const API_KEY = '4b12fc996a62ee84cdba998af52f8cbf';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

// ==========================
// Genre Mapping (ID ➝ Name)
// ==========================

const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// ==========================
// Tipe Data dari API TMDB
// ==========================

type Movie = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[]; // ➕ Tambah genre_ids dari API
};

export type MovieType = {
  id: number;
  index: number;
  image: string;
  backdrop: string;
  title: string;
  score: string;
  date: string;
  overview: string;
  genre: string; // ➕ Tambah genre untuk UI
};

// ==========================
// Format Tanggal Gaya Bule
// ==========================

const formatDateToEnglish = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

// ==========================
// Get Trending Movies
// ==========================

export const getTrendingMovies = async (): Promise<MovieType[]> => {
  try {
    const response = await axios.get<{ results: Movie[] }>(
      `/trending/movie/day?api_key=${API_KEY}`
    );

    return response.data.results.map(
      (movie: Movie, index: number): MovieType => {
        const genreId = movie.genre_ids[0]; // ambil genre pertama
        const genre = genreMap[genreId] || 'Unknown';

        return {
          id: movie.id,
          index: index + 1,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          title: movie.original_title,
          score: `${movie.vote_average.toFixed(1)}/10`,
          overview: movie.overview,
          date: formatDateToEnglish(movie.release_date),
          genre, // ➕ genre string
        };
      }
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// ==========================
// Detail Tambahan untuk Movie
// ==========================

type Cast = {
  name: string;
  character: string;
  profile_path: string | null;
};

type ReleaseDateInfo = {
  certification: string;
  iso_3166_1: string;
  release_date: string;
};

export type MovieCast = {
  name: string;
  character: string;
  profile: string | null;
};

export type MovieDetailExtras = {
  cast: MovieCast[];
  ageRating: string;
};

// ==========================
// Get Cast
// ==========================

const getMovieCast = async (movieId: number): Promise<MovieCast[]> => {
  try {
    const response = await axios.get<{ cast: Cast[] }>(
      `/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    return response.data.cast.slice(0, 6).map(
      (cast): MovieCast => ({
        name: cast.name,
        character: cast.character,
        profile: cast.profile_path
          ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
          : null,
      })
    );
  } catch (error) {
    console.error(`Error fetching cast for movie ${movieId}:`, error);
    return [];
  }
};

// ==========================
// Get Age Rating
// ==========================

const getMovieRating = async (movieId: number): Promise<string> => {
  try {
    const response = await axios.get<{
      results: {
        iso_3166_1: string;
        release_dates: ReleaseDateInfo[];
      }[];
    }>(`/movie/${movieId}/release_dates?api_key=${API_KEY}`);

    const localRelease = response.data.results.find(
      (r) => r.iso_3166_1 === 'ID'
    );

    const cert = localRelease?.release_dates.find(
      (r) => r.certification && r.certification.trim() !== ''
    );

    return cert?.certification || 'NR';
  } catch (error) {
    console.error(`Error fetching rating for movie ${movieId}:`, error);
    return 'NR';
  }
};

// ==========================
// Get MovieDetailExtras
// ==========================

export const getMovieDetailExtras = async (
  movieId: number
): Promise<MovieDetailExtras> => {
  const [cast, ageRating] = await Promise.all([
    getMovieCast(movieId),
    getMovieRating(movieId),
  ]);

  return {
    cast,
    ageRating,
  };
};
