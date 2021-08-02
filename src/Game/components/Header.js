import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Cell = ({label, value}) => {
  return (
    <View style={styles.labelConatiner}>
      <Text style={styles.labelText}>
        <Text style={{fontWeight: 'bold'}}>{label}</Text>: {value}
      </Text>
    </View>
  );
};

const Header = ({turns, matches}) => {
  return (
    <View style={styles.headerContainer}>
      <Cell label={'Macthes'} value={matches} />
      <View style={{flex: 1}} />
      <Cell label={'Moves'} value={turns} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
  },
});

export default Header;
