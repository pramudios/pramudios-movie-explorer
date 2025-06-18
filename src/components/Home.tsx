import React from 'react';
import { Navbar } from './Navbar';
// import { Hero } from './Hero';
import styles from './Home.module.scss';
import { TrendingSection } from './Trending';
import { Footer } from './Footer/Footer';
import { ReleaseSection } from './Releases';
import { Hero } from './Hero/Hero';
import { MovieContext, useMovieProvider } from '@/context/MovieContext';

export const Home: React.FC = () => {
  const movieProvider = useMovieProvider(); // Menggunakan provider

  return (
    <div className={styles.homepage} id='home'>
      <MovieContext.Provider value={movieProvider}>
        <Navbar />
        <Hero />
        <TrendingSection />
        <ReleaseSection />
        <Footer />
      </MovieContext.Provider>
    </div>
  );
};
