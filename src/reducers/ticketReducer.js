import { 
  TICKET_LOADED,
  ADD_TICKETS,
  STOP_STATUS,
  FILTERED_TICKETS,
 } from '../actions/action-types';

const initialState = {
  tickets: [],
  filteredTickets: [],
  visibleTickets: 5,
  stop: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_LOADED:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };

    case ADD_TICKETS:
      return {
        ...state,
        visibleTickets: state.visibleTickets + 5
      };

    case STOP_STATUS:
      return {
        ...state,
        stop: action.payload,
      };

    case FILTERED_TICKETS:
      return {
        ...state,
        filteredTickets: action.payload,
      };

    default:
      return state;
  }
};

export default ticketReducer;
