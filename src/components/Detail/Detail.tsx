// components/Detail/Detail.tsx
import React from 'react';
import styles from './Detail.module.scss';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import CalendarIcon from '@/assets/calendar_icon.svg';
import FavBlackIcon from '@/assets/heart_black_icon.png';
import FavRedIcon from '@/assets/heart_red_icon.png';
import IconStar from '@/assets/icon_star.svg';
import VideoIcon from '@/assets/video_icon.svg';
import HappyIcon from '@/assets/happy_icon.svg';
import { MovieCast } from '@/api/movies';
import { useFavorite } from '@/hooks/useFavorites';

type MovieData = {
  id: number;
  title: string;
  score: string;
  image: string;
  overview: string;
  backdrop: string;
  date: string;
  genre: string;
};

type DetailProps = {
  movie: MovieData;
  cast: MovieCast[];
  ageRating: string;
};

export const Detail: React.FC<DetailProps> = ({ movie, cast, ageRating }) => {
  const { favoriteMovies, handleAddToFavorites } = useFavorite();

  // ✅ Cek apakah film ini sudah difavoritkan
  const isFavorited = favoriteMovies.some((fav) => fav.id === movie.id);

  return (
    <div className={clsx(styles.overflowWrapper, 'container')}>
      <div className={styles.detailContainer}>
        {/* HEADER */}
        <div className={styles.detailMovie}>
          <div className={styles.imageTitle}>
            <div className={styles.image}>
              <img src={movie.image} alt={movie.title} />
            </div>
            <div className={styles.titleDate}>
              <h1 className={styles.title}>{movie.title}</h1>
              <div className={styles.date}>
                <CalendarIcon />
                <h1 className={styles.dateText}>{movie.date}</h1>
              </div>
              {/* Tambahkan elemen desktop: hanya terlihat di md ke atas */}
              <div className={styles.desktopOnly}>
                <div className={styles.buttonFavorite}>
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
                      handleAddToFavorites({
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
                <div className={styles.movieInfo}>
                  <div className={styles.infoContainer}>
                    <IconStar className={styles.iconInfo} />
                    <p className={styles.infoTextSmall}>Rating</p>
                    <p className={styles.infoTextLarge}>{movie.score}</p>
                  </div>
                  <div className={styles.infoContainer}>
                    <VideoIcon className={styles.iconInfo} />
                    <p className={styles.infoTextSmall}>Genre</p>
                    <p className={styles.infoTextLarge}>{movie.genre}</p>
                  </div>
                  <div className={styles.infoContainer}>
                    <HappyIcon className={styles.iconInfo} />
                    <p className={styles.infoTextSmall}>Age Limit</p>
                    <p className={styles.infoTextLarge}>{ageRating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mobileOnly}>
            <div className={styles.buttonFavorite}>
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
                  handleAddToFavorites({
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

            <div className={styles.movieInfo}>
              <div className={styles.infoContainer}>
                <IconStar />
                <p className={styles.infoTextSmall}>Rating</p>
                <p className={styles.infoTextLarge}>{movie.score}</p>
              </div>
              <div className={styles.infoContainer}>
                <VideoIcon />
                <p className={styles.infoTextSmall}>Genre</p>
                <p className={styles.infoTextLarge}>{movie.genre}</p>
              </div>
              <div className={styles.infoContainer}>
                <HappyIcon />
                <p className={styles.infoTextSmall}>Age Limit</p>
                <p className={styles.infoTextLarge}>{ageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className={styles.overview}>
          <h1 className={styles.overviewTitle}>Overview</h1>
          <p className={styles.overviewText}>{movie.overview}</p>
        </div>

        {/* CAST */}
        <div className={styles.cast}>
          <h1 className={styles.castTitle}>Cast & Crew</h1>
          <div className={styles.castList}>
            {cast.map((member, index) => (
              <div key={index} className={styles.castItem}>
                {member.profile ? (
                  <>
                    <img src={member.profile} alt={member.name} />
                    <div className={styles.castProfile}>
                      <div className={styles.castName}>{member.name}</div>
                      <div className={styles.castRole}>{member.character}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.castPlaceholder}>No Image</div>
                    <div className={styles.castProfile}>
                      <div className={styles.castName}>{member.name}</div>
                      <div className={styles.castRole}>{member.character}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
