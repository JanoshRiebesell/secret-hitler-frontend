import { combineReducers } from 'redux';

import { socketReducer } from './socket.reducer';

export default combineReducers({
  socketReducer,
});