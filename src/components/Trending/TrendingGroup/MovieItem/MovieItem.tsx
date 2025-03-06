import React from 'react';
import styles from './MovieItem.module.scss';
import IconStar from '@/assets/icon_star.svg';
import { motion, Variants } from 'framer-motion';

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
  id: number;
  image: string;
  title: string;
  score: string;
};

export const MovieItem: React.FC<MovieItemProps> = ({
  id,
  image,
  title,
  score,
}: MovieItemProps) => {
  return (
    <motion.div className={styles.movieItem} variants={movieGroupVariants}>
      {/* DIV IMAGE */}
      <div className={styles.image}>
        <span className={styles.number}>{id}</span>
        <img src={image} alt={image} />
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
