import { CHEAPER_TICKETS, FASTER_TICKETS, OPTIMAL_TICKETS } from '../actions/action-types';

const initialState = {
  cheaper: true,
  faster: false,
  optimal: false,
};

const sorterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHEAPER_TICKETS:
      return {
        cheaper: true,
        faster: false,
        optimal: false,
      };

    case FASTER_TICKETS:
      return {
        cheaper: false,
        faster: true,
        optimal: false,
      };

    case OPTIMAL_TICKETS:
      return {
        cheaper: false,
        faster: false,
        optimal: true,
      };

    default:
      return state;
  }
};

export default sorterReducer;
