import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import ReiniciarContrasena from '../screens/ReiniciarContrasena';
import CrearCuenta from '../screens/CrearCuenta';
import ConfirmacionCorreo from '../screens/ConfirmacionCorreo';
import Home from '../screens/Home';

const stackRouterConfig = { initialRouteName: 'Home' };

const RootNavigator = StackNavigator(
  {
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
  },
  stackRouterConfig,
);

export default RootNavigator;
