const game =  {
  gameOver: false,
  id: undefined,
  gameState: {
    electionFailCount: 0,
    numberOfFascistPolicies: 0,
    numberOfFascists: 0,
    numberOfLiberalPolicies: 0,
    numberOfLiberals: 0,
    turnCount: 0,
    vetoPowerUnlocked: false,
    suggestedChancellor: undefined,
  },
  initiator: {
    avatar: undefined,
    id: undefined,
    name: undefined,
  },
  playerList: [
    {
      id: undefined,
      chancellor: false,
      executed: false,
      hitler: false,
      president: false,
      user: {
        avatar: undefined,
        id: undefined,
        name: undefined,
      }
    },
  ],
}

export default gameReducer = (state = game, action) => {
  switch (action.type) {
    case 'create_game':
    return {
      ...state,
      game: action.payload
    }
  }
  return state;
};

