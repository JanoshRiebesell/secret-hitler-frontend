import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ImageBackground  } from 'react-native';

class ElectionTracker extends Component {
  constructor (props) {
    super(props)
  }

  renderTrackers = () => {
    const trackers = [];
    for (let i = 1; i < 5; i++) {
      if (this.props.game.electionFailCount === i) {
        trackers.push(
        <ImageBackground key={i} source={require('../assets/board/trackerCircle.png')} style={styles.backgroundImage}>
          <View style={styles.circle}/>
        </ImageBackground>)
      } else {
        trackers.push(<Image key={i} source={require('../assets/board/trackerCircle.png')} width={'100%'} flex={0.5} margin={'5%'}/>)

      }
    }
    return trackers;
  }

  render () {
    return (
      <View style={styles.electionTracker}>
        {this.renderTrackers()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  electionTracker: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginRight: 15,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 120/2,
    backgroundColor: 'red',
    borderStyle: 'solid',
    margin: '15%',
  },
  backgroundImage: {
    width: '100%',
    flex: 0.5,
    margin: '5%',
  }
});

const mapStateToProps = (state) => ({
  game: state.game.gameState
})

export default connect(mapStateToProps, null)(ElectionTracker);
