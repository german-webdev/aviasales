import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import { addTickets } from '../../actions';

import styles from './show-more.module.scss';

const ShowMore = ({ onAddTickets, filteredTickets, visibleTickets, error }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!filteredTickets.length || visibleTickets === filteredTickets.length || error ? null : (
        <button onClick={onAddTickets} type="button" className={styles.button}>
          <span className={styles.button_text}>Показать еще 5 билетов!</span>
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.status.error,
    tickets: state.tickets.tickets,
    filteredTickets: state.tickets.filteredTickets,
    visibleTickets: state.tickets.visibleTickets,
  };
};

const mapDispatchToProps = {
  onAddTickets: addTickets,
};

export default withAviasalesService()(connect(mapStateToProps, mapDispatchToProps)(ShowMore));
