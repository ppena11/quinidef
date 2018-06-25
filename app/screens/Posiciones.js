import React, { Component } from "react"
import {
  StatusBar,
  ListView,
  View,
  FlatList,
  Text,
  BackHandler,
  Image
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import _ from "lodash"
import { connect } from "react-redux"
import firebase from "firebase"

import {
  buscarPosiciones,
  salir,
  irAdministradas,
  salirSistema,
  buscarHora,
  escribirHora,
  buscarReglasAdmin
} from "../actions"
import { Container } from "../components/Container"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { Titulo } from "../components/Titulo"
import { Pos } from "../components/Pos"
import color from "../comun/colors"
import { Spinner } from "../components/Spinner"

class Posiciones extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      validando: false,
      qu: {}
    }

    this.loading = this.loading.bind(this)
    this.run = this.run.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentDidMount() {
    this.run()
    console.log("(Posiciones) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    console.log("(Posiciones) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    this.props.screenProps.rootNavigation.goBack()
    return true
  }

  run = async () => {
    try {
      const regla = await this.props.buscarReglasAdmin(
        this.props.quiniela.quiniela
      )
      this.setState({ validando: true })
      const test = await this.props.buscarPosiciones(
        this.props.quiniela.quiniela
      )
      const tt1 = test.toJSON()
      //console.log(tt1);
      this.setState({ qu: tt1 })
      this.setState({ validando: false })
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false })
    }
  }

  _renderItem = ({ item }) => (
    <Pos posicion={item} jugador={this.props.quiniela.nombreapuesta} />
  )
  _keyExtractor = item => item.uid + item.nombreapuesta

  activa() {
    if (!this.props.quiniela.activo) {
      return (
        <Text style={styles.buttonText}>
          Contacta al administrador para que tu quiniela aparezca en la tabla de
          posiciones y los puntos de tu quiniela sean contabilizados
        </Text>
      )
    }
    return <View />
  }

  loading(tt) {
    if (this.state.validando) {
      return (
        <Container>
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        </Container>
      )
    }
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View>{this.activa()}</View>
        <View style={styles.headerContentStyle}>
          <View style={styles.headerContentStyle1}>
            <Text style={styles.headerTextStyle}>Posición</Text>
          </View>
          <View style={styles.headerContentStyle2}>
            <Text style={styles.headerTextStyle}>Jugador</Text>
          </View>
          <View style={styles.headerContentStyle3}>
            <Text style={styles.headerTextStyle}>Puntos</Text>
          </View>
        </View>
        <View style={styles.form}>
          <FlatList
            data={tt}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </Container>
    )
  }

  render() {
    // const { navigate } = this.props.navigation;
    // console.log('PORQUE ENTRA AQUI TUS QUINIELAS???');
    const tt = _.map(this.state.qu, (val, uid) => ({ ...val, uid }))
    // console.log(`ttttttttttttttttttttttttttttttttttttttttttttttttttttttt ${tt}`);
    // console.log(`VALIDANDO TUS QUINIELAS ${this.state.validando}`);
    return this.loading(this.props.clasificacion)
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
  },
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "center"
  },
  headerContentStyle1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headerContentStyle2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerContentStyle3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center"
  },
  headerTextStyle: {
    fontSize: 15,
    color: color.$qxaHeaderTextStyle,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold"
  }
})

const mapStateToProps = state => {
  const tt = _.map(state.posiciones, (val, uid) => ({
    ...val,
    uid
  }))

  const clasificacion1 = _.orderBy(tt, ["puntos"], ["desc"])

  const activos = clasificacion1.filter(posicion => posicion.activo == true)

  const clasificacion = activos.map((currElement, index) => {
    currElement.index = index + 1
    return currElement
  })

  const quiniela = state.quini
  // console.log(clasificacion);
  return { clasificacion, quiniela }
}

export default connect(
  mapStateToProps,
  {
    buscarPosiciones,
    salir,
    irAdministradas,
    salirSistema,
    buscarHora,
    escribirHora,
    buscarReglasAdmin
  }
)(Posiciones)
