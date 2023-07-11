import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withAviasalesService from '../hoc';
import ErrorBoundary from '../error-boundry';
import Ticket from '../ticket';
import { setHeaderTickets } from '../../actions';


const TicketsList = ({ aviasalesService, ticketHeader }) => {
  useEffect(() => {
    aviasalesService.getHeaderInfo().then(setHeaderTickets);
    console.log('ticket', aviasalesService.getHeaderInfo().then(setHeaderTickets));
    console.log('header', ticketHeader);
  }, []);

  return (
    <ErrorBoundary>
      <ul>
        { 
          ticketHeader.map((header, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>
                <Ticket header={header}/>
              </li>
            );
          })
        }
      </ul>
    </ErrorBoundary>
  );
};

const mapStateToProps = ({ ticketHeader }) => {
  return { ticketHeader };
};

const mapDispatchToProps = {
  setHeaderTickets
};

export default withAviasalesService()(
  connect(mapStateToProps, mapDispatchToProps)(TicketsList)
);