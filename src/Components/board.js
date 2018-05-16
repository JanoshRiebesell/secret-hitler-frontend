import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import Tile from './tile';

class Board extends Component {
  constructor (props) {
    super(props)
  }

  renderTiles = () => {
    const tileArray = [];
    let tileNumber;
    if (this.props.className === 'liberal') {
      tileNumber = 5
      for (let i = 0; i < tileNumber; i++) {
        if (this.props.game.numberOfLiberalPolicies) {
          if (i <= this.props.game.numberOfLiberalPolicies) {
            tileArray.push(
              <Image key={i} source={require('../assets/board/liberalPolicy.png')} style={{height: '50%', width:'15%'}}/>
            )
          } else {
            tileArray.push(<Tile
              className='liberal'
              key={i}
              />
            )
          }
        }
      }
    } else {
      tileNumber = 6
      for (let i = 0; i < tileNumber; i++) {
        if (this.props.game.numberOfFascistPolicies) {
          if (i <= this.props.game.numberOfFascistPolicies) {
            tileArray.push(
              <Image key={i} source={require('../assets/board/fascistPolicy.png')} style={{height: '50%', width:'14%'}}/>
            )
          } else {
            tileArray.push(<Tile
              className='fascist'
              key={i}
            />
            )
          }
        }
      }
    }
    return tileArray;
  }


  render () {
    return (
      <View style={styles.board}>
        {this.renderTiles()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  board: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  game: state.game.gameState,
})

export default connect(mapStateToProps, null)(Board);
