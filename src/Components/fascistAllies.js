import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import MainBoard from '../Screens/mainBoard';
import { socketEvent} from '../../redux/actions/socket.actions';

class FascistAllies extends Component {
  renderAllies = () => {
    const allies = this.props.players.map(player => {
      if (role === 'fascist' && player.id !== this.props.user.id && player.faction === 'fascist') {
        <View> {player.name} </View>
      }
      return allies
    })
  }

  render() {
    return (
      <View>
        {this.renderAllies()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game.gameState,
  user: state.user
})

export default connect(mapStateToProps, null)(FascistAllies);
