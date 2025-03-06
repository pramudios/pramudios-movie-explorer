import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import styles from './Home.module.scss';
import { TrendingSection } from './Trending';
import { Footer } from './Footer/Footer';
import { ReleaseSection } from './Releases';

export const Home: React.FC = () => {
  return (
    <div className={styles.homepage} id='home'>
      <Navbar />
      <Hero />
      <TrendingSection />
      <ReleaseSection />
      <Footer />
    </div>
  );
};
