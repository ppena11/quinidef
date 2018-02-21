import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import ReiniciarContrasena from '../screens/ReiniciarContrasena';
import CrearCuenta from '../screens/CrearCuenta';
import ConfirmacionCorreo from '../screens/ConfirmacionCorreo';
import Home from '../screens/Home';
import TusQuinielas from '../screens/TusQuinielas';
import QuinielasAdministradas from '../screens/QuinielasAdministradas';
import CreaciondeQuiniela from '../screens/CreaciondeQuiniela';
import DetalleQuinielaAdministrada from '../screens/DetalleQuinielaAdministrada';
import UnirseAQuiniela from '../screens/UnirseAQuiniela';

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
    TusQuinielas: {
      screen: TusQuinielas,
    },
    QuinielasAdministradas: {
      screen: QuinielasAdministradas,
    },
    CreaciondeQuiniela: {
      screen: CreaciondeQuiniela,
    },

    DetalleQuinielaAdministrada: {
      screen: DetalleQuinielaAdministrada,
    },
    UnirseAQuiniela: {
      screen: UnirseAQuiniela,
    },
  },
  stackRouterConfig,
);

export default RootNavigator;
