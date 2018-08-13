import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import pricesReducer from './prices_reducer';
import balancesReducer from './balances_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  prices: pricesReducer,
  balances: balancesReducer
});

export default entitiesReducer;
