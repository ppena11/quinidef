import React, { Component } from "react"
import {
  StatusBar,
  View,
  Keyboard,
  BackHandler,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { connect } from "react-redux"
import _ from "lodash"

import { buscarDetalleApuestas, limpiarapuesta } from "../actions"
import { Container } from "../components/Container"
import { Titulo } from "../components/Titulo"
import { DetalleAp } from "../components/DetalleAp"
import { PuntajeJugador } from "../comun/puntaje"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { Spinner } from "../components/Spinner"
import { HeaderText } from "../components/HeaderText"
import color from "../comun/colors"

class DetalleApuestas extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    let titulo = params
      ? `${params.posicion.nombreapuesta} - ${params.posicion.puntos} pts`
      : "Error Header DetallesApuesta"

    return {
      headerTitle: <HeaderText texto={titulo} />,
      headerStyle: {
        backgroundColor: color.$headerAnidadoBackgroundColor
      },
      headerTintColor: color.$headerAnidadoImageTintColor,
      headerRight: <TouchableOpacity />
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      partidos: {},
      apuestas: {},
      validando: false,
      menu: "yes"
    }
    this.run = this.run.bind(this)
    this.run2 = this.run2.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentDidMount() {
    this.run()

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    )

    console.log("(DetallesApuestas) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    this.setState({ validando: false })
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
    this.props.limpiarapuesta()

    console.log("(DetallesApuestas) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    console.log("(DetallesApuestas) handleBackButton")
    this.props.screenProps.rootNavigation.goBack()
    return true
  }

  // tusquinielas() {
  //   // console.log('TEST2');
  //   this.run();
  //   this.props.navigation.goBack();
  // }

  keyboardWillShow = () => {
    this.setState({ menu: "no" })
  }

  keyboardWillHide = () => {
    this.setState({ menu: "yes" })
  }

  run = async () => {
    try {
      //console.log(this.props.quiniela.quiniela);
      //console.log(this.props.navigation.state.params.posicion.nombreapuesta);

      this.props.buscarDetalleApuestas(
        this.props.quiniela.quiniela,
        this.props.navigation.state.params.posicion.nombreapuesta
      )

      // const r2 = apuestas.toJSON();

      //this.setState({ apuestas: r2 });
      // console.log(r2);
    } catch (e) {
      //console.log(e);
    }
  }

  run2 = async () => {
    try {
      this.setState({ validando: true })
      // const test = await this.props.modifarReglasBD(

      const test = await this.props.modificarApuestasBD(
        this.props.quiniela.quiniela,
        this.props.quiniela.uid,
        this.props.apuestast
      )
      //console.log(this.props.quiniela.uid);
      //console.log(this.props.quiniela.quiniela);
      //
      //   console.log(test);
      this.run()
      this.setState({ validando: false })
      this.props.navigation.goBack()
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false })

      this.props.navigation.goBack()
    }
  }

  crear() {
    this.run2()
    // console.log('TEST');
    // navigate('EliminarApuesta');
  }

  fechaHoraDispositivo(fechaHoraGMT0) {
    fechaHoraGMT0 = fechaHoraGMT0.replace(/-/g, "/")
    const diahora = new Date(`${fechaHoraGMT0} UTC`)
    const dia =
      diahora.getDate() < 10 ? `0${diahora.getDate()}` : diahora.getDate()
    const mes =
      diahora.getMonth() + 1 < 10
        ? `0${diahora.getMonth() + 1}`
        : diahora.getMonth() + 1
    const hora =
      diahora.getHours() < 10 ? `0${diahora.getHours()}` : diahora.getHours()
    const minutos =
      diahora.getMinutes() < 10
        ? `0${diahora.getMinutes()}`
        : diahora.getMinutes()
    return `${dia}/${mes}/${diahora.getFullYear()} ${hora}:${minutos}`
  }

  grupofasetext(grupoFase) {
    let resultado = ""
    if (grupoFase.length == 1) resultado = `Grupo ${grupoFase}`
    else resultado = grupoFase
    return resultado
  }

  renderRow(partidos) {
    return (
      <DetalleAp
        apuesta={partidos}
        fecha={this.fechaHoraDispositivo(partidos.inicioGMT0)}
        grupoFase={this.grupofasetext(partidos.grupofase)}
        partido={this.props.partidost[partidos.uid]}
      />
    )
  }

  calcularPuntajeTotalJugador() {
    // data de prueba/ejemplo
    const apuestas = [
      [0, 1, 0], // 10 pts
      [1, 1, 1], //  8 pts
      [2, 2, 1], //  1 pto
      [3, 2, 0] //  6 pts
    ]
    const resultados = [[0, 1, 0], [1, 2, 2], [2, 0, 1], [3, 2, 1]]
    const reglas = [5, 5, 3, 1]

    return PuntajeJugador(apuestas, resultados, reglas)
  }

  menustatus() {
    if (this.state.menu === "yes") {
      return (
        <View style={styles.bottom}>
          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.crear()}
            >
              {this.status()}
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>
        </View>
      )
    }
    return <View />
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />
    }
    return <Text style={styles.buttonText}>Guargar cambios..</Text>
  }

  activa() {
    if (!this.props.quiniela.activo) {
      return (
        <Text style={styles.buttonText}>
          Contacta al administrador para activar tu quiniela{" "}
        </Text>
      )
    }
    return <View />
  }

  spinner(partidos) {
    if (this.props.apuestast.cargando) {
      return <Spinner size="large" />
    } else {
      console.log(
        "RENDRININDINDI LISTAjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
      )
      console.log(this.props.detalleapuestas)
      return (
        <FlatList
          data={this.props.detalleapuestas}
          keyExtractor={item => item.uid}
          renderItem={({ item }) => this.renderRow(item)}
          initialNumToRender="70"
        />
      )
    }
  }

  render() {
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <Text style={styles.signupText}>
          Puedes ver los pronósticos de cada juego de este {"\n"}jugador cuando
          se bloquean las apuestas
        </Text>
        <View style={styles.form}>
          <View style={styles.cuerpo}>{this.spinner()}</View>
          {/*
        <View>
          <Pronostico equipoA="rus" equipoB="ksa"/>

          <Pronostico equipoA="egy" equipoB="uru"/>
          <Pronostico equipoA="mar" equipoB="irn"/>
          <Pronostico equipoA="por" equipoB="esp"/>

          <Pronostico equipoA="fra" equipoB="aus"/>
          <Pronostico equipoA="arg" equipoB="isl"/>
          <Pronostico equipoA="per" equipoB="din"/>
          <Pronostico equipoA="cro" equipoB="nga"/>
        </View>
 */}
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
    padding: 20
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
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11
  },

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
    fontWeight: "100",
    textAlign: "center"
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center"
  }
})

const mapStateToProps = state => {
  const partidost = state.partidos
  const apuestast = state.detalleapuesta
  let apuestas1 = Object.assign({}, state.detalleapuesta)
  delete apuestas1.cargando
  let detalleapuestas1 = _.map(apuestas1, (val, uid) => ({
    ...val,
    uid
  }))
  const detalleapuestas = _.orderBy(detalleapuestas1, ["inicioGMT0"], ["asc"])
  //detalleapuestas.shift();

  const quiniela = state.quini

  return {
    partidost,
    apuestast,
    quiniela,
    detalleapuestas
  }
}

export default connect(
  mapStateToProps,
  {
    buscarDetalleApuestas,
    limpiarapuesta
  }
)(DetalleApuestas)
