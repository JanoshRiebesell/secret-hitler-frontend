import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
// import Card from '../components/Card';
// import CardSection from '../components/CardSection';
// import { connect } from 'react-redux';


class UserIntro extends Component {

  render() {
    let roleImage =
    this.props.role === 'liberal' ? require('../assets/liberal.jpg') :
    this.props.role === 'fascist' ? require('../assets/fascist.jpg') :
    require('../assets/trump.jpg')
    return (
    <View style={styles.parent}>
      {/* DO WE WANT ANY TEXT IN HERE??? <Text>Hello World</Text> */}

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

const timeout = setTimeout(()=> console.warn('Switch to next screen'), 5000);

const mapStateToProps = state => {
  return {
    role: 'liberal'
  }
}

export default connect(mapStateToProps, null)( UserIntro);