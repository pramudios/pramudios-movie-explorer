import React from 'react';
import { ReleaseGroup } from './ReleaseGroup/ReleaseGroup';
import { MovieItem } from './ReleaseGroup/MovieItem/MovieItem';
import { motion, Variants } from 'framer-motion';
import styles from './Release.module.scss';

const ReleasesVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.4 },
  },
};

type ReleaseProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Group: typeof ReleaseGroup;
  Item: typeof MovieItem;
};

export const Release: React.FC<ReleaseProps> & SubComponents = ({
  children,
}) => {
  return (
    <motion.div
      variants={ReleasesVariants}
      className={styles.releaseContainer}
      whileInView='inView'
      initial='outOfView'
    >
      <div>{children}</div>
    </motion.div>
  );
};

Release.Group = ReleaseGroup;
Release.Item = MovieItem;
