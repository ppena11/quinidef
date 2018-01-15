import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, connect } from 'react-redux';
import firebase from 'firebase';
import { addNavigationHelpers } from 'react-navigation';

import store from './config/store';
import RootNavigator from './config/routes';

EStyleSheet.build({
  $primaryBackground: '#084b7c',
  $white: '#ffffff',
  $fondoBotonPrincipal: '#00244f',
  $fondoBotonInput: 'rgba(255, 255,255,0.2)',
});

const App = ({ dispatch, nav }) => (
  <RootNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0',
      authDomain: 'react-native-firebase-20f8d.firebaseapp.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.

        console.log('Usuario auth');
      } else {
        // No user is signed in.

        console.log('Usuario desauth');
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}
