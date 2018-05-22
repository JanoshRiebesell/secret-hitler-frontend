import React, { Component } from 'react';
import { Button, HomeImage } from './Common';
import { TextInput, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { socketEvent } from '../../redux/actions/socket.actions';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {gameId: ''}
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  joinGameRoom = () => {
    if (this.state.gameId) {
      this.props.socketEvent({
        type: 'joinGame',
        payload: {
          user: this.props.user,
          gameId: this.state.gameId
        }
      })
      this.props.navigation.navigate('Waiting');
    }
  }

  render () {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-70} contentContainerStyle={{ height: '100%', backgroundColor: '#4c140d' }} >
        <HomeImage />
        <View style={styles.containerStyle} >
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter your GameID"
            autoCorrect={false}
            onChangeText={(gameId) => this.setState({gameId})}
          />
        </View>
        <View>
          <Button onPress={this.joinGameRoom}>
            Join
          </Button>
        </View>

        <View style={styles.containerStyle} >
          <Button onPress={this.joinGameRoom}>
            Join
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// return (
//     <Card>
//       <HomeImage />
//       <CardSection style={styles.textInputContainerStyle}>
//         <TextInput
//           style={styles.textInputStyle}
//           placeholder="Enter your GameID"
//           autoCorrect={false}
//           onChangeText={(gameId) => this.setState({gameId})}
//         />
//       </CardSection>
//
//       <CardSection>
//         <Button onPress={this.joinGameRoom}>
//           Join
//         </Button>
//       </CardSection>
//     </Card>
// );

const styles = {
  textInputStyle: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    marginLeft: '15%',
    marginRight: '15%',
    height: 50,
    textAlign: 'center',
    color: 'white'
  },
  containerStyle: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  game: state.game
});

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (data) => dispatch(socketEvent(data)),
  createGame: (game) => dispatch(createGame(game))
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
