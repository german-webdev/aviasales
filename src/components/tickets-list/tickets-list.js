import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withAviasalesService from '../hoc';
import compose from '../../utils/compose';
import ErrorBoundary from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import Ticket from '../ticket';
import {
  ticketLoader,
  setFilteredTickets,
  setStopStatus,
  ticketLoading,
  ticketRequest,
  setErrorStatus,
} from '../../actions';
import { filter } from '../auxiliary';

const TicketsList = ({
  aviasalesService,
  tickets,
  visibleTickets,
  onLoadTickets,
  onSetFilteredTickets,
  onSetStopStatus,
  setTicketRequest,
  setTicketLoading,
  onError,
  cheaper,
  faster,
  optimal,
  checkedList,
  filteredTickets,
  stop,
  loading,
  offline,
  error,
}) => {
  let id = 1;

  const fetchTickets = async () => {
    await aviasalesService.getTickets().then(onLoadTickets).catch(onError);
    await aviasalesService.checkSearchStatus().then(onSetStopStatus).catch(onError);
  };

  useEffect(() => {
    aviasalesService.getSearchId();
  }, []);

  useEffect(() => {
    onSetFilteredTickets(filter(tickets, cheaper, faster, optimal, checkedList));

    let intervalRequest;
    if ((stop && tickets.length > 0) || offline || error) {
      setTicketLoading();
      clearInterval(intervalRequest);
    } else {
      setTicketRequest();
      intervalRequest = setInterval(fetchTickets, 1000);
    }

    return () => {
      clearInterval(intervalRequest);
    };
  }, [stop, offline, error, cheaper, faster, optimal, checkedList, onSetFilteredTickets, tickets]);

  const renderTickets = filteredTickets.slice(0, visibleTickets);

  const onAirTickets = (
    <ul>
      {renderTickets.map((ticket) => (
        <li key={id++}>
          <Ticket ticket={ticket} />
        </li>
      ))}
    </ul>
  );

  const errorMessage = error ? <ErrorIndicator /> : null;

  const content = !error ? onAirTickets : null;
  const searching =
    loading && !error && !renderTickets.length && checkedList.length ? (
      <span>&quot;Ищу билеты для Вас...&quot;</span>
    ) : null;
  const nothing =
    !checkedList.length && !error ? <span>&quot;Рейсов, подходящих под заданные фильтры, не найдено&quot;</span> : null;

  return (
    <ErrorBoundary>
      {content}
      {searching}
      {nothing}
      {errorMessage}
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.status.error,
    offline: state.status.offline,
    stop: state.status.stop,
    tickets: state.tickets.tickets,
    filteredTickets: state.tickets.filteredTickets,
    visibleTickets: state.tickets.visibleTickets,
    cheaper: state.price.cheaper,
    faster: state.price.faster,
    optimal: state.price.optimal,
    checkedList: state.filter.checkedList,
    loading: state.status.loading,
  };
};

const mapDispatchToProps = {
  onLoadTickets: ticketLoader,
  onSetFilteredTickets: setFilteredTickets,
  onSetStopStatus: setStopStatus,
  setTicketRequest: ticketRequest,
  setTicketLoading: ticketLoading,
  onError: setErrorStatus,
};

TicketsList.propTypes = {
  aviasalesService: PropTypes.shape({
    getTickets: PropTypes.func.isRequired,
    checkSearchStatus: PropTypes.func.isRequired,
    getSearchId: PropTypes.func.isRequired,
  }).isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  visibleTickets: PropTypes.number.isRequired,
  onLoadTickets: PropTypes.func.isRequired,
  onSetFilteredTickets: PropTypes.func.isRequired,
  onSetStopStatus: PropTypes.func.isRequired,
  setTicketRequest: PropTypes.func.isRequired,
  setTicketLoading: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  cheaper: PropTypes.bool.isRequired,
  faster: PropTypes.bool.isRequired,
  optimal: PropTypes.bool.isRequired,
  checkedList: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredTickets: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  stop: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  offline: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const withTicketsList = compose(withAviasalesService(), connect(mapStateToProps, mapDispatchToProps));

export default withTicketsList(TicketsList);
