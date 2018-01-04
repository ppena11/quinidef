import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import RootNavigator from './screens/RootNavigator';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
});

export default () => <RootNavigator />;
