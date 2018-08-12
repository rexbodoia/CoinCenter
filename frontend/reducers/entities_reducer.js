import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import pricesReducer from './prices_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  prices: pricesReducer
});

export default entitiesReducer;
