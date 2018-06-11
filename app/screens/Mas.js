import React, { Component } from "react";
import firebase from "firebase";
import _ from "lodash";
import moment from "moment";
import {
  StatusBar,
  View,
  Keyboard,
  BackHandler,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";

import {
  buscarPartidos,
  modificarApuestasBD,
  buscarApuestas,
  buscarHora,
  escribirHora,
  bloquearPartido,
  salirSistema
} from "../actions";
import { Container } from "../components/Container";
import { Titulo } from "../components/Titulo";
import { ListaMas } from "../components/ListaMas";
import { PuntajeJugador } from "../comun/puntaje";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Spinner } from "../components/Spinner";

import color from "../comun/colors";

class Mas extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      partidos: {},
      apuestas: {},
      validando: false,
      menu: "yes",
      botonesDeshabilitados: false
    };

    this.renderRow = this.renderRow.bind(this);
    this.preseed = this.preseed.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 1999);
    funcion();
  }

  componentDidMount() {
    console.log("(Mas) componentDidMount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    console.log("(Mas) componentWillUnmount");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    console.log("(Mas) handleBackButton");
    console.log('(Mas) this.props ', this.props);
    this.props.screenProps.rootNavigation.goBack();
    // this.props.navigation.goBack();
    return true;
  }

  preseed(partidos) {
    if (partidos.imagen == "basura") {
      this.props.navigation.navigate("EliminarQuiniela", {
        quiniela: this.props.quiniela,
        jugadores: this.props.jugadores
      });
    }
    if (partidos.imagen == "salir") {
      this.props.salirSistema();
    }
    if (partidos.imagen == "admin") {
      this.props.navigation.navigate("DatosAdmin", {
        quiniela: this.props.quiniela,
        jugadores: this.props.jugadores
      });
    }
  }

  renderRow(partidos) {
    //console.log(this.props.navigation);
    return (
      <ListaMas
        nav={this.props.navigation}
        quiniela={this.props.quiniela}
        menu={partidos}
        botonDeshabilitado={this.state.botonesDeshabilitados}
        onPress={() => this.evitaMultiTouches(() => this.preseed(partidos))}
      />
    );
  }

  render() {
    let menu = [
      { imagen: "admin", titulo: "Datos del Administrador" },
      { imagen: "basura", titulo: "Eliminar Quiniela" },
      // { imagen: "salir", titulo: "Salir del Sistema" }
    ];

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.cuerpo}>
            <FlatList
              data={menu}
              renderItem={({ item }) => this.renderRow(item)}
              onEndReachedThershold={0}
              ref={ref => {
                this.listRef = ref;
              }}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  titulo: {
    padding: 20,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10,
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11,
  },

  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vire: {
    flex: 1,
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center",
  }
});

const mapStateToProps = state => {
  const jugadores = state.jugadoresadmin;
  const quiniela = state.quini;
  const hora = state.hora;

  return { quiniela, jugadores };
};

export default connect(mapStateToProps, {
  buscarApuestas,
  buscarPartidos,
  buscarHora,
  modificarApuestasBD,
  escribirHora,
  bloquearPartido,
  salirSistema
})(Mas);
