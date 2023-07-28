import { v4 as id } from 'uuid';
import PropTypes from 'prop-types';

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

        {ticket.segments.map((body) => {
          return (
            <div key={id()} className={styles.ticket__info}>
              <div className={styles.ticket__info_col_1}>
                <div>
                  {body.from} – {body.to}
                </div>
                <div>{body.timeOfPath}</div>
              </div>
              <div className={styles.ticket__info_col_2}>
                <div>В пути</div>
                <div>{convertDuration(body.duration)}</div>
              </div>
              <div className={styles.ticket__info_col_3}>
                <div>{stopsCount(body)}</div>
                <div>{body.stops.join(', ')}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        timeOfPath: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        stops: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Ticket;
