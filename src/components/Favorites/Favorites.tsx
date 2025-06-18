// pages/Favorites/Favorites.tsx
import React from 'react';
import styles from './Favorites.module.scss';
import { useFavorite } from '@/hooks/useFavorites';
import FavBlackIcon from '@/assets/heart_black_icon.png';
import IconStar from '@/assets/icon_star.svg';
import { Button } from '@/components/ui/Button';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import clsx from 'clsx';

export const Favorites: React.FC = () => {
  const { favoriteMovies, handleRemoveFromFavorites } = useFavorite();

  return (
    <>
      <Navbar />
      <div className={clsx(styles.favContainer, 'container')}>
        <h1 className={styles.title}>Favorites</h1>

        {favoriteMovies.map((movie) => (
          <div key={movie.id} className={styles.favCard}>
            <div className={styles.movieInfo}>
              <div className={styles.image}>
                <img src={movie.image} alt={movie.title} />
              </div>

              <div className={styles.content}>
                <h1 className={styles.title}>{movie.title}</h1>

                <div className={styles.rating}>
                  <IconStar />
                  <p>{movie.score}</p>
                </div>

                <p className={styles.overview}>{movie.overview}</p>

                <div className={styles.desktopOnly}>
                  <Button
                    as='a'
                    href='#'
                    className={styles.ctaButton}
                    variant='primary'
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>

              <div className={styles.desktopOnly}>
                <div
                  className={styles.favIcon}
                  onClick={() => handleRemoveFromFavorites(movie.id)}
                >
                  <img src={FavBlackIcon} alt='FavIcon' />
                </div>
              </div>
            </div>
            <div className={styles.mobileOnly}>
              <div className={styles.cardActions}>
                <Button
                  as='a'
                  href='#'
                  className={styles.ctaButton}
                  variant='primary'
                >
                  Watch Trailer
                </Button>
                <div
                  className={styles.favIcon}
                  onClick={() => handleRemoveFromFavorites(movie.id)}
                >
                  <img src={FavBlackIcon} alt='FavIcon' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
