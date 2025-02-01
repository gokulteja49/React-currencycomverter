import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFromCurrency, setToCurrency, setAmount, setConversionRate } from '../actions/currencyActions';
import axios from 'axios';
import { countryList } from '../countryList'; // Make sure this path is correct
import './styles.css';

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, convertedAmount, conversionRate } = useSelector(state => state);

  // Default to India (INR) and USA (USD)
  const defaultFromCurrency = 'INR';
  const defaultToCurrency = 'USD';

  // Check if countryList is available, if not set a default object
  const availableCountries = countryList || {};

  useEffect(() => {
    if (!fromCurrency) {
      dispatch(setFromCurrency(defaultFromCurrency)); // Set default "from" currency to INR
    }
    if (!toCurrency) {
      dispatch(setToCurrency(defaultToCurrency)); // Set default "to" currency to USD
    }
  }, [fromCurrency, toCurrency, dispatch]);

  useEffect(() => {
    const fetchConversionRate = async () => {
      if (!fromCurrency || !toCurrency) return;
      try {
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}.json`);
        dispatch(setConversionRate(response.data[toCurrency.toLowerCase()]));
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, [fromCurrency, toCurrency, amount, dispatch]);

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    dispatch(setAmount(newAmount));
  };

  const getFlag = (currencyCode) => {
    if (!currencyCode || !availableCountries[currencyCode]) {
      return ''; // Return a default image or placeholder if currency is invalid
    }
    return `https://flagsapi.com/${availableCountries[currencyCode]}/flat/64.png`;
  };

  return (
    <div className="container">
      <form>
        <div className="amount">
          <h3>Enter Amount</h3>
          <input type="text" value={amount} onChange={handleAmountChange} placeholder="Enter Amount" />
        </div>

        <div className="items">
          <div className="item1">
            <div className="from">
              <img src={getFlag(fromCurrency)} alt={fromCurrency} />
              <select value={fromCurrency} onChange={(e) => dispatch(setFromCurrency(e.target.value))}>
                <option value="INR">INR - India</option>
                <option value="USD">USD - USA</option>
              </select>
            </div>
          </div>
          <span>to</span>
          <div className="item2">
            <div className="to">
              <img src={getFlag(toCurrency)} alt={toCurrency} />
              <select value={toCurrency} onChange={(e) => dispatch(setToCurrency(e.target.value))}>
                <option value="INR">INR - India</option>
                <option value="USD">USD - USA</option>
              </select>
            </div>
          </div>
        </div>

        <h4>{`${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}`}</h4>

        <button type="submit" onClick={(e) => e.preventDefault()}>Check Exchange Rate</button>
      </form>
    </div>
  );
};

export default CurrencyConverter;
