import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:3000');
  }

  sendSocketRequest = () => {
    this.socket.emit('request', 'test message')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Send Socket Request' onPress={this.sendSocketRequest}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
