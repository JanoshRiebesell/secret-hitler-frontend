import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { socketEvent } from '../../redux/actions/socket.actions';

import UserIntro from './UserIntro';

class PatientPlayers extends Component {
  constructor (props) {
    super(props)
  }

  renderPlayers = () => {
    let currentPlayers = [];
    if (this.props.players) {
      for (let i = 0; i < this.props.players.length; i++) {
        const avatar = this.props.players[i].user.avatar;
        const name = this.props.players[i].user.name
        currentPlayers.push(
          <View key={i} style={{display: 'flex', alignItems:'center',  margin: '5%', height: '30%', width:'40%', padding:'5%'}}>
            <Image source={require('../assets/trump.jpg')} style={{width: '30%', height: '50%'}}/>
            <Text style={{backgroundColor: 'black', fontSize: 18, color: 'white', fontWeight: 'bold', marginBottom: '10%'}}> {name} </Text>
          </View>
        )
      }
    return currentPlayers;
    }
  }

  render() {
    return (
      <View style={styles.players}>
        {this.renderPlayers()}
      </View>
    )
  }
}

class WaitingRoom extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  renderText = () => {
    if (this.props.players.length <= 5) {
      return 'Waiting for more players'
    } else {
      return 'All set, now divide and conquer!'
    }
  }

  startGame = () => {
    this.props.socketEvent('startGame', {gameId: this.props.game.id})
    this.props.navigation.navigate('MainBoard');
  }

  renderButton = () => {
    if (this.props.players.length > 6) {
      return (
        <TouchableOpacity disabled={true}>
          <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', opacity: 0.5}}> START GAME </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.startGame}>
          <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold'}}> START GAME </Text>
        </TouchableOpacity>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/WaitingRoom/HilterLizzard.png')} style={{flex:1, width:'100%', opacity:0.7}}>

          <View style={styles.playersContainer}>
            <PatientPlayers />
          </View>

          <View style={styles.waitingMessageContainer}>
            <Text style={{ fontSize: 42, color: 'red', fontWeight: '900', margin: '5%', width:'100%', height: '100%', textShadowColor: 'black', textShadowOffset: {width: 10, height: 10}, textShadowRadius: 8}}>{this.renderText()}</Text>
          </View>

          if (user.id === initiator.id) {
            <View style={styles.startButton}>
              {this.renderButton()}
            </View>
          }

          <View style={styles.tipsContainer}>
            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', marginLeft: '5%', marginTop: '2%'}}> Tip: Always claim to be liberal </Text>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  waitingMessageContainer: {
    backgroundColor: 'transparent',
    width: '85%',
    alignSelf: 'flex-start',
    flex: 0.3,
    marginTop: '10%',
    marginBottom: '3%'
  },

  playersContainer: {
    width: '100%',
    flex: 0.6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  players: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tipsContainer: {
    backgroundColor: '#958247',
    width: '100%',
    alignSelf: 'flex-end',
    flex: 0.1,
    opacity: 0.6,
  },

  startButton: {
    backgroundColor: 'orange',
    width: '70%',
    height: '10%',
    marginLeft: '15%',
    marginBottom: '5%',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => ({
  game: state.game,
  players: state.game.playerList
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
