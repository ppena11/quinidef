import React, { Component } from "react";
import {
  StatusBar,
  Keyboard,
  View,
  TextInput,
  Text,
  BackHandler
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import {
  eliminarJugador,
  reducirDisponibles,
  cambiarEstatusQuinielaA,
  irTusQuinielas,
  eliminarQuinielaAdministrada,
  buscarQuinielasAdministradas
} from "../actions";
import { Container } from "../components/Container";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { HeaderText } from '../components/HeaderText';
import color from "../comun/colors";

class EliminarQuinielaAdministrada extends Component {
  static navigationOptions = {
    headerTitle: <HeaderText texto="Eliminar Grupo"/>,
  };
  constructor(props) {
    super(props);

    this.state = {
      users: _.map(
        this.props.navigation.state.params.quiniela.Users,
        (val, uid) => ({
          ...val,
          uid
        })
      ),
      filteredUsers: _.map(
        this.props.navigation.state.params.quiniela.Users,
        (val, uid) => ({
          ...val,
          uid
        })
      ),
      q: "",
      menu: "yes",
      inputfield: "",
      warning: "no",
      botonesDeshabilitados: false
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.eliminarTest1 = this.eliminarTest1.bind(this);
    this.run = this.run.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 4999);
    funcion();
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );

    console.log("(EliminarQuinielaAdministrada) componentDidMount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();

    console.log("(EliminarQuinielaAdministrada) componentWillUnmount");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    this.props.navigation.goBack();
    return true;
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" });
  };

  keyboardWillHide = () => {
    this.setState({ menu: "yes" });
  };

  eliminar(goBack) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    const { quiniela } = this.props.navigation.state.params;
    this.props.eliminarQuinielaAdministrada(quiniela);
    goBack();
  }

  eliminarTest1(goBack) {
    const { quiniela } = this.props.navigation.state.params;
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    if (quiniela.codigoq == this.state.inputfield) {
      this.props.eliminarQuinielaAdministrada(quiniela);
      // this.run(quiniela, jugador, goBack);
      //
      this.props.buscarQuinielasAdministradas();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "QuinielasAdministradas" })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({ warning: "yes" });
    }
  }

  run = async (qu, jug, goBack) => {
    try {
      // const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      // await Promise.all([someCall(), anotherCall()]);

      // const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1);
      // this.setState({ toggled: this.props.jugadores[uid].activo });
      // console.log(test);
      const t = await this.props.reducirDisponibles(qu);
      if (t.committed) {
        //  console.log(t.snapshot.val());
        //  console.log(jug);
        const test = await this.props.cambiarEstatusQuinielaA(
          qu,
          t.snapshot.val(),
          jug
        );
        //   console.log(`TESXXXXXXXXXXXXXXXXXXXXXXXXXXXTTTTTTTTT ${test}`);
        //goBack();
        // console.log(this.props.nav);
        //this.props.irTusQuinielas();
        goBack();
      }
      // this.setState({ validando: false });
    } catch (e) {
      console.log(e);
      goBack();
      // this.setState({ validando: false });
    }
  };

  updateInputValue(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    this.setState({ inputfield: t.toUpperCase() });
    this.setState({ warning: "no" });
    // console.log(`ttttttttttttttttttttttttttt : ${t}`);
  }

  cancelar() {
    this.props.navigation.goBack();
  }

  pressed(e) {
    Keyboard.dismiss();
  }

  menustatus(jugador) {
    if (this.state.menu === "yes") {
      // return <Titulo>ELIMINAR QUINIELA</Titulo>;
    }
    return <View />;
  }

  warning() {
    if (this.state.warning === "yes") {
      return <Text style={styles.warning}>El código no coincide{"\n"}</Text>;
    }
    return <Text />;
  }

  menustatus1(jugador) {
    if (this.state.menu !== "yes") {
      return <Text style={styles.subtitulo1} />;
    }
    return <View />;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { quiniela } = this.props.navigation.state.params;

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            {this.menustatus(quiniela.quinielaNombre)}
            <Text style={styles.subtitulo1}>
              {this.warning()}
              <Text>
                Introduce el código del grupo para eliminar el grupo:{"\n"}
                <Text style={styles.bold}>{quiniela.quinielaNombre}</Text>
              </Text>
            </Text>
            <View style={styles2.conta}>
              <View style={styles2.vire} />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={color.$underlineColorAndroid}
                placeholder="Código"
                placeholderTextColor={color.$placeholderTextColor}
                selectionColor={color.$selectionColor}
                keyboardType="email-address"
                autoCapitalize="none"
                // onSubmitEditing={() => this.eliminarTest1(goBack)}
                onChangeText={t => this.updateInputValue(t)}
                value={this.state.inputfield}
              />
              <View style={styles2.vire} />
            </View>
            <Text style={styles.subtitulo1}>
              Código del Grupo: {quiniela.codigoq}{" "}
            </Text>
            {this.menustatus1(quiniela.quinielaNombre)}
          </View>

          <View style={styles.bottom}>
            <View>
              {/* <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal> */}
              <BotonPrincipal
                botonDeshabilitado={this.state.botonesDeshabilitados}
                onPress={() => this.evitaMultiTouches(() => this.eliminarTest1(goBack))}
              >
                Eliminar Grupo
              </BotonPrincipal>
              <BotonPrincipal
                botonDeshabilitado={this.state.botonesDeshabilitados}
                onPress={() => this.evitaMultiTouches(() => this.cancelar())}
              >
                Cancelar
              </BotonPrincipal>
            </View>
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
    flexDirection: "column"
  },
  bold: {
    fontWeight: "bold",
    fontSize: 20
  },
  warning: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red"
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "400",
    color: color.$tituloTextColor,
    textAlign: "center"
  },
  subtitulo1: {
    padding: 10,
    fontSize: 15,
    fontWeight: "400",
    color: color.$tituloTextColor,
    textAlign: "center"
  },
  titulo: {
    padding: 20,
    marginVertical: 0
  },
  cuerpo: { flex: 1 },
  bottom: {
    padding: 20
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10
  }
});

const styles2 = EStyleSheet.create({
  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  vire: {
    flex: 1
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  }
});
const mapStateToProps = state => {
  const tt = _.map(state.jugadoresadmin, (val, uid) => ({ ...val, uid }));

  const jugadores = _.orderBy(tt, ["nombre"], ["asc"]);

  return {
    jugadores,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar
  };
};

export default connect(mapStateToProps, {
  eliminarJugador,
  reducirDisponibles,
  cambiarEstatusQuinielaA,
  irTusQuinielas,
  eliminarQuinielaAdministrada,
  buscarQuinielasAdministradas
})(EliminarQuinielaAdministrada);
