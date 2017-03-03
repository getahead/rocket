import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} from 'react-native';

import Card from '../card/Card';

const PI = 3.14;
const RADIUS = 100;
const AMPLITUDE_ANGLE = 100;
const AVAILABLE_ANGLE_COEFFICIENT = 2/3;

// const

export default class CardList extends React.Component {
  static propTypes = {
    cards: React.PropTypes.array,
    scrollValue: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = this.init(props);
  }

  init(props) {
    const cardsCount = props.cards.length;
    const offsetAngle = AMPLITUDE_ANGLE / cardsCount;

    return {
      cardsCount,
      offsetAngle
    }
  }

  calculateOffset(scrollValue, index, rotateX) {
    const {offsetAngle, cardsCount} = this.state;
    let additionalOffset = (offsetAngle) * (cardsCount - index - 1);
    let offset = RADIUS * (1 - Math.sin((Math.PI * offsetAngle * index) / 180));

    // additionalOffset = additionalOffset >= (cardsCount - index) * RADIUS / cardsCount
    //   ? (cardsCount - index) * RADIUS / cardsCount
    //   : additionalOffset;
    // offset = offset >= RADIUS ? offset + scrollValue : offset;
    // console.log(offset)
    return offset// + additionalOffset;
  }

  calculateRotationAngle(scrollValue, index, offset) {
    const {offsetAngle} = this.state;
    let rotateX = ((AMPLITUDE_ANGLE * AVAILABLE_ANGLE_COEFFICIENT - scrollValue / Math.PI)
      - offsetAngle * index) * -1;

    rotateX = rotateX >= 0 ? 0 : rotateX;
    // rotateX = offset >= RADIUS / 2 ? AMPLITUDE_ANGLE * AVAILABLE_ANGLE_COEFFICIENT * -1 : rotateX;

    console.log(index, offset, rotateX)
    return rotateX;
  }

  render() {
    const {cards = [], scrollValue} = this.props;
    const {offsetAngle, cardsCount} = this.state;

    return (
      <View style={styles.container}>
        {cards.map((card, index) => {
          const offset = this.calculateOffset(scrollValue, index);
          const rotateX = this.calculateRotationAngle(scrollValue, index, offset)

          return <Animated.View
            key={index}
            style={[styles.card, {
              zIndex: cardsCount - index,
              transform: [
                {translateY: RADIUS / 2 + (offset) * 2 - 216 * index},
              ]
            }
            ]}
          >
            <Image source={require('../card/card.png')} style={[styles.image, {
              transform: [
                {perspective: 1000 + scrollValue * index},
                {rotateX: `${rotateX}deg`},
              ]
            }]}/>
          </Animated.View>
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#6A85B1',
    height: 500
  },
  card: {
    position: 'relative',
    left: 0,
    right: 0,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  image: {
    width: 343,
    height: 216,
    alignSelf: 'center'
  }
});
