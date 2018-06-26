import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider, connect } from "react-redux";
import firebase from "firebase";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
// import { NetInfo } from "react-native";
import _ from "lodash";

import store from "./config/store";
import RootNavigator from "./config/routes";

EStyleSheet.build({});

const App = ({ dispatch, nav }) => <RootNavigator />

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigation = connect(mapStateToProps)(App)

const entornoProductivoFirebase = true; // cambiar a false para apuntar a proyecto de pruebas

export default class extends Component {
  componentWillMount() {
    let firebaseConfig
    if (entornoProductivoFirebase) {
      firebaseConfig = {
        // Entorno Productivo
        apiKey: "AIzaSyAjBk7uGmz4TzmBlEzi8VuHPC0GjVmXDuw",
        authDomain: "futbol-y-quinielas.firebaseapp.com",
        databaseURL: "https://futbol-y-quinielas.firebaseio.com"
      }
    } else {
      firebaseConfig = {
        // Entorno de Pruebas
        apiKey: "AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0",
        authDomain: "react-native-firebase-20f8d.firebaseapp.com",
        databaseURL: "https://react-native-firebase-20f8d.firebaseio.com"
      }
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    console.ignoredYellowBox = [
      'Setting a timer',
      'Warning: isMounted',
      'Remote debugger',
      'VirtualizedList'
    ];
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
};
