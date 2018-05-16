import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { socketEvent} from '../../redux/actions/socket.actions';
import MainBoard from '../Screens/mainBoard'

class JaNeinVote extends Component {
  constructor (props) {
    super(props)
  }

  getCurrentPlayerId = () => {
    this.props.players.filter(player => {
      if (player.user.id === this.props.user.id) {
        return id;
      }
    })
  }

  handleJaVote = () => {
    const { app, user } = this.props;
    this.props.socketEvent('voteOnChancellor', {gameId: this.props.game.id, playerId: this.getCurrentPlayerId(), vote:'ja'});
    this.props.navigation.navigate('MainBoard');
    // navigate back to board and see others' votes
  };

  handleNeinVote = () => {
    const { app, user } = this.props;
    this.props.socketEvent('voteOnChancellor', {gameId: this.props.game.id, playerId: this.getCurrentPlayerId(), vote:'nein'});
    this.props.navigation.navigate('MainBoard');
    // navigate back to board and see others' votes
  };


  render() {
    return (
      <View style={styles.voteContainer}>
        <TouchableOpacity className='JA' style={styles.vote} onPress={this.handleJaVote}>
          <ImageBackground source={require('../assets/JA.png')} style={{flex: 1, width:'100%'}} />
        </TouchableOpacity>
        <TouchableOpacity className='NEIN' onPress={this.handleNeinVote} style={styles.vote}>
          <ImageBackground source={require('../assets/NEIN.png')} style={{flex: 1, width:'100%'}} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  voteContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  vote: {
    flex: 2,
    backgroundColor: 'transparent',
    height: '70%',
    width: '100%',
    margin: '2%',
  }
})

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer,
    players: state.gameReducer.playerList,
    user: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JaNeinVote);
