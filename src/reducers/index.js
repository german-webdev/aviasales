import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import ticketReducer from './ticketReducer';
import priceReducer from './priceReducer';

const rootReducer = combineReducers({
  filter: filterReducer,
  price: priceReducer,
  tickets: ticketReducer,
});

export default rootReducer;

