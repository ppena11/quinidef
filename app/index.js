import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Login from './screens/Login';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
});

export default () => <Login />;
