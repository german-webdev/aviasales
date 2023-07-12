import React, { useEffect } from 'react';

import Header from '../header/header';
import FilterTransplant from '../filter-transplant';
import FilterPrices from '../filter-prices';
import TicketsList from '../tickets-list';
import ShowMore from '../show-more';
import withAviasalesService from '../hoc';

import styles from './app.module.scss';

const App = ({ aviasalesService }) => {
  useEffect(() => {
    aviasalesService.getSearchId();
    console.log(aviasalesService.requestTickets());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <aside className={styles.aside}>
          <FilterTransplant />
        </aside>
        <section className={styles.section}>
          <div className={styles.appHeader}>
            <FilterPrices />
          </div>
          <div className={styles.appContent}><TicketsList /></div>
          <div className={styles.appFooter}><ShowMore /></div>
        </section>
      </main>
    </div>
  );
};

export default withAviasalesService()(App);
