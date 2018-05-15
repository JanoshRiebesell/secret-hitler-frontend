import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import MainBoard from './mainBoard';
import FascistAllies from '../Components/fascistAllies';
import { socketEvent} from '../../redux/actions/socket.actions';

class UserIntro extends Component {
  constructor (props) {
    super(props);
    this.state = {
      role: this.getCurrentUserRole()
    }
  }

  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  getCurrentUserRole = () => {
    this.props.players.filter(player => {
      if (player.id === this.props.user.id) {
        return this.props.players.faction;
      }
    })
  }

  goToBoard = () => {
    this.props.socketEvent('acknowledgePlayerRole', {gameId: this.props.game.id})
    this.props.navigation.navigate('MainBoard');
  }

  showAllies = () => {
    if (this.state.role === 'fascist') {
      setTimeout(() => {
        return <FascistAllies />
      }, 4000)
      this.props.socketEvent('acknowledgeOtherFascists', {gameId: this.props.game.id})
    }
  }

  render() {
    let roleImage =
    this.state.role === 'liberal' ? require('../assets/liberal.jpg') :
    this.state.role === 'fascist' ? require('../assets/fascist.jpg') :
    require('../assets/fascist.jpg')
    return (
    <View style={styles.parent}>
      {/* DO WE WANT ANY TEXT IN HERE??? <Text>Hello World</Text> */}

      <Image
        source={roleImage}
        style={styles.imageStyle}
      />

      <View style={styles.allies}>
        {this.showAllies()}
      </View>

      <Button
        title="GOTCHA"
        onPress={this.goToBoard}
        style={styles.button}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    marginTop:20,
    backgroundColor: 'grey',
    flex:1,
    flexDirection: 'column',
  },
  imageStyle: {
    borderColor: 'black',
    borderWidth: 1,
    height: 400,
    width:null,
    flex: 1
  },
});

const mapStateToProps = (state) => ({
  user : state.user,
  players: state.game.playerList,
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(UserIntro);
