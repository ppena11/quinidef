import React from "react";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";

import Login from "../screens/Login";
import ReiniciarContrasena from "../screens/ReiniciarContrasena";
import CrearCuenta from "../screens/CrearCuenta";
import ConfirmacionCorreo from "../screens/ConfirmacionCorreo";
import Home from "../screens/Home";
import TusQuinielas from "../screens/TusQuinielas";
import QuinielasAdministradas from "../screens/QuinielasAdministradas";
import CreaciondeQuiniela from "../screens/CreaciondeQuiniela";
import DetalleQuinielaAdministrada from "../screens/DetalleQuinielaAdministrada";
import UnirseAQuiniela from "../screens/UnirseAQuiniela";
import RegistrarQuiniela from "../screens/RegistrarQuiniela";
import ReglasAdmin from "../screens/ReglasAdmin";
import Apuestas from "../screens/Apuestas";
//import Apuesta from "../screens/Apuesta";
import Posiciones from "../screens/Posiciones";
import Reglas from "../screens/Reglas";
import DetallesApuestas from "../screens/DetallesApuestas";
import EliminarQuiniela from "../screens/EliminarQuiniela";
import Mas from "../screens/Mas";
import Ionicons from "react-native-vector-icons/Ionicons";
import EliminarApuesta from "../screens/EliminarApuesta";
import EliminarQuinielaAdministrada from "../screens/EliminarQuinielaAdministrada";

import CargandoHome from "../screens/CargandoHome";

const stackRouterConfig = {
  navigationOptions: ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params
        ? `${params.quiniela.nombreapuesta} - ${
            params.quiniela.quinielaNombre
          } - ${params.quiniela.puntos} PTS`
        : "A Nested Details Screen",
      headerStyle: {
        backgroundColor: "#084B7C"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  },
  initialRouteName: "CargandoHome"
};

const PosicionesStack = StackNavigator(
  {
    HomePosiciones: {
      screen: Posiciones
    },
    DetallesPosiciones: {
      screen: DetallesApuestas
    },
});

const MasStack = StackNavigator(
  {
    Mas: {
      screen: Mas
    },
    EliminarQuiniela: {
      screen: EliminarQuiniela
    },
});

const RootNavigatort = TabNavigator(
  {
    Apuestas: {
      screen: Apuestas
    },
    Posiciones: {
      screen: PosicionesStack
    },
    Reglas: {
      screen: Reglas
    },
    Mas: {
      screen: MasStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Apuestas") {
          iconName = `md-football${focused ? "" : ""}`;
        } else if (routeName === "Posiciones") {
          iconName = `md-analytics${focused ? "" : ""}`;
        } else if (routeName === "Reglas") {
          iconName = `md-flag${focused ? "" : ""}`;
        } else if (routeName === "Mas") {
          iconName = `md-options${focused ? "" : ""}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "gray",
      activeBackgroundColor: "#084B7C",
      inactiveBackgroundColor: "#084B7C"
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    // lazy: false,
  }
);

const RootNavigator = StackNavigator(
  {
    CargandoHome: {
      screen: CargandoHome
    },

    Login: {
      screen: Login
    },
    ReiniciarContrasena: {
      screen: ReiniciarContrasena
    },
    CrearCuenta: {
      screen: CrearCuenta
    },
    
    TusQuinielas: {
      screen: TusQuinielas
    },
    UnirseAQuiniela: {
      screen: UnirseAQuiniela
    },
    RegistrarQuiniela: {
      screen: RegistrarQuiniela
    },

    QuinielasAdministradas: {
      screen: QuinielasAdministradas
    },
    CreaciondeQuiniela: {
      screen: CreaciondeQuiniela
    },
    EliminarQuinielaAdministrada: {
      screen: EliminarQuinielaAdministrada
    },
    ReglasAdmin: {
      screen: ReglasAdmin
    },
    DetalleQuinielaAdministrada: {
      screen: DetalleQuinielaAdministrada
    },
    EliminarApuesta: {
      screen: EliminarApuesta
    },

    // ConfirmacionCorreo: {
    //   screen: ConfirmacionCorreo
    // },
    // Log: {
    //   screen: Home
    // },

    Apuesta: {
      screen: ({ navigation }) => (
        <RootNavigatort screenProps={{ rootNavigation: navigation }} />
      ),
    },

    // Apuestas: {
    //   screen: Apuestas
    // },
    // EliminarQuiniela: {
    //   screen: EliminarQuiniela
    // },

  },
  stackRouterConfig
);

export default RootNavigator;
