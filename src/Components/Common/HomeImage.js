import React from 'react';
import { Image } from 'react-native';
import { CardSection } from './CardSection';

const HomeImage = (props) => {
  return (
    <CardSection style={{ borderRadius: 7 }} >
      <Image
        style={styles.imageStyle}
        source={{uri: imageUrl}}
      />
    </CardSection>
  );
};

// const imageUrl = 'https://i.imgur.com/C7hXP5I.jpg';
const imageUrl = 'https://i.imgur.com/vQ3wcbU.jpg';
const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
    marginTop: 30,
    marginBottom: 30,
    resizeMode: 'contain',
    borderRadius: 7
  }
};

export { HomeImage };