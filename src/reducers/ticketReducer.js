import { 
  TICKET_LOADED,
  ADD_TICKETS,
  STOP_STATUS,
 } from '../actions/action-types';

const initialState = {
  tickets: [],
  visibleTickets: 5,
  stop: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_LOADED:
      return {
        ...state,
        tickets: action.payload
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

    default:
      return state;
  }
};

export default ticketReducer;
