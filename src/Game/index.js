import React, {Component} from 'react';
import {View, FlatList, Alert, StyleSheet} from 'react-native';

import Header from './components/Header';
import Card from './components/Card';

import {shuffleArray, cards as card_data, CARDS_IN_ROW} from '../utility';

class Game extends Component {
  constructor(props) {
    super(props);

    this.openedCards = {};
    this.state = {
      cards: this.getShuffeledCards(),
      current_selection: [],
      openedPairs: {},
      matches: 0,
      turns: 0,
      score: 0,
    };
  }

  getShuffeledCards = () => {
    let clone = JSON.parse(JSON.stringify(card_data));
    let cards = [...card_data, ...clone];
    let remaining_cards =
      Math.ceil(cards.length / CARDS_IN_ROW) * CARDS_IN_ROW - cards.length;
    cards = shuffleArray(cards);
    for (let index = 0; index < remaining_cards; index++) {
      cards.push({});
    }
    return cards;
  };

  renderCard = ({item, index}) => {
    const {openedPairs} = this.state;
    return (
      <Card
        key={index}
        item={item}
        openedPairs={openedPairs}
        clickCard={() => this.clickCard(index)}
      />
    );
  };

  clickCard = index => {
    let {openedPairs, current_selection, turns, score, matches, cards} =
      this.state;

    openedPairs = {...openedPairs};
    cards = [...cards];

    if (!cards[index].is_open && !openedPairs[cards[index].name]) {
      cards[index] = {...cards[index], is_open: true};
      current_selection.push({
        index: index,
        name: cards[index].name,
      });

      if (current_selection.length == 2) {
        turns = turns + 1;
        if (current_selection[0].name == current_selection[1].name) {
          openedPairs[cards[index].name] = 1;
          score = score + 1;
          if (score == card_data.length) {
            Alert.alert('Awesome!', 'You won the game');
            cards = this.getShuffeledCards();
            openedPairs = {};
            score = 0;
            turns = 0;
            matches = matches + 1;
          }
        } else {
          let firstCardIndex = current_selection[0].index;
          setTimeout(() => {
            cards[firstCardIndex] = {
              ...cards[firstCardIndex],
              is_open: false,
            };
            cards[index] = {
              ...cards[index],
              is_open: false,
            };
            this.setState({
              cards: cards,
            });
          }, 500);
        }
        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        turns,
        matches,
        openedPairs: openedPairs,
        current_selection: current_selection,
      });
    }
  };

  render() {
    const {cards, turns, matches} = this.state;
    return (
      <View style={styles.container}>
        <Header turns={turns} matches={matches} />
        <View style={styles.body}>
          <FlatList
            data={cards}
            renderItem={this.renderCard}
            numColumns={CARDS_IN_ROW}
            keyExtractor={(item, index) => `${index}`}
            columnWrapperStyle={styles.flatlistRow}
            contentContainerStyle={styles.flatlistContentContainerStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
  flatlistRow: {
    flex: 1,
    padding: 10,
  },
  flatlistContentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Game;
