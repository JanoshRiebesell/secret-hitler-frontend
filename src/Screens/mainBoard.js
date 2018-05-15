import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import ElectionTracker from '../Components/electionTracker';
import Board from '../Components/board';
import Drawer from 'react-native-drawer';
import Notification from '../Components/notification'
import { socketEvent } from '../../redux/actions/socket.actions'

class MainBoard extends Component {
  constructor (props) {
    super(props);
    this.state = {drawerOpen: null, turnCount: 0};
  };

  componentDidMount () {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  // Presentational
  renderElectionTracker = () => {
    return (
      <TouchableOpacity onTrackerPress={this.toggleTracker} style={styles.electionTracker}>
        <ElectionTracker/>
      </TouchableOpacity>
    )
  }

  renderTriangle = () => {
    return (
      <View style={styles.triangleLeft}/>
    )
  }

  renderMainContent = () => {
    if(!this.state.drawerOpen) {
      return (
        <View style={styles.mainBoardContainer}>
          <View style={styles.allianceBoards}>
            <View>
              <Notification style={styles.notification}/>
            </View>

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
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.turnCount > prevState.turnCount) {
      handlePresidentChange();
    } else {
      return prevState;
    }
  }

  handlePresidentChange = () => {
    this.setState({
      turnCount: turnCount++
    })
    this.props.socketEvent('acknowledgePresident', {gameId: this.props.game.id})
  }


  render() {
    console.log('PROOOOOOOOOOPS', this.props)
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
          {this.renderMainContent()}
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
  game: state.gameReducer
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);
