import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrencyConverter />
      </div>
    </Provider>
  );
};

export default App;
