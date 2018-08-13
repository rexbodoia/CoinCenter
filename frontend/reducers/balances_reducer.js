import { RECEIVE_BALANCES } from '../actions/balances_actions';

const balancesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BALANCES:
      return action.balances
    default:
      return state
  }
}

export default balancesReducer;
