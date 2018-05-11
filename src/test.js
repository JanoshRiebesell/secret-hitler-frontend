import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {createUser } from '../redux/actions/userAction';
import {createGame } from '../redux/actions/gameActions';


class Test extends Component {
  constructor(props) {
    super(props);
  }

  handleUser = () => {
    this.props.createUser({
      avatar: 'yellow', id: 1234, name: 'Diegopro'
    })
  }
  handleGame = () => {
    this.props.createGame({
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
    })
  }

  render () {
    console.warn('these are the props', this.props)
    return (
      <View>
        {this.handleUser()}
        {this.handleGame()}
       <Text> poop please </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  game : state.game,
})

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUser(user)),
  createGame: game => dispatch(createGame(game)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Test);