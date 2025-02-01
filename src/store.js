// src/store.js
import { createStore, combineReducers } from 'redux';
import currencyReducer from './reducers/currencyReducer';  // Make sure this path is correct

const rootReducer = combineReducers({
  currency: currencyReducer,  // Combine your reducers here
  // other reducers if you have them
});

const store = createStore(rootReducer);

export default store;
