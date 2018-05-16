import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Button } from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification'
import { socketEvent } from '../../redux/actions/socket.actions'

class NotificationsBoard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: undefined,
      drawerOpen: null,
      turnCount: 0,
      numberOfFascistPolicies: 0,
      numberOfLiberalPolicies: 0
    };
  };

  componentDidMount () {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  static navigationOptions = {
    drawerLabel: 'Board',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/trump.jpg')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.mainBoardContainer}>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
        <View style={styles.allianceBoards}>
          <View style={styles.liberalBoard}>
            <ImageBackground source={require('../assets/board/liberalBoard.png')} style={{flex:1}} >
              <Board className='liberal'/>
            </ImageBackground>
          </View>
          <View style={styles.fascistBoard}>
            <ImageBackground source={require('../assets/board/fascistBoard.png')} style={{flex:1}} >
              <Board className='fascist'/>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  mainBoardContainer : {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  electionTracker: {
    alignSelf: 'center',
    flex: 1,
  },

  allianceBoards: {
    display: 'flex',
    flex: 8,
  },

  liberalBoard : {
    backgroundColor: 'white',
    height: '50%',
  },

  fascistBoard : {
    height: '50%',
    backgroundColor: 'white',
  },

  closedDrawerMessage: {
    alignSelf: 'center',
    flex: 0.5,
    width: '0%',
  },

  notification: {
    height: '20%',
  }
})

const mapStateToProps = (state) => ({
  game: state.game
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBoard);
