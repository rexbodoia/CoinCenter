import * as ApiUtil from '../util/prices_api_util';

const granularities = { 'oneMinute': 60, 'fiveMinutes': 300, 'fifteenMinutes': 900, 'oneHour': 3600, 'sixHours': 21600, 'oneDay': 86400 }

export const RECEIVE_PRICES = 'RECEIVE_PRICES';

const receivePrices = (symbol, granularity, prices) => ({
  type: RECEIVE_PRICES,
  symbol, granularity, prices
});

export const fetchPrices = (symbol, granularity) => dispatch => (
  ApiUtil.fetchPriceData(symbol, granularities[granularity]).then(prices => dispatch(receivePrices(symbol, granularities[granularity], prices)))
);
