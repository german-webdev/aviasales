import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../header/header';
import FilterTransplant from '../filter-transplant';
import FilterPrices from '../filter-prices';
import TicketsList from '../tickets-list';
import ShowMore from '../show-more';
import withAviasalesService from '../hoc';
import OfflineIndicator from '../offline-indicator';
import { setOfflineStatus } from '../../actions';

import styles from './app.module.scss';

const App = ({ offline, checkOfflineStatus }) => {
  const updateOfflineStatus = () => {
    checkOfflineStatus(!navigator.onLine);
  };

  useEffect(() => {
    updateOfflineStatus();
    window.addEventListener('online', updateOfflineStatus);
    window.addEventListener('offline', updateOfflineStatus);

    return () => {
      window.removeEventListener('online', updateOfflineStatus);
      window.removeEventListener('offline', updateOfflineStatus);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header_box}>{!offline ? <Header /> : <OfflineIndicator />}</div>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <FilterTransplant />
        </aside>
        <section className={styles.section}>
          <div className={styles.app_header}>
            <FilterPrices />
          </div>
          <div className={styles.app_content}>
            <TicketsList />
          </div>
          <div className={styles.app_footer}>
            <ShowMore />
          </div>
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    offline: state.status.offline,
    error: state.status.error,
  };
};

const mapDispatchToProps = {
  checkOfflineStatus: setOfflineStatus,
};

export default withAviasalesService()(connect(mapStateToProps, mapDispatchToProps)(App));
