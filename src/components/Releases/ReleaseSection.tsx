import React, { useEffect, useState } from 'react';
import styles from './Release.module.scss';
import { Release } from './Release';
import { getTrendingMovies } from '@/api/movies';

type MovieType = {
  id: number;
  image: string;
  title: string;
  score: string;
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
        <Release.Group>
          {movies.map((movie) => (
            <Release.Item key={movie.id} {...movie} />
          ))}
        </Release.Group>
      )}
    </div>
  );
};
