import React, { Component } from 'react';
import { Card, CardSection, Button, HomeImage } from './Common';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class CreateJoin extends Component {

  onCreateClick = () => {
    this.props.navigation.navigate('Create');
  }

  onJoinClick = () => {
    this.props.navigation.navigate('Join');
  }

  renderUserName = () => {
    return (
      <CardSection>
        <Text style={{ textAlign: 'center', flex: 1 }} >
          What would you like to do, {this.props.name}?
        </Text>
      </CardSection>
    );
  }

  render () {
    console.log(this.props)
    return (
        <Card>
          <HomeImage />

          {this.renderUserName()}

          <CardSection>
            <Button onPress={this.onCreateClick}>
              Create
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onJoinClick}>
              Join
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  const { avatar, id, name } = userReducer;
  return {
    avatar, id, name
  }
}

export default connect(mapStateToProps, {})(CreateJoin);