import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Button } from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification';
import { socketEvent } from '../../redux/actions/socket.actions';
import JaNeinVote from '../Screens/JaNeinVote';

class ShowPresident extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: undefined,
      presId: undefined,
    }
  }

  componentWillMount () {
    this.setState({
      id: this.props.user.id
    })
  }

  revealPresident = () => {
    const president = this.props.players.filter(player => {
      if (player.president) {
        return player;
      }
    })
    const presidentId = president[0].id;
    this.setState({
      presId: presidentId
    })
    const presidentName = president[0].user.name;

    if (this.state.id === presidentId) {
      return <Text> Welcome to the Presidency! </Text>
    } else {
      return <Text> {presidentName} is your President this turn. </Text>
    }
  }

  handleClick = () => {
    this.props.socketEvent('acknowledgePresident', {gameId: this.props.game.id})
    if (this.props.user.id === this.state.presId) {
      this.props.navigation.navigate('SelectChancellorScreen')
      // ^^^ replace name of screen
    } else {
      this.props.navigation.navigate('MainBoard')
    }
  }

  render () {
    return (
      <View>
        {this.revealChancellor()}
      <Button
        title="Ready to vote!"
        onPress={this.handleClick}
      />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.user,
  players: state.game.playerList
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowChancellor);
