import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialTable from 'material-table'; // https://mbrn.github.io/material-table/#/

import {
  getTransactions,
  addAccount,
  deleteAccount,
} from '../../store/actions/account';
import { logoutUser } from '../../store/actions/auth';

class Accounts extends Component {
  componentDidMount() {
    const { accounts, getTransactions } = this.props;
    getTransactions(accounts);
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const { accounts, addAccount } = this.props;
    const plaidData = {
      public_token: token,
      metadata,
      accounts,
    };
    addAccount(plaidData);
  };

  // Delete account
  onDeleteClick = id => {
    const { accounts, deleteAccount } = this.props;
    const accountData = {
      id,
      accounts,
    };
    deleteAccount(accountData);
  };

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const { user, accounts, transactions } = this.props;

    const accountItems = accounts.map(account => (
      <li key={account._id} style={{ marginTop: '1rem' }}>
        <button
          type="button"
          style={{ marginRight: '1rem' }}
          onClick={this.onDeleteClick.bind(this, account._id)}
          className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3"
        >
          <i className="material-icons">delete</i>
        </button>
        <b>{account.institutionName}</b>
      </li>
    ));

    const transactionsColumns = [
      { title: 'Date', field: 'date', type: 'date', defaultSort: 'desc' },
      { title: 'Name', field: 'name' },
      { title: 'Amount', field: 'amount' },
      { title: 'Category', field: 'category' },
    ];

    const transactionsData = [];
    transactions.forEach(transaction => {
        transactionsData.push({
          date: transaction.date,
          category: transaction.category[0],
          name: transaction.name,
          amount: transaction.amount,
        });
    });

    return (
        <div className="row">
          <div className="col s12">
            <button
              type="button"
              onClick={this.onLogoutClick}
              className="btn-flat waves-effect"
            >
              <i className="material-icons left">keyboard_backspace</i>
              Log Out
            </button>
            <h4>
              <b>Welcome!</b>
            </h4>
            <p className="grey-text text-darken-1">
              Hey there,
              {user.name.split(' ')[0]}
            </p>
            <hr style={{ marginTop: '2rem', opacity: '.2' }} />
            <h5>
              <b>Points: XYZ</b>
            </h5>
            <h5>
              <b>Linked Accounts</b>
            </h5>
            <p className="grey-text text-darken-1">
              Add or remove your bank accounts below
            </p>
            <ul>{accountItems}</ul>
            <hr style={{ marginTop: '2rem', opacity: '.2' }} />
            <h5>
              <b>Transactions</b>
            </h5>
            <React.Fragment>
              <p className="grey-text text-darken-1">
                You have
                <b> {transactionsData.length} </b>
                transactions from your
                <b> {accounts.length} </b>
                linked
                {accounts.length > 1 ? (
                  <span> accounts </span>
                ) : (
                  <span> account </span>
                )}
                from the past 30 days
              </p>
              <MaterialTable
                columns={transactionsColumns}
                data={transactionsData}
                title="Search Transactions"
              />
            </React.Fragment>
            <hr style={{ marginTop: '2rem', opacity: '.2' }} />
            <h5>
              <b>Purchases to Claim</b>
            </h5>
          </div>
        </div>
    );
  }
}

Accounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  plaid: state.plaid,
  transactions: state.plaid.transactions
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Accounts);