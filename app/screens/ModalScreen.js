import React, { Component } from "react";
import {
  StatusBar,
  ListView,
  View,
  FlatList,
  Text,
  BackHandler,
  Image,
  Alert
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import { connect } from "react-redux";
import firebase from "firebase";
import { NavigationActions } from "react-navigation";

import {
  buscarQuinielas,
  salir,
  irAdministradas,
  salirSistema
} from "../actions";
import { Container } from "../components/Container";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Titulo } from "../components/Titulo";
import { Qx } from "../components/Qx";
import color from "../comun/colors";
import { Spinner } from "../components/Spinner";

class ModalScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      validando: false,
      qu: {}
    };

    this.loading = this.loading.bind(this);
    this.run = this.run.bind(this);
    this.handleBackButtonTusQuinielas = this.handleBackButtonTusQuinielas.bind(
      this
    );
  }

  render() {
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <Text style={styles.form}>EPALE ARREGLA EL INTERNET</Text>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,

    justifyContent: "space-between",
    flexDirection: "column"
  },
  titulo: {
    padding: 20
  },
  cuerpo: {
    flex: 1
  },
  bottom: {
    padding: 20
  },
  viewImgStyle: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  imgStyle: {
    height: 200,
    width: 200
  },
  viewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const tt = _.map(state.quinielas, (val, uid) => ({ ...val, uid }));
  const quinielas = _.orderBy(tt, ["nombreapuesta"], ["asc"]);
  // console.log(quinielas);
  return { quinielas };
};

export default connect(mapStateToProps, {
  buscarQuinielas,
  salir,
  irAdministradas,
  salirSistema
})(ModalScreen);
