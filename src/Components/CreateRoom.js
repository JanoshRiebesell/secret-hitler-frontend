import React, { Component } from 'react';
import { Card, CardSection, Button, HomeImage } from './Common';
import { Text } from 'react-native';

export default class CreateJoin extends Component {

  onStartClick() {
    this.props.navigation.navigate('Waiting');
  }

  render () {
    return (
        <Card>
          <HomeImage />

          <CardSection style={styles.textContainerStyle} >
            <Text style={styles.textStyle} >
              Your GameID is...
            </Text>
          </CardSection>

          <CardSection>
            <Button onPress={this.onStartClick.bind(this)}>
              Start
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const styles = {
  textStyle: {
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
  textContainerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  }
}