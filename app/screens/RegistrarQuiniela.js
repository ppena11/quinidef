import React, { Component } from "react"
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  TextInput,
  Keyboard,
  TouchableOpacity
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"

import { Container } from "../components/Container"
import { Titulo } from "../components/Titulo"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { Spinner } from "../components/Spinner"
import { HeaderText } from "../components/HeaderText"
import color from "../comun/colors"

import {
  buscarCodigos,
  agregarJugador,
  crearNombreQuiniela,
  crearNombreQuinielaLocal,
  manejarActivosA,
  manejarActivos,
  buscarPartidos,
  borrarNombreQuiniela
} from "../actions"

class RegistrarQuiniela extends Component {
  static navigationOptions = {
    headerTitle: <HeaderText texto="Registro de Quiniela" />
  }

  constructor(props) {
    super(props)
    this.state = {
      inputfield: "",
      validando: false,
      teclado: false,
      botonesDeshabilitados: false
    }

    this.updateInputValue = this.updateInputValue.bind(this)
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
    console.log("(RegistrarQuiniela) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()

    console.log("(RegistrarQuiniela) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    this.props.navigation.goBack()
    return true
  }

  keyboardWillShow = () => {
    this.setState({ teclado: true })
  }

  keyboardWillHide = () => {
    this.setState({ teclado: false })
  }

  run = async navigate => {
    try {
      const {
        torneo,
        torneoid,
        quinielaNombre,
        quinielaID,
        admin,
        codigoq
      } = this.props.navigation.state.params.quiniela
      const name = await this.props.crearNombreQuiniela(
        quinielaID,
        this.state.inputfield.toUpperCase()
      )
      const partidos = await this.props.buscarPartidos(torneoid)
      const r1 = partidos.toJSON()
      // console.log(r1);
      // this.setState({ partidos: r1 });
      // console.log(`NAMEEEEEEEEEEEEEEEEEEEEEEEEEE ${name.committed}`);
      if (name.committed) {
        const test = await this.props.agregarJugador(
          quinielaID,
          this.state.inputfield.toUpperCase(),
          torneo,
          torneoid,
          quinielaNombre,
          r1,
          codigoq
        )
        const hh = await this.props.manejarActivos(quinielaID)
        const hh1 = await this.props.manejarActivosA(
          quinielaID,
          admin,
          hh.snapshot.val()
        )

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "TusQuinielas" })]
        })
        this.props.navigation.dispatch(resetAction)
        // navigate('TusQuinielas');
        this.setState({ validando: false })
      } else {
        this.setState({ validando: false })
        alert("El nombre de usuario ya existe en la quiniela")
        // console.log('NOMBRE YA EXISTE');
      }
    } catch (e) {
      //  console.log(e);
      this.setState({ validando: false })
    }
  }

  pressed(navigate) {
    if (!this.state.validando) {
      this.setState({ validando: true })
      Keyboard.dismiss()
      if (
        this.state.inputfield.length > 0 &&
        this.state.inputfield.length < 21
      ) {
        this.run(navigate)
      } else {
        alert("Por favor introduce un nombre válido menor de 20 caracteres")
        this.setState({ validando: false })
      }
    }
  }
  cancelar(navigate) {
    this.props.navigation.goBack()
  }

  updateInputValue(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    this.setState({ inputfield: t })
    // this.setState({ warning: 'no' });
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />
    }
    return <Text style={styles.buttonText}>Registrar</Text>
  }

  cuerpo() {
    if (!this.state.teclado) {
      return (
        <View style={styles.cuerpo}>
          <Text style={styles.texto}>
            Grupo:{" "}
            {this.props.navigation.state.params.quiniela.quinielaNombre}
            {"\n"}
            Torneo: {this.props.navigation.state.params.quiniela.torneo}
            {"\n"}
            Código de Grupo:{" "}
            {this.props.navigation.state.params.quiniela.codigoq}
            {"\n"}
            Administrador: {this.props.navigation.state.params.admin.nombre}
            {"\n"}
          </Text>
        </View>
      )
    }
    return <View />
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.titulo}>
          {/* <Titulo>Escribe un nombre de usuario para tu quiniela</Titulo> */}
          <Text style={styles.textoTitulo}>
            Introduzca un nombre para su quiniela:
          </Text>
        </View>
        <View style={styles.conta}>
          {/* <View style={styles.vire} /> */}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid={color.$underlineColorAndroid}
            placeholder="Nombre de usuario..."
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            keyboardType="email-address"
            autoCapitalize="none"
            // onSubmitEditing={() => this.pressed()}
            onChangeText={q => this.updateInputValue(q)}
          />
          <View style={styles.vire} />
        </View>
        {this.cuerpo()}
        <View style={styles.bottom}>
          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.pressed(navigate))}
            >
              {this.status()}
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>

          {/* <BotonPrincipal onPress={() => this.cancelar(navigate)}>
            Cancelar
          </BotonPrincipal> */}
        </View>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },

  titulo: {
    padding: 20,
    paddingBottom: 0
  },
  cuerpo: {
    // flex: 1,
  },
  bottom: {
    padding: 20
  },
  texto: {
    fontSize: 15,
    color: color.$tituloTextColor,
    fontWeight: "300",
    textAlign: "center"
  },
  textoTitulo: {
    fontSize: 20,
    color: color.$tituloTextColor,
    fontWeight: "500",
    textAlign: "center"
  },
  view1: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20
  },
  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  vire: {
    flex: 0.5
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
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 0
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center"
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11
  }
})

const mapStateToProps = state => ({
  error: state.codigos.codigoNoExiste,
  quiniela: state.codigos.quinielaID,
  aceptaAbonados: state.codigos.recibirAbonados
})

export default connect(
  mapStateToProps,
  {
    manejarActivos,
    buscarCodigos,
    agregarJugador,
    crearNombreQuiniela,
    manejarActivosA,
    buscarPartidos,
    crearNombreQuinielaLocal,
    borrarNombreQuiniela
  }
)(RegistrarQuiniela)
