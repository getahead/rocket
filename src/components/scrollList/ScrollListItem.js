import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const ScrollListItem = ({name, icon, invoice}) =>
  <View style={styles.item}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={icon}/>
    </View>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.invoice}>{invoice} ₽</Text>
  </View>;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  imageContainer: {
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red'
  },
  image: {
    width: 40,
    height: 40
  },
  title: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 2
  },
  invoice: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 2,
    textAlign: 'right'
  }
});

export default ScrollListItem;
