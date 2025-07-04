import React, { useState, useEffect } from 'react';
import { MovieItem } from '../../MovieItem/MovieItem';
import { motion, Variants } from 'framer-motion';
import styles from './ReleaseGroup.module.scss';

const releaseGroupVariants: Variants = {
  inView: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  outofView: {},
};

type ReleaseGroupProps = {
  movies: {
    id: number;
    image: string;
    title: string;
    score: string;
    backdrop: string;
    overview: string;
    date: string;
    genre: string;
  }[];
};

export const ReleaseGroup: React.FC<ReleaseGroupProps> = ({ movies }) => {
  const [itemsPerRow, setItemsPerRow] = useState(5); // Default Desktop
  const [visibleRows, setVisibleRows] = useState(2); // Awalnya tampil 2 baris (10 item di desktop)

  // Menentukan jumlah item per baris berdasarkan ukuran layar
  useEffect(() => {
    const updateItemsPerRow = () => {
      setItemsPerRow(window.innerWidth < 768 ? 2 : 5); // Mobile: 2 item, Desktop: 5 item
    };

    updateItemsPerRow();
    window.addEventListener('resize', updateItemsPerRow);
    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, []);

  const totalItems = movies.length;

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  return (
    <motion.div className={styles.releaseGroup} variants={releaseGroupVariants}>
      {/* Render berdasarkan jumlah baris yang terlihat */}
      {Array.from({ length: visibleRows }).map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {movies
            .slice(rowIndex * itemsPerRow, rowIndex * itemsPerRow + itemsPerRow)
            .map((movie) => (
              <div key={movie.id} className={styles.item}>
                <MovieItem
                  id={movie.id}
                  image={movie.image}
                  title={movie.title}
                  score={movie.score}
                  backdrop={movie.backdrop}
                  overview={movie.overview}
                  date={movie.date}
                  genre={movie.genre}
                  index={undefined} // ✅ Tidak tampilkan number
                />
              </div>
            ))}
        </div>
      ))}

      {/* Tombol Load More hanya muncul jika masih ada item tersembunyi */}
      {visibleRows * itemsPerRow < totalItems && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </motion.div>
  );
};
