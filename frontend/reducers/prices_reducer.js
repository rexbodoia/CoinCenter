import { RECEIVE_PRICES } from '../actions/prices_actions';
import { merge } from 'lodash';

const granularities = { 60: 'oneMinute', 300: 'fiveMinutes', 900: 'fifteenMinutes', 3600: 'oneHour', 21600: 'sixHours', 86400: 'oneDay' }

const pricesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRICES:
      let coin = { [action.symbol]: action.prices };
      let timeframe = { [granularities[action.granularity]]: coin };
      return merge({}, state, timeframe);
    default:
      return state;
  }
};

export default pricesReducer;
