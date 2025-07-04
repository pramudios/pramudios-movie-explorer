import React, { useEffect, useState } from 'react';
import styles from './Release.module.scss';
import { ReleaseGroup } from './ReleaseGroup';
import { getTrendingMovies } from '@/api/movies';

type MovieType = {
  id: number;
  image: string;
  title: string;
  score: string;
  backdrop: string;
  overview: string;
  date: string;
  genre: string;
};

export const ReleaseSection: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='container' id='movies'>
      <div className={styles.headerMovies}>
        <h1 className={styles.title}>New Release</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReleaseGroup
          movies={movies.map((movie) => ({
            id: movie.id,
            image: movie.image,
            title: movie.title,
            score: movie.score,
            backdrop: movie.backdrop,
            overview: movie.overview,
            date: movie.date,
            genre: movie.genre,
          }))}
        />
      )}
    </div>
  );
};
