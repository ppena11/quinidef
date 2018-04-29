import React, { Component } from "react";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import { connect } from "react-redux";

class Posiciones extends Component {
  render() {
    console.log(this.props.quiniela);
    return <Text> REGLAS TETETTETE</Text>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  quinielas: state.quinielas,
  quiniela: state.quini
});

export default connect(mapStateToProps, {})(Posiciones);
