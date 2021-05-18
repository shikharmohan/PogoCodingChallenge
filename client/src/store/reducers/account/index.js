import {
    ADD_ACCOUNT,
    DELETE_ACCOUNT,
    GET_ACCOUNTS,
    GET_TRANSACTIONS,
  } from '../../actions';
  
  const initialState = {
    accounts: [],
    transactions: [],
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_ACCOUNT:
        return {
          ...state,
          accounts: [action.payload, ...state.accounts],
        };
      case DELETE_ACCOUNT:
        return {
          ...state,
          accounts: state.accounts.filter(
            account => account._id !== action.payload
          ),
        };
      case GET_ACCOUNTS:
        return {
          ...state,
          accounts: action.payload,
          
        };
      case GET_TRANSACTIONS:
        return {
          ...state,
          transactions: action.payload,
        };
      default:
        return state;
    }
  }