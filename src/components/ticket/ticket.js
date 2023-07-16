import React from 'react';

import { getPrice, convertDuration, stopsCount } from '../auxiliary';

import styles from './ticket.module.scss';

const Ticket = ({ ticket }) => {
  return (
    <div>
      <div className={styles.ticket}>
        <div className={styles.ticket__header}>
          <span className={styles.ticket__price}>{getPrice(ticket.price)} P</span>
          <span className={styles.ticket__logo}>
            <img src={ticket.logo} alt="logo" />
          </span>
        </div>

        {ticket.segments.map((body, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={styles.ticket__info}>
              <div className={styles.ticket__info_header}>
                <div>
                  {body.from} – {body.to}
                </div>
                <div>В пути</div>
                {stopsCount(body)}
              </div>
              <div className={styles.ticket__info_content}>
                <div>{body.timeOfPath}</div>
                <div>{convertDuration(body.duration)}</div>
                <div>{body.stops.join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ticket;
