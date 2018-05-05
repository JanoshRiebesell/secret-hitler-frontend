import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';

import { localBackendIp } from 'react-native-dotenv'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // update localBackendIp in .env to connect to other machine on the LAN
    this.ip =  localBackendIp || 'localhost';
    this.socket = SocketIOClient(`http://${this.ip}:3000`);
  }

  sendSocketRequest = () => {
    this.socket.emit('newGame', 'Starting new game...');
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
