import initialAppState from './initialAppState';

export const socketReducer = (state = initialAppState.socket, action) => {
  switch (action.type) {
    case 'update_socket':
    return {...state, ...action.data}
    default:
    return state;
  }
}