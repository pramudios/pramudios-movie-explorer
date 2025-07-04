import React from 'react';
import styles from './Trending.module.scss';
import { Trending } from './Trending';
import { useMovie } from '@/context/MovieContext';

export const TrendingSection: React.FC = () => {
  const { movies } = useMovie();

  return (
    <div className='container' id='movies'>
      <div className={styles.headerMovies}>
        <h1 className={styles.title}>Trending Now</h1>
      </div>

      <Trending.Group>
        {movies.map((movie) => (
          <Trending.Item key={movie.id} {...movie} />
        ))}
      </Trending.Group>
    </div>
  );
};
