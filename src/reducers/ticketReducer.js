import { TICKET_LOADED } from '../actions/action-types';

const initialState = {
  tickets: [],
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_LOADED:
      return {
        tickets: action.payload
      };

    default:
      return state;
  }
};

export default ticketReducer;
