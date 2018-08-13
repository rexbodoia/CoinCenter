import * as ApiUtil from '../util/prices_api_util';

export const RECEIVE_PRICES = 'RECEIVE_PRICES';

const receivePrices = prices => ({
  type: RECEIVE_PRICES,
  prices
});

export const fetchPrices = () => dispatch => (
  ApiUtil.fetchPrices().then(prices => dispatch(receivePrices(prices)))
);
