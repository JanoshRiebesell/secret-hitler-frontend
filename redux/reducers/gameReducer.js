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

export const gameReducer = (state = initialAppState.game, action) => {
 // if (action.type === 'new_game_state' && action.game) return action.game;
  switch (action.type) {
    case 'create_game':
      return {
        ...state,
        game: action.game,
      }

      case 'join_game':
      return {
        ...state,
        game: {
          ...state.game,
          playerList: [
            ...state.game.playerList,
            {
              user: {
                avatar: action.user.avatar,
                id: action.user.id,
                name: action.user.name,
              }
            }
          ]
        }
      }

      case 'start_game':
      return {
        ...state,
        game: action.game
      }

      case 'leave_game':
      return {
        state: initialAppState.game,
      }

      case 'suggest_chancellor':
      return {
        ...state,
        game: {
          ...state.game,
          gameState: {
            ...state.game.gameState,
            suggestedChancellor: action.game.gameState.suggestedChancellor,
          }
        }
      }

      case 'vote_on_chancellor':
      return {
        ...state,
        game: {
          ...state.game,
          playerList: state.game.playerList.map (player => {
            if (player.id === action.playerId) {
              return Object.assign({}, player, {chancellor: true})
            } else {
              return Object.assign({}, player, {chancellor: false})
            }
          })
        }
      }

      case 'pick_policies':
      return {
        ...state,
        game: {
          ...state.game,
          gameState : {
            ...state.game.gameState,
            numberOfFascistPolicies: action.game.gameState.numberOfFascistPolicies,
            numberOfLiberalPolicies: action.game.gameState.numberOfLiberalPolicies
          }
        }
      }

      case 'execute_player':
      return {
        ...state,
        game: {
          ...state.game,
          playerList: state.game.playerList.map (player => {
            if (player.id === action.playerId) {
              return Object.assign({}, player, {executed: true})
            } else {
              return Object.assign({}, player, {executed: false})
            }
          })
        }
      }

      case 'veto_policy':
      return {
        ...state,
        game: {
          ...state.game,
          playerList: state.game.playerList.map (player => {
            if (player.id === action.playerId) {
              return Object.assign({}, player, {vetoPowerUnlocked: true})
            } else {
              return Object.assign({}, player, {vetoPowerUnlocked: false})
            }
          })
        }
      }

  }
  return state;
};



