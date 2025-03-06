import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import NavIcon from '@/assets/movie_icon.svg';
import CloseIcon from '@/assets/icon-close.svg';
import HamburgerMenu from '@/assets/icon-hamburger.svg';
import SearchIcon from '@/assets/search_icon.png';
import clsx from 'clsx';
import { Link } from 'react-scroll';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };
  return (
    <header className={clsx(styles.header, 'container')}>
      {/* LOGO */}
      <div className={styles.logo}>
        <NavIcon />
        <span className={styles.textLogo}>Movie</span>
      </div>

      {/* Navbar untuk mobile */}
      <nav className={clsx(styles.mobileMenu, { [styles.open]: menuOpen })}>
        {/* Menu Navbar mobile */}
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <NavIcon />
          </div>
          <div
            className={styles.closeIcon}
            onClick={toggleMenu}
            role='button'
            aria-label='Close Menu'
          >
            <CloseIcon />
          </div>
        </div>
        <ul className={styles.mobileNavLinks}>
          <li>
            <Link to='home' smooth={true} duration={500} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to='about' smooth={true} duration={500} onClick={toggleMenu}>
              Favorites
            </Link>
          </li>
        </ul>
        <div className={styles.searchContainer}>
          <img
            src={SearchIcon}
            alt='Search Icon'
            className={styles.searchIcon}
          />
          <input
            type='text'
            placeholder='Search Movie'
            className={styles.searchInput}
          />
        </div>
      </nav>

      {/* Navbar untuk Desktop */}
      <nav className={styles.desktopMenu}>
        <ul className={styles.desktopNavLinks}>
          <li>
            <Link to='home' smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to='about' smooth={true} duration={500}>
              Favorites
            </Link>
          </li>
        </ul>
      </nav>

      {/* Button Hire Me untuk Desktop */}
      <div className={styles.searchContainer}>
        <img src={SearchIcon} alt='Search Icon' className={styles.searchIcon} />
        <input
          type='text'
          placeholder='Search Movie'
          className={styles.searchInput}
        />
      </div>

      {/* Hamburger menu */}
      <div
        className={styles.hamburger}
        onClick={toggleMenu}
        role='button'
        aria-label='Open Menu'
      >
        <HamburgerMenu />
      </div>
    </header>
  );
};
