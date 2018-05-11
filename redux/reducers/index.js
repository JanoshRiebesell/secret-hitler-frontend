import { combineReducers } from 'redux';

import { socketReducer } from './socket.reducer';

import gameReducer  from './gameReducer';

const reducers = combineReducers({
  socketReducer,
  gameReducer,
  userReducer,
  presentationReducer,
});

export default reducers;