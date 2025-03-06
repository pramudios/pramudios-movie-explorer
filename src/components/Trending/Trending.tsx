import React from 'react';
import { TrendingGroup } from './TrendingGroup/TrendingGroup';
import { MovieItem } from './TrendingGroup/MovieItem/MovieItem';
import { motion, Variants } from 'framer-motion';
import styles from './Trending.module.scss';

const trendingVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.4 },
  },
};

type TrendingProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Group: typeof TrendingGroup;
  Item: typeof MovieItem;
};

export const Trending: React.FC<TrendingProps> & SubComponents = ({
  children,
}) => {
  return (
    <motion.div
      variants={trendingVariants}
      className={styles.trendingContainer}
      whileInView='inView'
      initial='outOfView'
    >
      <div>{children}</div>
    </motion.div>
  );
};

Trending.Group = TrendingGroup;
Trending.Item = MovieItem;
