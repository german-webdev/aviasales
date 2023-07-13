/* eslint-disable default-case */
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import ErrorBoundary from '../error-boundry';
import Ticket from '../ticket';
import { ticketLoader } from '../../actions';


const TicketsList = ({ aviasalesService, tickets, onLoadTickets, visibleTickets, cheaper, faster, optimal, checkedList }) => {

  const filter = useCallback((arr) => {
    let result;
  
    switch (true) {
      case cheaper:
        result = [...arr].sort((a, b) => a.price - b.price);
        break;
      case faster:
        result = [...arr].sort((a, b) => {
          const durationA = a.segments.reduce((total, segment) => total + segment.duration, 0);
          const durationB = b.segments.reduce((total, segment) => total + segment.duration, 0);
          return durationA - durationB;
        });
        break;
      case optimal:
        result = [...arr].sort((a, b) => {
          const stopsCountA = a.segments.reduce((total, segment) => total + segment.stops.length, 0);
          const stopsCountB = b.segments.reduce((total, segment) => total + segment.stops.length, 0);
  
          if (stopsCountA !== stopsCountB) {
            return stopsCountA - stopsCountB;
          }
          return a.price - b.price;
        });
        break;
      default:
        result = arr;
    }
  
    result = result.filter(ticket => {
      const fromStopsCount = ticket.segments[0].stops.length;
      const toStopsCount = ticket.segments[1].stops.length;
      const fromIncluded = checkedList.includes(`${fromStopsCount}`);
      const toIncluded = checkedList.includes(`${toStopsCount}`);
  
      return fromIncluded && toIncluded;
    });
  
    return result;
  }, [checkedList, cheaper, faster, optimal]);

  const renderTickets = filter(tickets).slice(0, visibleTickets);

  useEffect(() => {
    aviasalesService.getTickets().then(onLoadTickets);
  }, []);

  return (
    <ErrorBoundary>
      <ul>
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
    visibleTickets: state.tickets.visibleTickets,
    cheaper: state.price.cheaper,
    faster: state.price.faster,
    optimal: state.price.optimal,
    checkedList: state.filter.checkedList,
  };
};

const mapDispatchToProps = {
  onLoadTickets: ticketLoader,
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(TicketsList)
);