import { combineReducers } from 'redux';
import * as accountReducer from './accountReducers';
import * as onlineReducer from './onlineReducers';
import * as gameReducer from './gameReducers';

const rootReducer = combineReducers({
  ...onlineReducer,
  ...gameReducer,
  ...accountReducer
});

export default rootReducer;
