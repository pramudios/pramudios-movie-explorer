import React from 'react';
import NavIcon from '@/assets/movie_icon.svg';
import styles from './Footer.module.scss';
import clsx from 'clsx';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={clsx(styles.footer, 'container')}>
        <div className={styles.logo}>
          <NavIcon />
          <span className={styles.textLogo}>Movie</span>
        </div>
        <div className={styles.footerInfo}>
          <p>©MovieExplorer by Pramudio2025</p>
        </div>
      </div>
    </footer>
  );
};
