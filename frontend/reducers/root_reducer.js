import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import entitiesReducer from './entities_reducer';
import sessionReducer from './sessionReducer';

const rootReducer combineReducers({
  errors: errorsReducer,
  entities: entitiesReducer,
  session: sessionReducer
});

export default rootReducer;
