import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import ReiniciarContrasena from './ReiniciarContrasena';
import CrearCuenta from './CrearCuenta';
import ConfirmacionCorreo from './ConfirmacionCorreo';
import Home from './Home';

const RootNavigator = StackNavigator({
  Home: {
    screen: Login,
  },
  ReiniciarContrasena: {
    screen: ReiniciarContrasena,
  },
  CrearCuenta: {
    screen: CrearCuenta,
  },
  ConfirmacionCorreo: {
    screen: ConfirmacionCorreo,
  },
  Log: {
    screen: Home,
  },
});

export default RootNavigator;
