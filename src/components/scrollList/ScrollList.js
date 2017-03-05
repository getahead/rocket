import React from 'react';
import {StyleSheet, ScrollView, Animated, View, Text, Image} from 'react-native';

import CardList from '../cardList/CardList'
import ScrollListItem from './ScrollListItem'

const yOffset = new Animated.Value(200);
const onScroll = Animated.event(
  [{nativeEvent: {contentOffset: {y: yOffset}}}],
  {useNativeDriver: true}
);

export default class ScrollList extends React.Component {
  componentDidMount() {
    this.refs.animatedScrollView._component.scrollTo({y: 200})
  }

  render() {
    return (
      <Animated.ScrollView
        ref="animatedScrollView"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}>

        <CardList cards={this.props.cards} scrollValue={yOffset}/>

        <ScrollListItem name="McDonalds" icon={require('./mc.png')} invoice="-1 500"/>
        <ScrollListItem name="Зарплата" icon={require('./mc.png')} invoice="200 000"/>
        <ScrollListItem name="McDonalds" icon={require('./mc.png')} invoice="-2 500"/>
        <ScrollListItem name="Яндекс такси" icon={require('./mc.png')} invoice="-500"/>
        <ScrollListItem name="McDonalds" icon={require('./mc.png')} invoice="-800"/>
      </Animated.ScrollView>
    )
  }
}
