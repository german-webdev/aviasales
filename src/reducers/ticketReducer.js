import { DATA_LOADED, ADD_TICKETS, FILTERED_TICKETS } from '../actions/action-types';

const initialState = {
  data: {
    stop: false,
    tickets: [],
  },
  filteredTickets: [],
  visibleTickets: 5,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        data: {
          stop: action.payload.stop,
          tickets: [...state.data.tickets, ...action.payload.tickets],
        },
      };

    case ADD_TICKETS:
      return {
        ...state,
        visibleTickets: state.visibleTickets + 5,
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
