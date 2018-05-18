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

  getChancellorId = () => {
    const chancellorId = this.props.players.filter(player => {
      if (player.chancellor) {
        return player.id;
      }
    })
    this.setState({
      chancId: chancellorId
    })
  }

  revealChancellor = () => {
    const chancellor = this.props.players.filter(player => {
      if (player.chancellor) {
        return player;
      }
    })
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
      <View style={styles.mainBoardContainer}>
        <ImageBackground source={require('../assets/WaitingRoom/waitingRoomBackground.png')} style={{flex:1, width:'100%', opacity: 0.6}}>
            <View style={styles.chancellorCard}>
              {this.revealChancellor()}
                <Button
                  navigation={this.props.navigation}
                  title="Vote"
                  onPress={this.goToVote}
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

  chancellorCard: {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowChancellor);
