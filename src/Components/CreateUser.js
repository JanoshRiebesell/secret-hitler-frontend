import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-elements';
import avatars from '../Avatars.json';
import { Button } from './Common';
import { usernameChanged, createUser, avatarPressed } from '../../redux/actions';
import { readStorage, writeStorage } from '../../redux/storage';
import uuidv4 from 'uuid/v4';

class CreateUser extends Component {

  state = {
    avatars: avatars
  };

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  onCreateClick = async () => {
    let { avatar, id, name } = this.props;
    let idStored = await readStorage('uuid')
    if (idStored !== null) {
      id = idStored;
    } else {
      id = uuidv4();
      writeStorage('uuid', id)
    }
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
        <TouchableHighlight key={i}>
          <Avatar
            containerStyle={{ alignItems: 'center', marginBottom: 20, marginRight: 10 }}
            large
            rounded
            source={{ uri: avatar.img }}
            onPress={this.onAvatarPressed.bind(this, avatar)}
            activeOpacity={0.7}
          />
        </TouchableHighlight>
      );
    });
  }

  renderSelectedAvatar() {
    if (this.props.avatar !== undefined) {
      return (
        <Avatar
          xlarge
          rounded
          source={{ uri: this.props.avatar }}
          containerStyle={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}
        />
      );
    }
  }

  render () {
    return (
        <View style={{ flex: 1, backgroundColor: '#4c140d' }} >
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter your Username"
              autoCorrect={false}
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.props.name}
            />
          </View>

          <View style={styles.itemStyle}>
            <ScrollView horizontal >
              {this.renderAvatars()}
            </ScrollView>
          </View>

          <View>
            <Text style={styles.textGreetingStyle}>
              Hello there {this.props.name}!
            </Text>
          </View>

          <View style={{ alignItems: 'center' }} >
            {this.renderSelectedAvatar()}
          </View>

          <View style={{ flexDirection: 'row' }} >
            <Button
              onPress={this.onCreateClick}
              style={{ marginTop: 25}}
            >
              Let Me In...
            </Button>
          </View>
        </View>
    );
  }
}

const styles = {
  itemStyle: {
    alignItems: 'center'
  },
  textInputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    marginBottom: 50,
    height: 50,
    textAlign: 'center',
    color: 'white'
  },
  textInputContainerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textGreetingStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
}

const mapStateToProps = ({ user }) => {
  const { avatar, id, name } = user;
  return {
    avatar, id, name
  }
}

export default connect(mapStateToProps, {
  usernameChanged,
  createUser,
  avatarPressed
})(CreateUser);
