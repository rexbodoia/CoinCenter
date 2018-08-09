import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, REMOVE_ERRORS } from '../actions/session_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors;
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;
