import React, { useRef, useState, useEffect } from 'react';
import { MovieItem } from './MovieItem/MovieItem';
import { motion, Variants } from 'framer-motion';
import styles from './TrendingGroup.module.scss';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronRight } from 'lucide-react';

const trendingGroupVariants: Variants = {
  inView: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  outofView: {},
};

type TrendingGroupProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Item: typeof MovieItem;
};

export const TrendingGroup: React.FC<TrendingGroupProps> & SubComponents = ({
  children,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(5);

  // Deteksi ukuran layar untuk menyesuaikan jumlah item per baris
  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth < 768 ? 2 : 5);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  return (
    <motion.div
      className={styles.trendingGroup}
      variants={trendingGroupVariants}
    >
      {/* Swiper */}
      <SwiperComponent
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        navigation={false}
        modules={[Navigation]}
        className={styles.swiperContainer}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            {child}
          </SwiperSlide>
        ))}
        <SwiperSlide className={styles.blurOverlay}></SwiperSlide>
      </SwiperComponent>

      <div className={styles.overlayBlur} />

      <button
        className={styles.navButton}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight size={32} />
      </button>
    </motion.div>
  );
};
TrendingGroup.Item = MovieItem;
