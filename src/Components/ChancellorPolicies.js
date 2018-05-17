import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Image, View, FlatList, TouchableOpacity, Button, Text } from 'react-native';

const mockList = [ 'liberal', ' fascist'];

class ChancellorPolicies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      indexSelected : null
    }
  }

  getCurrentPlayerId = () => {
    this.props.players.filter(player => {
      if (player.user.id === this.props.user.id) {
        return id;
      }
    })
  }

  selectPolicy = (policy, index, e) => {
    this.setState({indexSelected: index})
  }

  dismissPolicy = () => {
    const { user } = this.props;
    this.props.socketEvent(
      'pickPolicies',
      {gameId: this.props.game.id, playerId: this.getCurrentPlayerId(),
       rejectedPolicy: this.state.indexSelected}
      );
    this.props.navigation.navigate('MainBoard');
  }

  _renderPolicies = () => {
    return mockList.map( (policy ,i)  => {
      if (policy === 'liberal') {
        return (
          <TouchableOpacity
          style={styles.vote}
          key={i}
          index={i}
          onPress={this.selectPolicy.bind(this, policy, i)}>
            <Image
              source={ require('../assets/board/liberalPolicy.png')}
              style={{flex:1, width: '100%', height:'100%', resizeMode:'contain'}}
              />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={styles.vote}
            key={i}
            index={i}
            onPress={this.selectPolicy.bind(this, policy, i)}>
          <Image
            source={require('../assets/board/fascistPolicy.png')}
            style={{flex:1, width: '100%', height:'100%', resizeMode:'contain'}}
            />
          </TouchableOpacity>
        );
      }
    })
  }

  render() {
    return (
      <View style={{flexDirection: 'column', height:'90%'} }>
        <View style={styles.voteContainer}>
          {this._renderPolicies()}
        </View>
          <Button
            title="OK"
            style={styles.button}
            onPress={this.dismissPolicy.bind(this)}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  voteContainer: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    height: '80%',
    width: '95%',
    margin:'2%'
  },

  vote: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '90%',
    width: '90%',
    // margin: '2%',
  },

  button: {
    width: '50%',


  }
})

const mapStateToProps = (state) => {
  return {
    game: state.gameReducer,
    players: state.gameReducer.playerList,
    user: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ChancellorPolicies);