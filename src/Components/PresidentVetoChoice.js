import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { socketEvent } from '../../redux/actions/gameActions';

class PresidentVeto extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  acceptVeto = () => {
    console.log('I ACCEPT!', this.props);
    this.props.socketEvent('presidentVetoPolicy', {playerId: user.id, gameId: app.gameId, veto:true});
  }

  rejectVeto = () => {
    this.props.socketEvent('presidentVetoPolicy', {playerId: user.id, gameId: app.gameId, veto:false});
  }

  render() {
    return (
      <View style={styles.voteContainer}>
        <TouchableOpacity value='accept' onPress={this.acceptVeto} style={styles.vote}>
          <Text style={styles.text}> I agree to the veto. </Text>
        </TouchableOpacity>
        <TouchableOpacity value='abstain' onPress={this.rejectVeto} style={styles.vote}>
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
    backgroundColor: '#8B4513',
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
    fontSize: 40,
    margin: '5%',
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    game: state.gameReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PresidentVeto);
