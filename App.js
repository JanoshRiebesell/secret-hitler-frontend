import React from 'react';
import UserIntro from './src/screens/UserIntro';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from './redux/reducers';

export default class App extends React.Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={createStore(reducers, applyMiddleware(logger))}>
        <UserIntro/>
      </Provider>
    );
  }
}