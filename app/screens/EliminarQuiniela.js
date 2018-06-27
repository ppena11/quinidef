import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  View,
  TextInput,
  Text,
  BackHandler
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import firebase from "firebase";
import { connect } from "react-redux";

import {
  eliminarJugador,
  reducirDisponibles,
  cambiarEstatusQuinielaA,
  irTusQuinielas,
  buscarQuinielas,
  reducirPorActivar,
  aumentarDisponibles
} from "../actions";
import { Container } from "../components/Container";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Titulo } from "../components/Titulo";
import color from "../comun/colors";

class EliminarQuiniela extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = {
      q: "",
      menu: "yes",
      inputfield: "",
      warning: "no",
      bloqueado: false,
      botonesDeshabilitados: false
    }

    this.updateInputValue = this.updateInputValue.bind(this)
    this.eliminarTest1 = this.eliminarTest1.bind(this)
    this.run = this.run.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
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
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    )

    console.log("(EliminarQuiniela->Como Usuario) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()

    console.log("(EliminarQuiniela->Como Usuario) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    this.setState({ bloqueado: false })
  }

  handleBackButton() {
    console.log("(EliminarQuiniela) handleBackButton")
    this.props.screenProps.rootNavigation.goBack()
    return true
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" })
  }

  keyboardWillHide = () => {
    this.setState({ menu: "yes" })
  }

  eliminar(goBack) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    const { quiniela } = this.props.navigation.state.params
    this.props.eliminarJugador(quiniela)
    goBack()
  }

  eliminarTest1(goBack) {
    if (this.state.bloqueado != true) {
      const { quiniela, jugadores, nav } = this.props.navigation.state.params
      // console.log('TEST');
      // navigate('CreaciondeQuiniela');
      //console.log(nav);
      if (quiniela.codigoq == this.state.inputfield) {
        this.props.eliminarJugador(
          quiniela,
          quiniela.quiniela,
          quiniela.nombreapuesta,
          jugadores
        )
        this.setState({ bloqueado: true })
        this.run(quiniela.quiniela, quiniela, goBack, nav)
        //
      } else {
        this.setState({ warning: "yes" })
      }
    }
  }

  run = async (qu, jug, goBack, nav) => {
    try {
      // const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      // await Promise.all([someCall(), anotherCall()]);

      // const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1);
      // this.setState({ toggled: this.props.jugadores[uid].activo });
      // console.log(test);
      console.log(qu)
      const t = await this.props.reducirPorActivar(qu, jug.activo)
      if (t.committed) {
        //  console.log(t.snapshot.val());
        //  console.log(jug);
        const test = await this.props.cambiarEstatusQuinielaA(
          qu,
          t.snapshot.val(),
          qu
        )
      }

      //   console.log(`TESXXXXXXXXXXXXXXXXXXXXXXXXXXXTTTTTTTTT ${test}`);
      // console.log("nav");
      this.props.buscarQuinielas(jug.jid)
      this.props.screenProps.rootNavigation.goBack(null)

      // this.setState({ validando: false });
    } catch (e) {
      console.log(e)
      goBack()
      // this.setState({ validando: false });
    }
  }

  updateInputValue(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    this.setState({ inputfield: t.toUpperCase() })
    this.setState({ warning: "no" })
    // console.log(`ttttttttttttttttttttttttttt : ${t}`);
  }

  cancelar() {
    this.props.navigation.goBack()
  }

  pressed(e) {
    Keyboard.dismiss()
  }

  menustatus(jugador) {
    if (this.state.menu === "yes") {
      return <Titulo>Eliminar apuesta</Titulo>
    }
    return <View />
  }

  warning() {
    if (this.state.warning === "yes") {
      return <Text style={styles.warning}>El código no coincide{"\n"}</Text>
    }
    return <Text />
  }

  menustatus1(jugador) {
    if (this.state.menu !== "yes") {
      return <Text style={styles.subtitulo1} />
    }
    return <View />
  }

  render() {
    const { navigate, goBack } = this.props.navigation
    const { quiniela } = this.props.navigation.state.params

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            {this.menustatus(quiniela.nombreapuesta)}
            <Text style={styles.subtitulo1}>
              {this.warning()}
              <Text>
                Introduce el código del grupo para eliminar tu quiniela:{
                  "\n"
                }
                <Text style={styles.bold}>{quiniela.nombreapuesta}</Text>
              </Text>
            </Text>
            <View style={styles2.conta}>
              <View style={styles2.vire} />
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid={color.$underlineColorAndroid}
                placeholder="Codigo"
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
              Código de grupo:{" "}
              {this.props.navigation.state.params.quiniela.codigoq}{" "}
            </Text>
            {this.menustatus1(quiniela.nombreapuesta)}
          </View>

          {/* <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal> */}

          <KeyboardAvoidingView behavior="padding">
            <BotonPrincipal
              botonDeshabilitado={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.eliminarTest1(goBack))}
            >
              Eliminar Quiniela
            </BotonPrincipal>
            <BotonPrincipal
              botonDeshabilitado={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.cancelar())}
            >
              Cancelar
            </BotonPrincipal>
          </KeyboardAvoidingView>
        </View>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 20,
  },
  warning: {
    fontWeight: "bold",
    fontSize: 20,
    color: color.$textIndicationLabelColor,
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "400",
    color: color.$tituloTextColor,
    textAlign: "center",
  },
  subtitulo1: {
    padding: 10,
    fontSize: 15,
    fontWeight: "400",
    color: color.$tituloTextColor,
    textAlign: "center",
  },
  titulo: {
    padding: 20,
    marginVertical: 0,
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
  }
})

const styles2 = EStyleSheet.create({
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
  }
});

const mapStateToProps = state => {
  const tt = _.map(state.jugadoresadmin, (val, uid) => ({ ...val, uid }))

  const jugadores = _.orderBy(tt, ["nombre"], ["asc"])

  return {
    jugadores,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar
  }
};

export default connect(mapStateToProps, {
  eliminarJugador,
  reducirDisponibles,
  reducirPorActivar,
  cambiarEstatusQuinielaA,
  irTusQuinielas,
  buscarQuinielas,
  aumentarDisponibles
})(EliminarQuiniela);
