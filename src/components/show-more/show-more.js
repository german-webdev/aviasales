import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import { addTickets, setStopStatus } from '../../actions';

import styles from './show-more.module.scss';

const ShowMore = ({ onAddTickets, aviasalesService, checkStopStatus, stop }) => {
  useEffect(() => { 
    aviasalesService.requestTickets().then((data) => checkStopStatus(data.stop));
   ;
    console.log('stop', aviasalesService.requestTickets(checkStopStatus));
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {stop === false && (
        <button onClick={onAddTickets} type="button" className={styles.button}>
          <span className={styles.button_text}>
            Показать еще 5 билетов!
          </span>
        </button>)}
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    stop: state.tickets.stop,
    tickets: state.tickets.tickets,
    visibleTickets: state.tickets.visibleTickets,
  };
};

const mapDispatchToProps = {
  onAddTickets: addTickets,
  checkStopStatus: setStopStatus,
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(ShowMore)
);