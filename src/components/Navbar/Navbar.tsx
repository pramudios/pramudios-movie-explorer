import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import NavIcon from '@/assets/movie_icon.svg';
import NavLogo from '@/assets/movie_logo.png';
import CloseIcon from '@/assets/icon-close.svg';
import HamburgerMenu from '@/assets/icon-hamburger.svg';
import SearchIcon from '@/assets/search_icon.png';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useMovie } from '@/context/MovieContext';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchMovie } = useMovie();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };
  return (
    <header className={clsx(styles.header, 'container')}>
      {/* LOGO */}
      <div className={styles.logoMenu}>
        <div className={styles.logo}>
          <NavIcon />
          <span className={styles.textLogo}>Movie</span>
        </div>
        {/* Navbar untuk Desktop */}
        <nav className={styles.desktopMenu}>
          <ul className={styles.desktopNavLinks}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/favorites'>Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Navbar untuk mobile */}
      <nav className={clsx(styles.mobileMenu, { [styles.open]: menuOpen })}>
        {/* Menu Navbar mobile */}
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <img src={NavLogo} alt='Nav Logo' className={styles.navLogo} />
            <span className={styles.textLogo}>Movie</span>
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
            <Link to='/' onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/favorites' onClick={toggleMenu}>
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
          onChange={(e) => searchMovie(e.target.value)} // Reaktif
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
