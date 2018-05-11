import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, View, Text, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../Avatars.json';
import { Card, CardSection, Button, HomeImage } from './Common';
import { usernameChanged, createUser, avatarPressed } from '../../redux/actions';

class CreateUser extends Component {

  state = {
    avatars: avatars
  };

  onCreateClick = () => {
    const { avatar, id, name } = this.props;
    this.props.createUser({ avatar, id, name });
    this.props.navigation.navigate('CreateJoin');
  }

  onAvatarPressed = (avatar, e) => {
    const avatarUrl = avatar.img;
    this.props.avatarPressed(avatarUrl);
  }

  onUsernameChange(name)  {
    this.props.usernameChanged(name);
  }

  renderAvatars() {
    return this.state.avatars.map((avatar, i) => {
      return (
        <View key={i}>
          <Avatar
            containerStyle={{alignSelf: 'center', marginBottom: 20}}
            large
            rounded
            source={{ uri: avatar.img }}
            onPress={this.onAvatarPressed.bind(this, avatar)}
            activeOpacity={0.7}
          />
        </View>
      );
    });
  }

  render () {
    return (
        <Card>
          <CardSection>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter your Username"
              autoCorrect={false}
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.props.name}
            />
          </CardSection>

          {this.renderAvatars()}

          <CardSection>
            <Text style={{ flex: 1, textAlign: 'center' }}>
              Hello there {this.props.name}!
            </Text>
          </CardSection>

          <CardSection>
            <Button
              onPress={this.onCreateClick.bind(this)}
              style={{ marginTop: 25}}
            >
              Let Me In...
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
    marginTop: 100,
    marginBottom: 50,
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

const mapStateToProps = ({ userReducer }) => {
  const { avatar, id, name } = userReducer;
  return {
    avatar, id, name
  }
}

export default connect(mapStateToProps, {
  usernameChanged,
  createUser,
  avatarPressed
})(CreateUser);