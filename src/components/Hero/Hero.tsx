// components/Hero/Hero.tsx
import React, { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import { Button } from '../ui/Button';
import clsx from 'clsx';
import { getTrendingMovies, MovieType } from '@/api/movies';

export const Hero: React.FC = () => {
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      }
    });
  }, []);

  if (!randomMovie) return null;

  return (
    <main>
      <section>
        <div className={clsx(styles.hero)}>
          <img
            src={randomMovie.backdrop}
            alt={randomMovie.title}
            className={styles.backdropImage}
          />
        </div>
        <div className={clsx(styles.overflowWrapper, 'container')}>
          <div className={styles.container}>
            <h1 className={styles.title}>{randomMovie.title}</h1>

            <p className={styles.description}>{randomMovie.overview}</p>

            <div className={styles.buttonContainer}>
              <Button
                as='a'
                href='#'
                className={styles.ctaButton}
                variant='primary'
              >
                Watch Trailer
              </Button>
              <Button
                as='a'
                href='#'
                className={styles.ctaButton}
                variant='secondary'
              >
                See Detail
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
