import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers/index';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// const loggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action);
//   console.log(store.getState());
//   return result;
// };

const enhancer = composeEnhancers(applyMiddleware());

const store = createStore(rootReducer, enhancer);

export default store;
