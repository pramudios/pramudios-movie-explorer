// pages/Favorites/Favorites.tsx
import React, { useState } from 'react';
import styles from './Favorites.module.scss';
import { useFavorite } from '@/hooks/useFavorites';
import FavRedIcon from '@/assets/heart_red_icon.png';
import IconStar from '@/assets/icon_star.svg';
import { Button } from '@/components/ui/Button';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import clsx from 'clsx';
import { Toast } from '../Modal/Toast';

export const Favorites: React.FC = () => {
  const { favoriteMovies, handleRemoveFromFavorites } = useFavorite();
  const [showToast, setShowToast] = useState(false);

  const handleRemove = (id: number) => {
    handleRemoveFromFavorites(id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // auto hide after 2s
  };

  return (
    <>
      <Navbar />
      <Toast message='Success Remove from Favorites' show={showToast} />
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
                  onClick={() => handleRemove(movie.id)}
                >
                  <img src={FavRedIcon} alt='FavIcon' />
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
                  <img src={FavRedIcon} alt='FavIcon' />
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
