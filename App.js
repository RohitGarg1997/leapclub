import React from 'react';
import {SafeAreaView} from 'react-native';

import Game from './src/Game';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Game />
    </SafeAreaView>
  );
};

export default App;
