import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider, connect } from 'react-redux';
import firebase from 'firebase';
import { addNavigationHelpers } from 'react-navigation';

import store from './config/store';
import RootNavigator from './config/routes';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
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
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}
