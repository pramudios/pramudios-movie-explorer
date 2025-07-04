import React from 'react';
import styles from './MovieItem.module.scss';
import IconStar from '@/assets/icon_star.svg';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const movieGroupVariants: Variants = {
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
    x: -35,
  },
};

type MovieItemProps = {
  index?: number;
  id: number;
  image: string;
  title: string;
  score: string;
  backdrop: string;
  overview: string;
  date: string;
  genre: string;
};

export const MovieItem: React.FC<MovieItemProps> = ({
  index,
  id,
  image,
  title,
  score,
  backdrop,
  overview,
  date,
  genre,
}: MovieItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`, {
      state: {
        id,
        title,
        score,
        image,
        backdrop,
        overview,
        date,
        genre,
      },
    });
  };

  return (
    <motion.div
      className={styles.movieItem}
      variants={movieGroupVariants}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* DIV IMAGE */}
      <div className={styles.image}>
        {index !== undefined && <span className={styles.number}>{index}</span>}
        <img src={image} alt={title} />
      </div>

      {/* INFO MOVIE */}
      <div className={styles.infoMovie}>
        <h1 className={styles.title}>{title}</h1>

        {/* RATING */}
        <div className={styles.scoreContainer}>
          <IconStar id='IconStar' />
          <p className={styles.score}>{score}</p>
        </div>
      </div>
    </motion.div>
  );
};
