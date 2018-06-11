import React, { Component } from "react";
import firebase from "firebase";
import _ from "lodash";
import moment from "moment";
import {
  KeyboardAvoidingView,
  StatusBar,
  View,
  Image,
  Keyboard,
  BackHandler,
  Text,
  FlatList,
  TouchableOpacity,
  // NetInfo
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";

import {
  buscarPartidos,
  modificarApuestasBD,
  buscarApuestas,
  buscarHora,
  escribirHora,
  bloquearPartido,
  ReinicarCargaApuesta,
  buscarAdministrador
} from "../actions";
import { Container } from "../components/Container";
import { Titulo } from "../components/Titulo";
import { Pronostico } from "../components/Pronostico";
import { PuntajeJugador } from "../comun/puntaje";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Spinner } from "../components/Spinner";
import { iconos } from "../comun/imagenes";

import color from "../comun/colors";

class Apuestas extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = {
      partidos: {},
      apuestas: {},
      validando: false,
      cargando: true,
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

    console.log("(Apuestas) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    this.setState({ validando: false })
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()

    this.props.ReinicarCargaApuesta()

    console.log("(Apuestas) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
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
      //console.log(this.props.quiniela.nombreapuesta);

      const escribirHora = await this.props.escribirHora()
      const Hora = await this.props.buscarHora()
      this.props.buscarPartidos(this.props.quiniela.torneoid)
      this.props.buscarApuestas(
        this.props.quiniela.quiniela,
        this.props.quiniela.nombreapuesta
      )
      this.props.buscarAdministrador(this.props.quiniela.quiniela)

      // const r1 = partidos.toJSON();
      // const r2 = apuestas.toJSON();
      // this.setState({ partidos: r1 });
      // this.setState({ apuestas: r2 });
      // console.log(r1);
    } catch (e) {
      //   console.log(e);
    }
    this.setState({ cargando: false })
  }

  run2 = async () => {
    try {
      this.setState({ validando: true })
      // const test = await this.props.modifarReglasBD(
      const escribirHora = await this.props.escribirHora()
      const Hora = await this.props.buscarHora()

      var hor = Hora.toJSON()
      let kk = Object.assign({}, this.props.apuestast)
      delete kk.cargando
      const tt = _.map(kk, (val, uid) => ({ ...val, uid }))
      //console.log(hor);
      var yy = _.remove(tt, function(n) {
        const k = moment.utc(n.inicioGMT0)
        const y = moment(hor.time)

        k.subtract(1800, "seconds")
        // if (moment(y).isAfter(k)) {
        //   if (!n.bloqueado) {
        //     this.props.bloquearPartido(this.props.quiniela.torneoid)
        //   }
        // }
        return !moment(y).isAfter(k)
      })

      //console.log(yy);

      const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})

      const ap = arrayToObject(yy, "uid")

      console.log(ap)

