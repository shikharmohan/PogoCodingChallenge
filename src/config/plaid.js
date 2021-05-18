import plaid from 'plaid';

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

export default client;