import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import logger from 'redux-logger';
import uuid from 'uuid/v4';

import { localBackendIp, localBackendPort } from 'react-native-dotenv';

import reducers from './redux/reducers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // update localBackendIp in .env to connect to other machine on the LAN
    this.ip = localBackendIp || 'localhost';
    this.port = localBackendPort || 3000;
    // this.socket = io(`http://${this.ip}:${this.port}`);
    this.socket = io(`http://localhost:3000`);
  }

  createGameRequest = () => {
    this.socket.emit('metaChannel', 'createGame', {
      user: {id: '98kbkoNjVPCLez_3AAAA' /*uuid()*/, name: 'jackTheRipper', avatar: 'blue'}
    });
  }

  joinGameRequest = () => {
    this.socket.emit('metaChannel', 'joinGame', {
      gameId: '98kbkoNjVPCLez_3AAAA',
      user: {id: '98kbkoNjVPCLez_3AAAA' /*uuid()*/, name: 'johnTheRipper', avatar: 'red'}
    });
  }

  startGameRequest = () => {
    this.socket.emit('metaChannel', 'startGame', {
      gameId: '98kbkoNjVPCLez_3AAAA',
    });
  }

  componentDidMount() {
    this.socket.on('metaChannel', res => console.log(res));
    this.socket.on('gameChannel', res => console.log(res));
    this.socket.on('error', res => console.log(res));
  }

  render() {
    const store = createStore(reducers);
    return (
      <Provider store={createStore(reducers, applyMiddleware(logger))}>
        <View style={styles.container}>
          <Button title='Create Game' onPress={this.createGameRequest}/>
          <Button title='Join Game' onPress={this.joinGameRequest}/>
          <Button title='Start Game' onPress={this.startGameRequest}/>
        </View>
      </Provider>
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
