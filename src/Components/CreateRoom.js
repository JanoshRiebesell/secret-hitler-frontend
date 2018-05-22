import React, { Component } from 'react';
import { Button, HomeImage } from './Common';
import { Text, View, Clipboard } from 'react-native';
import { connect } from 'react-redux';

class CreateRoom extends Component {

  constructor (props) {
    super(props);
    this.state = {
      gameId: undefined
    };
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    this.setState({
      gameId: this.props.game.id
    })
  }

  onStartClick = () => {
    this.props.navigation.navigate('Waiting');
  }

  revealGameId = () => {
    if (this.props.game.id) {
      return this.props.game.id;
    }
  };

  writeToClipboard = async () => {
    const gameId = this.state.gameId;
    await Clipboard.setString(gameId);
    alert('Copied to Clipboard!');
  };

  render () {
    return (
        <View style={{ flex: 1, backgroundColor: '#4c140d' }} >
          <HomeImage />

          <View style={styles.containerStyle} >
            <Text selectable={true} style={styles.textStyle} >
              Your GameID is {this.props.game.id}
            </Text>
          </View>

          <View style={styles.containerStyle} >
            <Button onPress={this.writeToClipboard} >
              Copy
            </Button>
          </View>

          <View style={styles.containerStyle} >
            <Button onPress={this.onStartClick.bind(this)}>
              Start
            </Button>
          </View>
        </View>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    fontSize: 16,
    marginLeft: '15%',
    marginRight: '15%',
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
  game: state.game,
  user: state.user
});

export default connect(mapStateToProps, null)(CreateRoom);
