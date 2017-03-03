import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';

import CardList from './components/cardList/CardList';

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
  constructor(props){
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.state = {
      offsetY: 0
    };
  }

  onScroll(e) {
    const {y: offsetY} = e.nativeEvent.contentOffset;
    this.setState({offsetY: offsetY <= 0 ? 0 : offsetY})
  }

  componentDidMount() {
    this.refs.scrollView.scrollTo({y: 200})
  }

  render() {
    return (
      <ScrollView
        ref="scrollView"
        scrollEventThrottle={1}
        style={styles.container}
        onScroll={this.onScroll}
      >
        <CardList cards={CARDS} scrollValue={this.state.offsetY} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#F5FCFF',
  }
});
