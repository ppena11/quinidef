import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RootNavigatort from '../config/routest';

const App = ({ dispatch, nav }) => <RootNavigatort />;

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class extends Component {
  render() {
    return <AppWithNavigation />;
  }
}
