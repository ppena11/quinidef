import React, { Component } from "react"
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  ListView,
  View,
  TextInput,
  FlatList,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Text
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import _ from "lodash"
import { connect } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  buscarJugadoresAdministradas,
  buscarJugadoresAdministradasT,
  buscarJugadoresAdministradasMaxT,
  buscarJugadoresAdministradasMax,
  BuscarJugadorTexto,
  reloadingJugadores,
  buscarReglasAdmin,
  modifarReglasBD,
  reinicarReglas,
  actualizarPuntos
} from "../actions"
import { Container } from "../components/Container"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { Titulo } from "../components/Titulo"
import { QuinielaReglaItem } from "../components/QuinielaReglaItem"
import { Spinner } from "../components/Spinner"
import { HeaderText } from "../components/HeaderText"
import color from "../comun/colors"

class ReglasAdmin extends Component {
  static navigationOptions = {
    headerTitle: <HeaderText texto="Modificar Reglas" />
  }
  constructor(props) {
    super(props)

    this.state = {
      menu: "yes",
      validando: false,
      botonesDeshabilitados: false,
      regla: {}
    }
    this.run = this.run.bind(this)
    this.run2 = this.run2.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 2999);
    funcion();
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

    console.log("(ReglasAdmin) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    this.setState({ validando: false })
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()

    console.log("(ReglasAdmin) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    this.props.navigation.goBack()
    return true
  }

  run = async () => {
    try {
      //   console.log(this.props.navigation.state.params.quiniela.uid);
      const regla = await this.props.buscarReglasAdmin(
        this.props.navigation.state.params.quiniela.uid
      )
      const r1 = regla.toJSON()
      this.setState({ regla: r1 })
      //   console.log(r1);
    } catch (e) {
      //    console.log(e);
    }
  }

  run2 = async () => {
    try {
      this.setState({ validando: true })
      const test = await this.props.modifarReglasBD(
        this.props.navigation.state.params.quiniela.uid,
        this.props.reglast
      )
      //   console.log(test);
      this.props.actualizarPuntos(
        this.props.navigation.state.params.quiniela.torneoid
      )
      this.run()
      this.setState({ validando: false })
      this.props.navigation.goBack()
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false })

      this.props.navigation.goBack()
    }
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" })
  }

  keyboardWillHide = () => {
    this.setState({ menu: "yes" })
  }

  createDataSource({ quinielas }) {
    // const ds = new ListView.DataSource({
    //  rowHasChanged: (r1, r2) => r1 !== r2,
    // });
    // this.dataSource = ds.cloneWithRows(quinielas);
  }

  crear() {
    this.run2()
    // console.log('TEST');
    // navigate('EliminarApuesta');
  }

  // cancelar() {
  //   // this.run();
  //   this.props.navigation.goBack();
  // }

  renderRow(regla) {
    return (
      <QuinielaReglaItem
        regla={regla}
        quiniela={this.props.navigation.state.params.quiniela.uid}
        quinielan={this.props.navigation.state.params.quiniela.quinielaNombre}
        codigo={this.props.navigation.state.params.quiniela.codigoq}
      />
    )
  }

  pressed(e) {
    Keyboard.dismiss()
  }

  menustatus() {
    if (this.state.menu === "yes") {
      return (
        <View style={styles.bottom}>
          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.crear())}
            >
              {this.status()}
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>
          {/* <BotonPrincipal onPress={() => this.cancelar()}>
            Cancelar
          </BotonPrincipal> */}
        </View>
      )
    }
    return <View />
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />
    }
    return <Text style={styles.buttonText}>Guardar Cambios</Text>
  }

  render() {
    const reglas = _.map(this.state.regla, (val, uid) => ({ ...val, uid }))

    //const reglas = Object.keys(this.state.regla).map(key => ({
    // key,
    // value: this.state.regla[key]
    //}));
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>
              {this.props.navigation.state.params.quiniela.quinielaNombre}
            </Titulo>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.cuerpo}>
              <FlatList
                data={reglas}
                renderItem={({ item }) => this.renderRow(item)}
                onEndReachedThershold={0}
                ref={ref => {
                  this.listRef = ref
                }}
              />
            </View>
          </KeyboardAwareScrollView>
          <View>{this.menustatus()}</View>
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
  cuerpo: {
    flex: 1
  },
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
    fontWeight: "500",
    paddingHorizontal: 20
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
  const reglast = state.creacionquinielas.reglas
  const reglas = _.map(state.creacionquinielas.reglas, (val, uid) => ({
    ...val,
    uid
  }))

  //const reglas = Object.keys(reglast).map(key => ({ key, value: reglast[key] }));

  return {
    reglast,
    reglas,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar
  }
}

export default connect(
  mapStateToProps,
  {
    buscarJugadoresAdministradas,
    buscarJugadoresAdministradasT,
    buscarJugadoresAdministradasMaxT,
    buscarJugadoresAdministradasMax,
    BuscarJugadorTexto,
    reloadingJugadores,
    buscarReglasAdmin,
    modifarReglasBD,
    reinicarReglas,
    actualizarPuntos
  }
)(ReglasAdmin)
