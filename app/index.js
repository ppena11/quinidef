import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import CrearCuenta from './screens/CrearCuenta';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
});

export default () => <CrearCuenta />;
