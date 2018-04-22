import React from 'react';
import { TabNavigator } from 'react-navigation';

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
import Apuestas from '../screens/Apuestas';
import Apuesta from '../screens/Apuesta';
import Posiciones from '../screens/Posiciones';
import Reglas from '../screens/Reglas';

import EliminarApuesta from '../screens/EliminarApuesta';

import CargandoHome from '../screens/CargandoHome';

const RootNavigatort = TabNavigator({
  Apuestas: {
    screen: Apuestas,
  },
  Posiciones: {
    screen: Posiciones,
  },
  Reglas: {
    screen: Reglas,
  },
});

export default RootNavigatort;
