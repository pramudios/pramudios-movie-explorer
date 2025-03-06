import React from 'react';
import styles from './Hero.module.scss';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export const Hero: React.FC = () => {
  return (
    <main>
      <section className={clsx(styles.hero)}>
        <div className={styles.overflowWrapper}>
          <div className={styles.container}>
            {/* title */}
            <h1 className={styles.title}>The Gorge</h1>

            {/* description */}
            <p className={styles.description}>
              Two highly trained operatives grow close from a distance after
              being sent to guard opposite sides of a mysterious gorge. When an
              evil below emerges, they must work together to survive what lies
              within.
            </p>

            {/* Container untuk kedua tombol */}
            <div className={styles.buttonContainer}>
              <Button
                as='a'
                href='#'
                className={styles.ctaButton}
                variant='primary'
              >
                Watch Trailer
              </Button>

              <Button
                as='a'
                href='#'
                className={styles.ctaButton}
                variant='secondary'
              >
                See Detail
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
