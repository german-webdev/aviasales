import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import ticketReducer from './ticketReducer';
import sorterReducer from './sorterReducer';
import statusReducer from './statusReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  price: sorterReducer,
  tickets: ticketReducer,
  status: statusReducer,
});

export default rootReducer;
