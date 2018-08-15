import * as ApiUtil from '../util/transactions_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
});

export const fetchTransactions = id => dispatch => (
  ApiUtil.fetchTransactions(id).then(transactions => dispatch(receiveTransactions(transactions)))
);
