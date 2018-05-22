import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Button } from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification';
import { socketEvent } from '../../redux/actions/socket.actions';
import JaNeinVote from '../Components/JaNeinVote';

class ShowChancellor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      chancId: undefined,
    }
  }

  componentWillMount () {
    this.setState({
      id: this.props.user.id
    })
  }

  getChancellor = () => {
    const chancellor = this.props.players.filter(player => {
      return player.chancellor
    })

    const chancellorId = chancellor.id
    const chancellorName = chancellor.user.name
    this.setState({
      chancId: chancellorId,
      chancName: cha
    })
  }

  revealChancellor = () => {
    const chancellor = this.getChancellor();
    const chancellorId = chancellor[0].id;
    const chancellorName = chancellor[0].user.name;

    if (this.props.user.id === chancellorId) {
      return <Text> You have been chosen as Chancellor </Text>
    } else {
      return <Text> {chancellorName} was nominated as Chancellor. Time to cast your vote </Text>
    }
  }

  goToVote = () => {
    this.props.socketEvent({
      type: 'acknowledgeChancellor',
      payload: {
        gameId: this.props.game.id
      }
    })
    this.props.navigation.navigate('JaNeinVote')
  }

  render () {
    return (
      <View>
        {this.revealChancellor()}
      <Button
        title="Ready to vote!"
        onPress={this.goToVote}
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
  socketEvent: (data) => dispatch(socketEvent(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowChancellor);
