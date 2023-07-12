import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import ErrorBoundary from '../error-boundry';
import Ticket from '../ticket';
import { ticketLoader } from '../../actions';


const TicketsList = ({ aviasalesService, tickets, onLoadTickets }) => {
  useEffect(() => {
    aviasalesService.getTickets().then(onLoadTickets);
    console.log(tickets.ticketHeader);
  }, []);

  return (
    <ErrorBoundary>
      <ul>
        {
          tickets.map((ticket, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>
                <Ticket ticket={ticket} />
              </li>
            );
          })
        }
        {/* <Ticket/> */}
      </ul>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return { 
    tickets: state.tickets.tickets,
  };
};

const mapDispatchToProps = {
  onLoadTickets: ticketLoader,
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(TicketsList)
);