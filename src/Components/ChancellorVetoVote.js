import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { startGame } from '../../redux/actions/gameActions';

class ChancellorVeto extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  handleVote = () => {
    this.props.socketEvent({
      type: 'chancellorVetoPolicy',
      payload: {
        gameId: this.props.game.id,
        playerId: this.props.user.id,
      }
    })
  };

  render() {
    return (
      <View style={styles.voteContainer} onPress={this.handleVote}>
        <TouchableOpacity className='accept' style={styles.vote}>
          <Text style={styles.text}> I wish to veto this agenda </Text>
        </TouchableOpacity>
        <TouchableOpacity className='abstain' onPress={this.handleVote} style={styles.vote}>
          <Text style={styles.text}> Abstain from using Veto Power. </Text>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CD5C5C',
    height: '70%',
    width: '100%',
    margin: '2%',
  },

  text: {

  }
})

const mapStateToProps = (state) => {
  return {
    app: state.app,
    user: state.user,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (data) => dispatch(socketEvent(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChancellorVeto);
