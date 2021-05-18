import React, { Component } from 'react';
import PlaidLinkButton from 'react-plaid-link-button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { logoutUser } from '../../store/actions/auth';
import { getAccounts, addAccount, getLinkToken } from '../../store/actions/account';

import Accounts from '../../components/Accounts';

class Dashboard extends Component {
  state = {
    linkToken: ''
  }

  async componentDidMount() {
    const { getAccounts } = this.props;
    const linkToken = await this.props.getLinkToken();
    this.setState({
      linkToken
    });
    await getAccounts();
  }

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    const { logoutUser } = this.props;
    logoutUser();
  };

  // Add account
  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata,
    };
    const { addAccount } = this.props;
    addAccount(plaidData);
  };

  render() {
    const { auth, plaid } = this.props;
    const { user } = auth;
    const { accounts } = plaid;

    let dashboardContent;
    if (!accounts) {
      dashboardContent = <p className="center-align">Loading...</p>;
    } else if (accounts.length > 0) {
      // User has accounts linked
      dashboardContent = <Accounts user={user} accounts={accounts} />
    } else {
      // User has no accounts linked
      dashboardContent = (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome, </b>
              {user.name.split(' ')[0]}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              To get started, link your first bank account below
            </p>
            <div>
              {this.state.linkToken && (<PlaidLinkButton
                buttonProps={{
                  className:
                    'btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn',
                }}
                plaidLinkProps={{
                  clientName: 'Pogo',
                  token: this.state.linkToken,
                  env: 'sandbox',
                  product: ['transactions'],
                  onSuccess: this.handleOnSuccess,
                }}
                onScriptLoad={() => this.setState({ loaded: true })}
              >
                Link Account
              </PlaidLinkButton>)}
            </div>
            <button
              type="button"
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <Helmet>
          <title>Dashboard - Pogo</title>
        </Helmet>
        {dashboardContent}
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  getLinkToken: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  plaid: state.plaid,
});

export default connect(
  mapStateToProps,
  { logoutUser, getAccounts, addAccount, getLinkToken }
)(Dashboard);