import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  tickets: ticketReducer,
});

export default rootReducer;

