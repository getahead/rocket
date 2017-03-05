import React from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollList from './components/scrollList/ScrollList';

const CARDS = [
  {
    id: 1,
    name: 'Card One',
    balance: 100500
  },
  {
    id: 2,
    name: 'Card Second',
    balance: 100500
  },
  {
    id: 3,
    name: 'Card Third',
    balance: 100500
  },
  {
    id: 4,
    name: 'Card Fourth',
    balance: 100500
  },
  {
    id: 5,
    name: 'Card 5th',
    balance: 100500
  }
];

export default class Root extends React.Component {
  render() {
    return (
      <ScrollList cards={CARDS} />
    );
  }
}
