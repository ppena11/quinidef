import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import ReiniciarContrasena from '../screens/ReiniciarContrasena';
import CrearCuenta from '../screens/CrearCuenta';
import ConfirmacionCorreo from '../screens/ConfirmacionCorreo';
import Home from '../screens/Home';
import TusQuinielas from '../screens/TusQuinielas';

const stackRouterConfig = { initialRouteName: 'TusQuinielas' };

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
    TusQuinielas: {
      screen: TusQuinielas,
    },
  },
  stackRouterConfig,
);

export default RootNavigator;
