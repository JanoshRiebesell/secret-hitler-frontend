import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Button } from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification';
import { socketEvent } from '../../redux/actions/socket.actions';
import JaNeinVote from '../Components/JaNeinVote';
import NominateChancellor from './NominateChancellor';


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
      presId: this.getPresidentId()
    })
  }


  getPresidentId = () => {
    const presidentId = this.props.players.filter(player => {
      if (player.president) {
        return player.id;
      }
    })
  }

  revealPresident = () => {
    const president= this.props.players.filter(player => {
      return player.president
    })

    const presidentId = president[0].user.id
    const presidentName = president[0].user.name;
    if (this.props.user.id === presidentId) {
      return <Text style={styles.text}> Welcome to the Presidency! </Text>
    } else {
      return <Text style={styles.text}> {presidentName} is your President this turn. </Text>
    }
  }


  handleClick = () => {
    this.props.socketEvent({
      type: 'acknowledgePresident',
      payload: {
        gameId: this.props.game.id
      }
    })
    if (this.props.user === this.state.presId) {
      this.props.navigation.navigate('NominateChancellor')
    } else {
      this.props.navigation.navigate('MainBoard')
    }
  }

  render () {
    return (
    <View style={styles.mainBoardContainer}>
      <ImageBackground source={require('../assets/WaitingRoom/waitingRoomBackground.png')} style={{flex:1, width:'100%', opacity: 0.6}}>
          <View style={styles.presidentCard}>
            {this.revealPresident()}
              <Button
                navigation={this.props.navigation}
                title="Got it"
                onPress={this.handleClick}
                style={styles.button}
              />
          </View>
        </ImageBackground>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  mainBoardContainer : {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  presidentCard: {
    alignSelf: 'center',
    margin: '10%',
  },

  button: {
    color: 'white',
  },

  text: {
    fontSize: 42,
    fontWeight: 'bold',
  }
})

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.user,
  players: state.game.playerList
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (data) => dispatch(socketEvent(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPresident);
