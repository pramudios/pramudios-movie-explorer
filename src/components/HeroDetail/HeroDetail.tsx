// components/HeroDetail/HeroDetail.tsx
import React from 'react';
import styles from './HeroDetail.module.scss';

type HeroDetailProps = {
  backdrop: string;
  title: string;
};

export const HeroDetail: React.FC<HeroDetailProps> = ({ backdrop, title }) => {
  return (
    <section className={styles.hero}>
      <img src={backdrop} alt={title} className={styles.backdropImage} />
    </section>
  );
};
