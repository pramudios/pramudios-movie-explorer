// pages/detail/MovieDetailSection.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { HeroDetail } from '@/components/HeroDetail/HeroDetail';
import { Detail } from '@/components/Detail/Detail';
import { getMovieDetailExtras, MovieCast } from '@/api/movies';

type LocationState = {
  id: number;
  title: string;
  score: string;
  image: string;
  overview: string;
  backdrop: string;
  date: string;
  genre: string;
};

export const MovieDetailSection: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const [cast, setCast] = useState<MovieCast[]>([]);
  const [ageRating, setAgeRating] = useState<string>('NR');

  console.log('🎥 Backdrop:', state.backdrop);
  console.log('🎥 Date:', state.date);
  console.log('🎥 Overview:', state.overview);

  useEffect(() => {
    if (state?.id) {
      getMovieDetailExtras(state.id).then((data) => {
        setCast(data.cast);
        setAgeRating(data.ageRating);
      });
    }
  }, [state]);

  return (
    <div id='detail'>
      <Navbar />
      <HeroDetail backdrop={state.backdrop} title={state.title} />
      <Detail movie={state} cast={cast} ageRating={ageRating} />
      <Footer />
    </div>
  );
};
