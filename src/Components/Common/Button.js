import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button  = ({ onPress, children, style }) => {
  const { textStyle, buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fff'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#a54c33',
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#cc6245'
  }
}

export { Button };