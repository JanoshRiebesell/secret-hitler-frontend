import {
  username_changed,
  create_user,
  avatar_pressed
} from '../actions';

const user = {
  avatar: undefined,
  id: undefined,
  name: undefined,
}
export default userReducer = (state = user, action) => {
  switch (action.type) {
    case 'username_changed':
      return {
        ...state,
        name: action.payload
      };
    case 'create_user':
      return {
        ...state
      };
    case 'avatar_pressed':
      return {
        ...state,
        avatar: action.payload
      };
    default:
      return state;
  }
};