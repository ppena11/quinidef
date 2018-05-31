import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider, connect } from "react-redux";
import firebase from "firebase";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { NetInfo } from "react-native";
import _ from "lodash";

import store from "./config/store";
import RootNavigator from "./config/routes";

EStyleSheet.build({});

const App = ({ dispatch, nav }) => <RootNavigator />;

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0",
      authDomain: "react-native-firebase-20f8d.firebaseapp.com",
      databaseURL: "https://react-native-firebase-20f8d.firebaseio.com"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    console.ignoredYellowBox = [
      'Setting a timer',
      'Warning: isMounted',
      'VirtualizedList',
      'Remote debugger'
    ];
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}
