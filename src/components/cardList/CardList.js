import React from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';

const CARD_WIDTH = 320;
const CARD_HEIGHT = 200;

export default class CardList extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array,
    scrollValue: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.getScale = this.getScale.bind(this);
    this.getCardOffset = this.getCardOffset.bind(this);
    this.getCardRotateAngle = this.getCardRotateAngle.bind(this);
    this.getCardWidth = this.getCardWidth.bind(this);
  }

  getCardOffset(scrollValue, index) {
    const {cards} = this.props;

    return scrollValue.interpolate({
      inputRange: [
        0,
        cards.length * (CARD_HEIGHT / 2),
        cards.length * CARD_HEIGHT
      ],
      outputRange: [
        -1 * (index + 1) * (CARD_HEIGHT / 3) + 100,
        -CARD_HEIGHT * (index + 1) + CARD_HEIGHT,
        -CARD_HEIGHT * (index + 1) + CARD_HEIGHT
      ]
    });
  }

  getCardRotateAngle(scrollValue, index) {
    const {cards} = this.props;

    return scrollValue.interpolate({
      inputRange: [0, cards.length * (CARD_HEIGHT / 3)],
      outputRange: [`-${(50 / cards.length) * (index + 1)}deg`, '-25deg']
    });
  }

  getOpacity(scrollValue, index) {
    const {cards} = this.props;

    return scrollValue.interpolate({
      inputRange: [0, Math.pow(index + 1, 2) * (CARD_HEIGHT / cards.length), Math.pow(index + 1, 2) * CARD_HEIGHT],
      outputRange: [1, .95, (index + 1) / cards.length]
    })
  }

  getScale(scrollValue, index) {
    const {cards} = this.props;

    return scrollValue.interpolate({
      inputRange: [0, 1, Math.pow(index + 1, 2) * (CARD_HEIGHT / cards.length), Math.pow(index + 1, 2) * CARD_HEIGHT],
      outputRange: [1, 1, .95, .8]
    })
  }

  getCardWidth(scrollValue, index) {
    const {cards} = this.props;

    return scrollValue.interpolate({
      inputRange: [0, 1, Math.pow(index + 1, 2) * (CARD_HEIGHT / cards.length)],
      outputRange: [0, 0, -5]
    })
  }

  render() {
    const {cards = [], scrollValue} = this.props;
    const containerHeight = cards.length * CARD_HEIGHT - scrollValue.__getValue();

    return (
      <Animated.View style={[styles.container, {
        height: containerHeight,
        transform: [
          {translateY: scrollValue}
        ]
      }]}>
        {cards.map((card, index) => <Animated.View
          key={index}
          style={[styles.card, {
              zIndex: index,
              opacity: this.getOpacity(scrollValue, index),
              transform: [
                {scale: this.getScale(scrollValue, index)},
                {translateY: this.getCardOffset(scrollValue, index)}
              ]
            }]}
          >
          <Animated.View style={[styles.imageBox, {
              transform: [
                {perspective: 1000 + scrollValue.__getValue() * (index + 1)},
                {rotateX: this.getCardRotateAngle(scrollValue, index)},
              ]
            }]}>
            <Animated.View style={[styles.border, {
              transform: [
                {translateY: this.getCardWidth(scrollValue, index)}
              ]
            }]} />
            <Image source={require('./card.png')} style={styles.image}/>
          </Animated.View>
        </Animated.View>
        )}
      </Animated.View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBox: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 25,
    width: CARD_WIDTH,
    alignSelf: 'center'
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center'
  },
  border: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000'
  }
});
