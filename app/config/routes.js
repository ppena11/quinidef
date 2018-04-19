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
import RegistrarQuiniela from '../screens/RegistrarQuiniela';
import ReglasAdmin from '../screens/ReglasAdmin';

import EliminarApuesta from '../screens/EliminarApuesta';

import CargandoHome from '../screens/CargandoHome';
import SolicitarPago from '../screens/SolicitarPago';

const stackRouterConfig = { initialRouteName: 'CargandoHome' };

const RootNavigator = StackNavigator(
  {
    Login: {
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
    RegistrarQuiniela: {
      screen: RegistrarQuiniela,
    },

    EliminarApuesta: {
      screen: EliminarApuesta,
    },

    CargandoHome: {
      screen: CargandoHome,
    },

    ReglasAdmin: {
      screen: ReglasAdmin,
    },
  },
  stackRouterConfig,
);

export default RootNavigator;
