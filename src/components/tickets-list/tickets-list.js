/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable default-case */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
      {renderTickets.map((ticket, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>
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

export default compose()(withAviasalesService()(connect(mapStateToProps, mapDispatchToProps)(TicketsList)));
