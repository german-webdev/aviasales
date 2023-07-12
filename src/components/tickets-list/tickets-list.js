import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import ErrorBoundary from '../error-boundry';
import Ticket from '../ticket';
import { ticketLoader } from '../../actions';


const TicketsList = ({ aviasalesService, tickets, onLoadTickets, visibleTickets, cheaper }) => {
  useEffect(() => {
    aviasalesService.getTickets().then(onLoadTickets);
  }, []);

  const filter = (arr) => {
    let result;
    if (cheaper) {
      result = arr.sort((a, b) => a.price - b.price);
    }
    return result;
  };

  return (
    <ErrorBoundary>
      <ul>
        {
          filter(tickets).slice(0, visibleTickets).map((ticket, i) => {
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
    tickets: state.tickets.tickets,
    visibleTickets: state.tickets.visibleTickets,
    cheaper: state.price.cheaper,
    faster: state.price.faster,
    optimal: state.price.optimal,
  };
};

const mapDispatchToProps = {
  onLoadTickets: ticketLoader,
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(TicketsList)
);