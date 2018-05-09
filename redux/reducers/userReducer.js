const user = {
  avatar: undefined,
  id: undefined,
  name: undefined,
}

export const user = (state = user, action) => {
  switch (action.type) {
    case 'create_user':
    return {
      state,
      user: {
        avatar: action.payload.avatar,
        id: action.payload.id,
        name: action.payload.name
      }
    }
  }

  return state
}