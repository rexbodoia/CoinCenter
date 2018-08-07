import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const _nullUser = {
  id: null
};

const sessionReducer = (state= {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {id: action.currentUser.id});
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
};

export default sessionReducer;
