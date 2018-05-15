import { combineReducers } from 'redux';

import { socketReducer } from './socket.reducer';
import gameReducer  from './gameReducer';
import userReducer  from './userReducer';
import playerListReducer from './playerListReducer';


const reducers = combineReducers({
  socket: socketReducer,
  user: userReducer,
  game: gameReducer,
  // playerListReducer,
});

export default reducers;
