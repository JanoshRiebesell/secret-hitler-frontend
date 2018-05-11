import React, { Component } from 'react';
import { Card, CardSection, Button, HomeImage } from './Common';
import { TextInput } from 'react-native';

export default class JoinRoom extends Component {

  onJoinClick() {
    this.props.navigation.navigate('Waiting');
  }

  render () {
    return (
        <Card>
          <HomeImage />

          <CardSection style={styles.textInputContainerStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter your GameID"
              autoCorrect={false}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onJoinClick.bind(this)}>
              Join
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const styles = {
  textInputStyle: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    textAlign: 'center'
  },
  textInputContainerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  }
}