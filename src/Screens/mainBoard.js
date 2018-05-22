import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Alert, Button} from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification';
import { DrawerNavigator } from 'react-navigation';
import { socketEvent } from '../../redux/actions/socket.actions';
import PlayerList from '../Components/PlayerList';
import ShowPresident from './ShowPresident';

class MainBoard extends Component {
  constructor (props) {
    super(props);
    this.state = {drawerOpen: null, turnCount: 0, userId: this.props.userId, modalVisible: false, presidentShown: false, chancellorShown: false};
  };

  componentDidMount () {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  renderElectionTracker = () => {
    return (
      <TouchableOpacity onTrackerPress={this.toggleTracker} style={styles.electionTracker}>
        <ElectionTracker/>
      </TouchableOpacity>
    )
  }

 renderGovernmentScreen = () => {
   if (!this.state.presidentShown) {
      this.props.navigation.navigate('ShowPresident')
      this.setState({
        presidentShown: true,
      })
    } else if (this.state.presidentShown && !this.state.chancellorShown) {
      this.props.navigation.navigate('ShowChancellor')
      this.setState({
        presidentShown: true,
      })
    }
 }

  renderMainContent = () => {
    if(!this.state.drawerOpen) {
      return (
        <View style={styles.mainBoardContainer}>
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
      )
    } else {
        return (
          <View style={styles.mainBoardContainer}>
            <View>
              <PlayerList style={styles.electionTracker}/>
            </View>
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
            <TouchableOpacity onTrackerPress={this.toggleTracker} style={styles.electionTracker}>
              <ElectionTracker/>
            </TouchableOpacity>
          </View>
        )
      }
    }

  // Socket actions occuring on the main Board
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.turnCount > prevState.turnCount) {
  //     handlePresidentChange();
  //   } else {
  //     return prevState;
  //   }
  // }

  render() {
    return (
      <Drawer
        open={this.state.drawerOpen}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        onClose={() => {
          this.setState({drawerOpen: false});
        }}
        panOpenMask={0.80}
        captureGestures="open"
        acceptPan={false}>
        <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setState({drawerOpen: true});
          }}>
          <Button
            style={styles.button}
            title='Newsflash! Read all about it'
            onPress={this.renderGovernmentScreen}
          />
          <View>
          {this.renderMainContent()}
          </View>
          </TouchableOpacity>
        </View>
      </Drawer>
    )
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

  container: {
    display: 'flex',
    height: '100%',
    flex: 0.88
  },

  electionTracker: {
    alignSelf: 'center',
    flex: 1,
  },

  allianceBoards: {
    display: 'flex',
    flex: 9,
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

  button: {
    flex: 0.05,
    height: '2%',
    backgroundColor: 'brown',
  }

})

const mapStateToProps = (state) => ({
  game: state.game,
  players: state.game.playerList,
  userId: state.user.id
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (data) => dispatch(socketEvent(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);
