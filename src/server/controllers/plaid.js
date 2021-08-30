import sanitizeHtml from 'sanitize-html';
import moment from 'moment';

import Account from '../models/Account';
import client from '../config/plaid';

/**
 * @route POST /api/plaid/accounts
 *
 * @description Add a new account
 *
 *
 * @param public_token : String
 * @param metadata : Object
 */
const addAccount = (req, res) => {
  const publicToken = sanitizeHtml(req.body.public_token);
  const userId = sanitizeHtml(req.user._id);
  const institution = req.body.metadata.institution;

  const { name, institution_id } = institution;

  if (publicToken) {
    client
      .exchangePublicToken(publicToken)
      .then(exchangeResponse => {

        const accessToken = exchangeResponse.access_token;
        const itemId = exchangeResponse.item_id;// Check if account already exists for specific user

        Account
          .findOne({
            userId: req.user._id,
            institutionId: institution_id
          })
          .then(account => {
            if (account) {
              return res.status(400).send("Account already exists");
            }
            const newAccount = new Account({
              userId,
              accessToken,
              itemId,
              institutionId: institution_id,
              institutionName: name
            });

            newAccount
              .save()
              .then(account => res.status(201).json(account))
              .catch(err => res.status(500).send(err)); // Mongo Error
          })
          .catch(err => res.status(500).send(err)); // Mongo Error
      })
      .catch(err => res.status(500).send(err)); // Plaid Error
  }
};

/**
 * @route DELETE /api/plaid/accounts/:id
 *
 * @description Delete an account
 *
 */
const deleteAccount = (req, res) => {
  Account
    .findById(req.params.id)
    .then(async account => {
      // Delete account
      await account.remove();

      return res.json({ success: true });
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * @route GET /api/plaid/accounts
 *
 * @description Get list of all accounts
 *
 */
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });

    return res.json(accounts);
  } catch (err) {
    return res.status(500).send(err)
  }
};

/**
 * @route GET /api/plaid/token
 *
 * @description Get link token
 *
 */
 const getLinkToken = async (req, res) => {
   try {
    const response = await client.createLinkToken({
      user: {
        client_user_id: req.user.id,
      },
      client_name: 'Pogo',
      products: ["transactions"],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });
  
    return res.json(response.link_token);
   } catch (err) {
     return res.status(500).send(err);
   }
};



/**
 * @route GET /api/plaid/accounts/transactions
 *
 * @description Get list of all transactions for the past 30 days from all linked accounts
 *
 */
const getTransactions = async (req, res) => {
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");

  let transactions = [];
  const accounts = await Account.find({ userId: req.user.id });

  if (accounts) {
    accounts.forEach(function (account) {
      const accessToken = account.accessToken;
      const institutionName = account.institutionName;
      client
        .getTransactions(accessToken, thirtyDaysAgo, today)
        .then(response => {
          transactions.push({
            accountName: institutionName,
            transactions: response.transactions
          });

          // Don't send back response till all transactions have been added
          if (transactions.length === accounts.length) {
            res.json(transactions);
          }
        })
        .catch(err => res.status(500).send(err));
    });
  }
};

export {
  addAccount,
  deleteAccount,
  getAccounts,
  getLinkToken,
  getTransactions,
};
