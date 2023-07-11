import React from 'react';

import styles from './header.module.scss';
import logo from './Logo.svg';

const HeaderLogo = () => {
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="logo" />
    </header>
  );
};

export default HeaderLogo;
