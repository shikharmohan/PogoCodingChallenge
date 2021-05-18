import axios from 'axios';

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
} from '../index';

// Get Transactions
export const getTransactions = () => dispatch => {
  axios
    .get('/api/plaid/accounts/transactions')
    .then(res => {
      let transactions = [];
      const accounts = res.data;
      accounts.forEach(account => {
        transactions = transactions.concat(account.transactions);
      });
      
      dispatch({
        type: GET_TRANSACTIONS,
        payload: transactions,
      })
    })
    .catch(() =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: [],
      })
    );
};

// Add account
export const addAccount = plaidData => dispatch => {
  const { accounts } = plaidData;
  axios
    .post('/api/plaid/accounts', plaidData)
    .then(res =>
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data,
      })
    )
    .then(data =>
      accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null
    )
    .catch(err => console.log(err));
};

// Delete account
export const deleteAccount = plaidData => dispatch => {
  if (window.confirm('Are you sure you want to remove this account?')) {
    const { id } = plaidData;
    const newAccounts = plaidData.accounts.filter(
      account => account._id !== id
    );
    axios
      .delete(`/api/plaid/accounts/${id}`)
      .then(() =>
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id,
        })
      )
      .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
      .catch(err => console.log(err));
  }
};

// Get all accounts for specific user
export const getAccounts = () => dispatch => {
  axios
    .get('/api/plaid/accounts')
    .then(res =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data,
      })
    )
    .catch(() =>
      dispatch({
        type: GET_ACCOUNTS,
        payload: null,
      })
    );
};

export const getLinkToken = () => async dispatch => {
  const response = await axios.get('/api/plaid/token');

  console.log(response.data);

  return response.data;
}