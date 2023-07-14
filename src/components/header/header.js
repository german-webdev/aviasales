import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styles from './header.module.scss';
import logo from './Logo.svg';

const HeaderLogo = ({ loading }) => {
  const logoClasses = classNames(styles.header__logo, {
    [styles.header__logo_rotate]: loading,
  });

  return (
    <header className={styles.header}>
      <img className={logoClasses} src={logo} alt="logo" />
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.tickets.loading,
  };
};

export default connect(mapStateToProps)(HeaderLogo);
