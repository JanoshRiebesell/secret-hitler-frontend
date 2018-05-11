export const createGame = (game) => ({
  type: 'create_game',
  payload: game
})

export const joinGame = (game) => ({
  type: 'join_game',
  payload: game
})

export const startGame = (game) => ({
  type: 'start_game',
  payload: game
})

export const leaveGame = (game) => ({
  type: 'leave_game',
  payload: game
})

export const suggestChancellor = (player) => ({
  type: 'suggest_chancellor',
  payload: player
})

export const voteOnChancellor = (vote) => ({
  type: 'vote_on_chancellor',
  payload: vote
})

export const pickPolicies = (policies) => ({
  type: 'pick_policies',
  payload: policies
})

export const executePlayer = (player) => ({
  type: 'execute_player',
  payload: player
})

export const vetoPolicy = (veto) => ({
  type: 'veto_policy',
  payload: veto
})



