/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable default-case */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import ErrorBoundary from '../error-boundry';
import Ticket from '../ticket';
import { ticketLoader, setFilteredTickets, setStopStatus, ticketLoading, ticketRequest } from '../../actions';


const TicketsList = ({ aviasalesService, tickets, onLoadTickets, visibleTickets, cheaper, faster, optimal, checkedList, onSetFilteredTickets, filteredTickets, onSetStopStatus, stop, setTicketRequest, setTicketLoading }) => {

  const filter = () => {
    let filtered = [...tickets];

    switch (true) {
      case cheaper:
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case faster:
        filtered = filtered.sort((a, b) => {
          const durationA = a.segments.reduce((total, segment) => total + segment.duration, 0);
          const durationB = b.segments.reduce((total, segment) => total + segment.duration, 0);
          return durationA - durationB;
        });
        break;
      case optimal:
        filtered = filtered.sort((a, b) => {
          const stopsCountA = a.segments.reduce((total, segment) => total + segment.stops.length, 0);
          const stopsCountB = b.segments.reduce((total, segment) => total + segment.stops.length, 0);

          if (stopsCountA !== stopsCountB) {
            return stopsCountA - stopsCountB;
          }
          return a.price - b.price;
        });
        break;
      default:
        break;
    }

    filtered = filtered.filter(ticket => {
      const fromStopsCount = ticket.segments[0].stops.length;
      const toStopsCount = ticket.segments[1].stops.length;
      const fromIncluded = checkedList.includes(`${fromStopsCount}`);
      const toIncluded = checkedList.includes(`${toStopsCount}`);

      return fromIncluded && toIncluded;
    });

    return filtered;
  };

  const intervalRef = useRef(null);

  const fetchTickets = async () => {
    try {
      await aviasalesService.getTickets().then(onLoadTickets);
      await aviasalesService.checkSearchStatus().then(onSetStopStatus);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    aviasalesService.getTickets().then(onLoadTickets);
    aviasalesService.checkSearchStatus().then(onSetStopStatus);
  }, []);

  useEffect(() => {
    if (stop && tickets.length > 0) {
      setTicketLoading();
      clearInterval(intervalRef.current);
    } else {
      setTicketRequest();
      intervalRef.current = setInterval(fetchTickets, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [stop]);

  useEffect(() => {
      onSetFilteredTickets(filter());
  }, [cheaper, faster, optimal, checkedList, onSetFilteredTickets, tickets]);

  const renderTickets = filteredTickets.slice(0, visibleTickets);

  return (
    <ErrorBoundary>
      <ul onChange={onSetStopStatus}>
        {
          renderTickets.map((ticket, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>
                <Ticket ticket={ticket} />
              </li>
            );
          })
        }
      </ul>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return { 
    stop: state.tickets.stop,
    tickets: state.tickets.tickets,
    filteredTickets: state.tickets.filteredTickets,
    visibleTickets: state.tickets.visibleTickets,
    cheaper: state.price.cheaper,
    faster: state.price.faster,
    optimal: state.price.optimal,
    checkedList: state.filter.checkedList,
  };
};

const mapDispatchToProps = {
  onLoadTickets: ticketLoader,
  onSetFilteredTickets: setFilteredTickets,
  onSetStopStatus: setStopStatus,
  setTicketRequest: ticketRequest,
  setTicketLoading: ticketLoading,
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(TicketsList)
);