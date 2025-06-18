import React from 'react';
import styles from './Trending.module.scss';
import { Trending } from './Trending';
import { useMovie } from '@/context/MovieContext';

export const TrendingSection: React.FC = () => {
  const { movies, searchQuery } = useMovie();

  return (
    <div className='container' id='movies'>
      <div className={styles.headerMovies}>
        <h1 className={styles.title}>
          {searchQuery ? 'Search Results' : 'Trending Now'}
        </h1>

        {searchQuery && (
          <p className={styles.searchResult}>
            Search result for &quot;
            <span className={styles.query}>{searchQuery}</span>&quot;
          </p>
        )}
      </div>

      {movies.length === 0 ? (
        <p className={styles.searchResult}>No movie found.</p>
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
