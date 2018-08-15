import { RECEIVE_TRANSACTIONS } from '../actions/transactions_actions';

const transactionsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}

export default transactionsReducer;
