import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Notification from '../Components/notification';
import JaNeinVote from '../Components/JaNeinVote';
import PlayerList from '../Components/PlayerList';
import MainBoard from './mainBoard';

import { socketEvent } from '../../redux/actions/socket.actions';

class VoteOnChancellor extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View>
        <View>
          <JaNeinVote handleVote={this.props.handleVote}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VoteOnChancellor);
