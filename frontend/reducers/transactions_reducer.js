import { RECEIVE_TRANSACTIONS, CREATE_TRANSACTION } from '../actions/transactions_actions';
import { merge } from 'lodash';

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      return action.transactions
    case CREATE_TRANSACTION:
      return merge({}, state, action.transaction);
    default:
      return state
  }
}

export default transactionsReducer;
