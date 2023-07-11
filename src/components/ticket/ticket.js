import React from 'react';

import styles from './ticket.module.scss';
// import logo from './S7 Logo.svg';

const Ticket = ({ header }) => {
  return (
    <div>
        <div className={styles.ticket}>
          <div className={styles.ticket_header}>
            <span className={styles.ticket_price}>{header.price}</span>
            <span className={styles.ticket_logo}><img src={header.logo} alt="logo" /></span>
          </div>
          <div className={styles.ticket_info}>
            <div className={styles.ticket_infoHeader}>
              <div>MOW – HKT</div>
              <div>В пути</div>
              <div>2 пересадки</div>
            </div>
            <div className={styles.ticket_infoContent}>
              <div>10:45 – 08:00</div>
              <div>21ч 15м</div>
              <div>HKG, JNB</div>
            </div>
          </div>
          <div className={styles.ticket_info}>
            <div className={styles.ticket_infoHeader}>
              <div>MOW – HKT</div>
              <div>В пути</div>
              <div>2 пересадки</div>
            </div>
            <div className={styles.ticket_infoContent}>
              <div>10:45 – 08:00</div>
              <div>21ч 15м</div>
              <div>HKG, JNB</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Ticket;
