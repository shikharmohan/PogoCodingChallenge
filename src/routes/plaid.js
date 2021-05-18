import { Router } from 'express';

import * as plaidController from '../controllers/plaid';
import { authenticate } from '../middleware/auth';

const router = Router();

// POST /api/plaid/accounts
router.route('/accounts').all(authenticate).post(plaidController.addAccount);
// DELETE /api/plaid/accounts/:id
router.route('/accounts/:id').all(authenticate).delete(plaidController.deleteAccount);
// GET /api/plaid/accounts
router.route('/accounts').all(authenticate).get(plaidController.getAccounts);
// GET /api/plaid/accounts/transactions
router.route('/accounts/transactions').all(authenticate).get(plaidController.getTransactions);
// // GET /api/plaid/token
router.route('/token').all(authenticate).get(plaidController.getLinkToken);

export default router;
