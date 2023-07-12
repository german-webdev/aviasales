import React from 'react';

import styles from './ticket.module.scss';
// import logo from './S7 Logo.svg';

const Ticket = ({ ticket }) => {
  return (
    <div>
        <div className={styles.ticket}>
          <div className={styles.ticket_header}>
            <span className={styles.ticket_price}>{ticket.price}</span>
            <span className={styles.ticket_logo}><img src={ticket.logo} alt="logo" /></span>
          </div>

          {ticket.segments.map((body, i) => {
            const stopsCount = () => {
              let stops = null;
              if (body.stops.length) {
                if (body.stops.length === 1) {
                  stops = <div>{body.stops.length} пересадка</div>;
                } else {
                  stops = <div>{body.stops.length} пересадки</div>;
                }
              } else {
                stops = <div>Без пересадок</div>;
              }
              
              return stops;
              
            };

            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className={styles.ticket_info}>
                <div className={styles.ticket_infoHeader}>
                  <div>{body.from} – {body.to}</div>
                  <div>В пути</div>
                  {stopsCount()}
                </div>
                <div className={styles.ticket_infoContent}>
                  <div>{body.timeOfPath}</div>
                  <div>{body.duration}</div>
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
