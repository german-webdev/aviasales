const initialState = {
  ticketHeader: []
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ALL_TICKETS':
      return {
        ticketHeader: action.payload,
      };

    default:
      return state;
  }
};

export default ticketReducer;
