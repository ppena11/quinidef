import { Text, View } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";

import RootNavigatort from "../config/routest";

const App = ({ dispatch, nav }) => <RootNavigatort />;

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default class extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params
        ? `${params.quiniela.uid} -  ${params.quiniela.quinielaNombre}`
        : "A Nested Details Screen",
      headerStyle: {
        backgroundColor: "#084B7C"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  render() {
    return <AppWithNavigation />;
  }
}
