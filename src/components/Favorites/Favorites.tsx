import React, { useState } from 'react';
import styles from './Favorites.module.scss';
import { useFavorite } from '@/hooks/useFavorites';
import { useMovie } from '@/context/MovieContext';
import FavBlackIcon from '@/assets/heart_black_icon.png';
import FavRedIcon from '@/assets/heart_red_icon.png';
import IconStar from '@/assets/icon_star.svg';
import { Button } from '@/components/ui/Button';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import clsx from 'clsx';
import { Toast } from '../Modal/Toast';

export const Favorites: React.FC = () => {
  const { favoriteMovies, handleAddToFavorites, handleRemoveFromFavorites } =
    useFavorite();
  const { movies, searchQuery } = useMovie();
  const [showToast, setShowToast] = useState(false);

  const handleRemove = (id: number) => {
    handleRemoveFromFavorites(id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // ✅ Jika searchQuery ada → tampilkan hasil pencarian (movies)
  const displayedMovies = searchQuery ? movies : favoriteMovies;

  return (
    <>
      <Navbar />
      <Toast message='Success Remove from Favorites' show={showToast} />

      <div className={clsx(styles.favContainer, 'container')}>
        <h1 className={styles.title}>
          {searchQuery ? 'Search Results' : 'Favorites'}
        </h1>

        {searchQuery && (
          <p className={styles.searchResult}>
            Search result for &quot;
            <span className={styles.query}>{searchQuery}</span>&quot;
          </p>
        )}

        {displayedMovies.length === 0 ? (
          <p className={styles.searchResult}>No movie found.</p>
        ) : (
          displayedMovies.map((movie) => {
            const isFavorited = favoriteMovies.some(
              (fav) => fav.id === movie.id
            );

            return (
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
                      onClick={() =>
                        isFavorited
                          ? handleRemove(movie.id)
                          : handleAddToFavorites({
                              id: movie.id,
                              title: movie.title,
                              score: movie.score,
                              image: movie.image,
                              overview: movie.overview,
                              isFavorite: true,
                            })
                      }
                    >
                      <img
                        src={isFavorited ? FavRedIcon : FavBlackIcon}
                        alt='FavIcon'
                      />
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
                      onClick={() =>
                        isFavorited
                          ? handleRemove(movie.id)
                          : handleAddToFavorites({
                              id: movie.id,
                              title: movie.title,
                              score: movie.score,
                              image: movie.image,
                              overview: movie.overview,
                              isFavorite: true,
                            })
                      }
                    >
                      <img
                        src={isFavorited ? FavRedIcon : FavBlackIcon}
                        alt='FavIcon'
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
};
