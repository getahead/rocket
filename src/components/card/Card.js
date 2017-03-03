import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const Card = ({card = {}}) => {

  return (
    <View style={[styles.container]}>
      <Image source={require('./card.png')} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 343,
    height: 216,
    alignSelf: 'center'
  }
});

export default Card;
