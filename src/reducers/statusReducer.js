import {
  TICKET_STATUS_LOADING,
  TICKET_STATUS_REQUEST,
  SET_OFFLINE_STATUS,
  SET_ERROR_STATUS,
} from '../actions/action-types';

const initialState = {
  loading: false,
  error: false,
  offline: false,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_STATUS_LOADING:
      return {
        ...state,
        loading: false,
      };

    case TICKET_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_OFFLINE_STATUS:
      return {
        ...state,
        offline: action.payload,
      };

    case SET_ERROR_STATUS:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default statusReducer;
