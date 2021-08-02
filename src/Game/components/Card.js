import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Card = ({item, clickCard, openedPairs}) => {
  if (!item.name) {
    return <View style={styles.empty_card} />;
  }
  return (
    <View
      style={[
        styles.cardContainer,
        openedPairs[item.name] ? {opacity: 0.5} : {},
      ]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={clickCard}
        activeOpacity={item.is_open || openedPairs[item.name] ? 1 : 0.75}
        underlayColor={'#f1f1f1'}>
        <Text style={styles.card_text}>{item.is_open ? item.name : '?'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  empty_card: {
    flex: 1,
    height: 60,
    marginHorizontal: 6,
  },
  cardContainer: {
    flex: 1,
    borderWidth: 1,
    height: 60,
    marginHorizontal: 6,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Card;
