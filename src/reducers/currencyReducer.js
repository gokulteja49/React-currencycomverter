const initialState = {
    fromCurrency: "USD",
    toCurrency: "INR",
    amount: 1,
    conversionRate: 100,
    convertedAmount: 100,
  };
  
  const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FROM_CURRENCY':
        return { ...state, fromCurrency: action.payload };
      case 'SET_TO_CURRENCY':
        return { ...state, toCurrency: action.payload };
      case 'SET_AMOUNT':
        return { ...state, amount: action.payload };
      case 'SET_CONVERSION_RATE':
        return { ...state, conversionRate: action.payload, convertedAmount: state.amount * action.payload };
      default:
        return state;
    }
  };
  
  export default currencyReducer;
  