import React, { useEffect, useState } from 'react';
import styles from './Trending.module.scss';
import { Trending } from './Trending';
import { getTrendingMovies, MovieType } from '@/api/movies';

export const TrendingSection: React.FC = () => {
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
        <h1 className={styles.title}>Trending Now</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Trending.Group>
          {movies.map((movie) => (
            <Trending.Item key={movie.id} {...movie} />
          ))}
        </Trending.Group>
      )}
    </div>
  );
};
