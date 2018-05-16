import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class Notification extends Component {
  constructor (props) {
    super(props)
  }

  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/trump.jpg')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back to board"
      />
    );
  }
}


const styles = StyleSheet.create({
  notification: {
    backgroundColor: '#958247',
    width: '100%',
    opacity: 0.6,
  },
  icon: {
    width: 24,
    height: 24,
  }
})


const mapStateToProps = (state) => ({
  game: state.game,
})

const mapDispatchToProps = (dispatch) => ({
  socketEvent: (message, payload) => dispatch(socketEvent(message, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
