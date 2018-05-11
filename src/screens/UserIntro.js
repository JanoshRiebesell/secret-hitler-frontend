import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

class UserIntro extends Component {

  render() {
    let roleImage =
    this.props.role === 'liberal' ? require('../assets/userIntro/liberal.png') :
    this.props.role === 'fascist' ? require('../assets/userIntro/fascist.png') :
    require('../assets/userIntro/hitler.png')
    return (
    <View style={styles.parent}>
      <Image
        source={roleImage}
        style={styles.imageStyle}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    marginTop:20,
    backgroundColor: 'grey',
    flex:1,
    flexDirection: 'column',
  },
  imageStyle: {
    borderColor: 'black',
    borderWidth: 1,
    height: 400,
    width:null,
    flex: 1
  },
});

const timeout = setTimeout(()=> console.warn('Switch to next screen'), 8000);

const mapStateToProps = state => {
  return {
    role: 'hitler'
  }
}

export default connect(mapStateToProps, null)( UserIntro);