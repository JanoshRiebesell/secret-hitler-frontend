import initialAppState from './initialAppState';

const game = {
  gameOver: false,
  id: undefined,
  gameState: {
    electionFailCount: 0,
    numberOfFascistPolicies: 2,
    numberOfFascists: 0,
    numberOfLiberalPolicies: 3,
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
      id: 'AHAHAHAHAA',
      chancellor: true,
      executed: false,
      faction: 'liberal',
      hitler: false,
      president: false,
      user: {
        avatar: undefined,
        id: 'AHAHAHAHAA',
        name: 'FUCK',
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
