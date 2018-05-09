import { combineReducers } from 'redux';

import { socketReducer } from './socket.reducer';

import userReducer  from './userReducer';
import gameReducer  from './gameReducer';

export default combineReducers({
  socketReducer,
  gameReducer,
  userReducer,
});