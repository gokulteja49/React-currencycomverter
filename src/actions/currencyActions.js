export const setFromCurrency = (currency) => ({
    type: 'SET_FROM_CURRENCY',
    payload: currency,
  });
  
  export const setToCurrency = (currency) => ({
    type: 'SET_TO_CURRENCY',
    payload: currency,
  });
  
  export const setAmount = (amount) => ({
    type: 'SET_AMOUNT',
    payload: amount,
  });
  
  export const setConversionRate = (rate) => ({
    type: 'SET_CONVERSION_RATE',
    payload: rate,
  });
  