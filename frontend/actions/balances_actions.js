import * as ApiUtil from '../util/balances_api_util';

export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';

const receiveBalances = balances => ({
  type: RECEIVE_BALANCES,
  balances
});

export const fetchBalances = id => dispatch => (
  ApiUtil.fetchBalances(id).then(balances => dispatch(receiveBalances(balances)))
);
