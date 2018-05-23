import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { startGame } from '../../redux/actions/gameActions';

class PresidentVeto extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  acceptVeto = () => {
    const { app, user } = this.props;
    this.props.socketEvent('givePresidentChanceToConfirmVeto', {playerId: user.id, gameId: app.gameId, veto:true});
  }

  rejectVeto = () => {
    const { app, user } = this.props;
    this.props.socketEvent('givePresidentChanceToConfirmVeto', {playerId: user.id, gameId: app.gameId, veto:false});
  }

  handleVote = (event) => {
    const { app, user } = this.props;
    this.props.socketEvent('agreeToVetoPolicy', {user, payload: event.target.className});
  };

  render() {
    return (
      <View style={styles.voteContainer} onPress={this.handleVote}>
        <TouchableOpacity className='accept' style={styles.vote}>
          <Text style={styles.text}> I agree to the veto </Text>
        </TouchableOpacity>
        <TouchableOpacity className='abstain' onPress={this.handleVote} style={styles.vote}>
          <Text style={styles.text}> Nope, I disagree. </Text>
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
    backgroundColor: 'yellow',
    height: '70%',
    width: '100%',
    margin: '2%',
  },

  text: {
    fontSize: 40,
    margin: '5%',
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
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PresidentVeto);
