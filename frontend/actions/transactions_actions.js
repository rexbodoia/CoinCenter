import * as ApiUtil from '../util/transactions_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
});

const createTransaction = transaction => ({
  type: CREATE_TRANSACTION,
  transaction
})

export const fetchTransactions = id => dispatch => (
  ApiUtil.fetchTransactions(id).then(transactions => dispatch(receiveTransactions(transactions)))
);


export const sendTransaction = transaction => dispatch => (
  ApiUtil.sendTransaction(transaction).then(transaction => dispatch(createTransaction(transaction)))
)