      //console.log(this.props.apuestast);
      const test = await this.props.modificarApuestasBD(
        this.props.quiniela.quiniela,
        this.props.quiniela.nombreapuesta,
        ap
      )
      //console.log(this.props.quiniela.uid);
      //console.log(this.props.quiniela.quiniela);
      //
      //   console.log(test);
      // this.run();
      this.setState({ validando: false })
      // this.props.navigation.goBack();
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false })

      // this.props.navigation.goBack();
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
      <Pronostico
        partido={partidos}
        equipoA={partidos.value.idA}
        golesA={partidos.value.golesA}
        golesB={partidos.value.golesB}
        equipoB={partidos.value.idB}
        fecha={this.fechaHoraDispositivo(partidos.value.inicioGMT0)}
        grupoFase={this.grupofasetext(partidos.value.grupofase)}
      />
    )
  }

  // menustatus() {
  //   if (this.state.menu === "yes") {
  //     return (
  //       <View style={styles.bottom}>
  //         <View style={styles.conta}>
  //           <View style={styles.vire} />
  //           <TouchableOpacity
  //             style={styles.button}
  //             onPress={() => this.crear()}
  //           >
  //             {this.status()}
  //           </TouchableOpacity>
  //           <View style={styles.vire} />
  //         </View>
  //       </View>
  //     )
  //   }
  //   return <View />
  // }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />
    }
    return (
      <Image
        style={styles.thumbnailStyle}
        source={iconos['$save']}
      />
    )
    // return <Text style={styles.buttonText}>Guardar Cambios</Text>;
  }

  activa() {
    if (!this.props.quiniela.activo) {
      return (
        <Text style={styles.buttonText}>
          Contacta al administrador para activar tu quiniela
        </Text>
      )
    }
    return <View />
  }

  spinner(partidos) {
    if (this.props.apuestast.cargando) {
      return (
        <Container>
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        </Container>
      )
    } else {
      return (
        <FlatList
          data={partidos}
          renderItem={({ item }) => this.renderRow(item)}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          onEndReachedThershold={0}
          ref={ref => {
            this.listRef = ref
          }}
        />
      )
    }
  }

  render() {
    let partidos2 = []
    let partidos = []
    let golA = ""
    let golB = ""
    let partidos1 = this.props.partidost

    let apuestas1 = Object.assign({}, this.props.apuestast)
    delete apuestas1.cargando
    console.log(this.props.apuestast)

    const apuestasm = Object.assign({}, this.props.partidost, apuestas1)
    partidos2 = Object.keys(partidos1).map(key => {
      if (apuestas1 != null) {
        if (typeof apuestas1[key] !== "undefined") {
          if (typeof apuestas1[key].golesA !== "undefined") {
            golA = apuestasm[key].golesA
          } else {
            golA = "null"
          }
        } else {
          golA = "null"
        }

        if (typeof apuestas1[key] !== "undefined") {
          if (typeof apuestas1[key].golesB !== "undefined") {
            golB = apuestasm[key].golesB
          } else {
            golB = "null"
          }
        } else {
          golB = "null"
        }
      } else {
        golA = "null"
        golB = "null"
      }

      // golA = this.state.apuestas[key].golesA;
      //   golB = this.state.apuestas[key].golesB;

      return {
        key,
        value: {
          golesA: golA,
          golesB: golB,
          grupofase: partidos1[key].grupofase,
          idA: partidos1[key].idA,
          idB: partidos1[key].idB,
          inicioGMT0: partidos1[key].inicioGMT0
        }
      }
    })

    partidos = partidos2.sort(function compare(a, b) {
      var dateA = moment(a.value.inicioGMT0)
      var dateB = moment(b.value.inicioGMT0)

      // console.log(a);
      //console.log(dateA.format());
      return dateA - dateB
    })

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View>{this.activa()}</View>
          <View style={styles.linecont}>
            <View style={styles.textcont}>
              <Text style={styles.buttonText}>
                Puedes modificar tus apuestas hasta 30 min antes que empiece cada juego
              </Text>
            </View>

            <TouchableOpacity
              style={styles.imgcont}
              onPress={() => this.crear()}
            >
              {this.status()}
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.cuerpo}>{this.spinner(partidos)}</View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  form: {
    flexDirection: "column",
  },
  linecont: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.$primaryBackground,
    flexDirection: "column",
  },
  titulo: {
    padding: 20,
  },
  imgcont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textcont: {
    flex: 5,
  },
  cuerpo: {
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
  },
  thumbnailStyle: {
    height: 45,
    width: 45,
    tintColor: color.$disquete,
  },

  viewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => {
  const partidost = state.partidos;
  const apuestast = state.apuestas;
  const quiniela = state.quini;
  const hora = state.hora;

  return {
    partidost,
    apuestast,
    quiniela,
    hora
  };
}

export default connect(mapStateToProps, {
  buscarApuestas,
  buscarPartidos,
  buscarHora,
  modificarApuestasBD,
  escribirHora,
  bloquearPartido,
  ReinicarCargaApuesta,
  buscarAdministrador
})(Apuestas);
