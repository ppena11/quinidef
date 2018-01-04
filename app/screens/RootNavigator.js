import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import ReiniciarContrasena from './ReiniciarContrasena';

const RootNavigator = StackNavigator({
  Home: {
    screen: Login,
    title: 'Home',
  },
  Details: {
    screen: ReiniciarContrasena,
  },
});

export default RootNavigator;
