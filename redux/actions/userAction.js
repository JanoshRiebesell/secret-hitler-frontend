export const usernameChanged = (name) => ({
  type: 'username_changed',
  payload: name
});

export const createUser = ({ avatar, id, name }) => ({
  type: 'create_user',
  payload: { avatar, id, name }
});

export const avatarPressed = (avatar) => ({
  type: 'avatar_pressed',
  payload: avatar
});