import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import pricesReducer from './prices_reducer';
import transactionsReducer from './transactions_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  prices: pricesReducer,
  transactions: transactionsReducer
});

export default entitiesReducer;
