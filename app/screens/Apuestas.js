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
  bloquearPartido
} from "../actions";
import { Container } from "../components/Container";
import { Titulo } from "../components/Titulo";
import { Pronostico } from "../components/Pronostico";
import { PuntajeJugador } from "../comun/puntaje";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Spinner } from "../components/Spinner";

import color from "../comun/colors";

class Apuestas extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      partidos: {},
      apuestas: {},
      validando: false,
      menu: "yes"
    };
    this.run = this.run.bind(this);
    this.run2 = this.run2.bind(this);
  }

  componentDidMount() {
    this.run();

    BackHandler.addEventListener("hardwareBackPress", () =>
      this.props.navigation.goBack()
    );

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.setState({ validando: false });
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  tusquinielas() {
    // console.log('TEST2');
    this.run();
    this.props.navigation.goBack();
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" });
  };

  keyboardWillHide = () => {
    this.setState({ menu: "yes" });
  };

  run = async () => {
    try {
      console.log(this.props.quiniela.quiniela);
      console.log(this.props.quiniela.nombreapuesta);

      const escribirHora = await this.props.escribirHora();
      const Hora = await this.props.buscarHora();

      const apuestas = await this.props.buscarApuestas(
        this.props.quiniela.quiniela,
        this.props.quiniela.nombreapuesta
      );
      const partidos = await this.props.buscarPartidos(
        this.props.quiniela.torneoid
      );
      const r1 = partidos.toJSON();
      const r2 = apuestas.toJSON();
      this.setState({ partidos: r1 });
      this.setState({ apuestas: r2 });
      // console.log(r1);
    } catch (e) {
      console.log(e);
    }
  };

  run2 = async () => {
    try {
      this.setState({ validando: true });
      // const test = await this.props.modifarReglasBD(
      const escribirHora = await this.props.escribirHora();
      const Hora = await this.props.buscarHora();

      var hor = Hora.toJSON();
      const kk = this.props.apuestast;
      const tt = _.map(kk, (val, uid) => ({ ...val, uid }));
      console.log(hor);
      var yy = _.remove(tt, function(n) {
        const k = moment.utc(n.inicioGMT0);
        const y = moment(hor.time);

        k.subtract(1800, "seconds");
        if (moment(y).isAfter(k)) {
          if (!n.bloqueado) {
            this.props.bloquearPartido(this.props.quiniela.torneoid);
          }
        }
        return !moment(y).isAfter(k);
      });

      console.log(yy);

      const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item;
          return obj;
        }, {});

      const ap = arrayToObject(yy, "uid");

      console.log(ap);

      //console.log(this.props.apuestast);
      const test = await this.props.modificarApuestasBD(
        this.props.quiniela.quiniela,
        this.props.quiniela.nombreapuesta,
        ap
      );
      console.log(this.props.quiniela.uid);
      console.log(this.props.quiniela.quiniela);
      //
      //   console.log(test);
      // this.run();
      this.setState({ validando: false });
      // this.props.navigation.goBack();
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false });

      // this.props.navigation.goBack();
    }
  };

  crear() {
    this.run2();
    // console.log('TEST');
    // navigate('EliminarApuesta');
  }
  fechaHoraDispositivo(fechaHoraGMT0) {
    const diahora = new Date(`${fechaHoraGMT0} UTC`);
    const mes =
      diahora.getMonth() + 1 < 10
        ? `0${diahora.getMonth() + 1}`
        : diahora.getMonth() + 1;
    const hora =
      diahora.getHours() < 10 ? `0${diahora.getHours()}` : diahora.getHours();
    const minutos =
      diahora.getMinutes() < 10
        ? `0${diahora.getMinutes()}`
        : diahora.getMinutes();
    return `${diahora.getDate()}/${mes}/${diahora.getFullYear()} ${hora}:${minutos}`;
  }

  grupofasetext(grupoFase) {
    let resultado = "";
    if (grupoFase.length == 1) resultado = `Grupo ${grupoFase}`;
    else resultado = grupoFase;
    return resultado;
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
    );
  }

  calcularPuntajeTotalJugador() {
    // data de prueba/ejemplo
    const apuestas = [
      [0, 1, 0], // 10 pts
      [1, 1, 1], //  8 pts
      [2, 2, 1], //  1 pto
      [3, 2, 0] //  6 pts
    ];
    const resultados = [[0, 1, 0], [1, 2, 2], [2, 0, 1], [3, 2, 1]];
    const reglas = [5, 5, 3, 1];

    return PuntajeJugador(apuestas, resultados, reglas);
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
      );
    }
    return <View />;
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return <Text style={styles.buttonText}>Guargar cambios..</Text>;
  }

  activa() {
    if (!this.props.quiniela.activo) {
      return (
        <Text style={styles.buttonText}>
          Contacta al administrador para activar tu quiniela
        </Text>
      );
    }
    return <View />;
  }

  render() {
    let partidos = [];
    let golA = "";
    let golB = "";
    partidos1 = this.state.partidos;
    apuestas1 = this.state.apuestas;
    const apuestasm = Object.assign(
      {},
      this.state.partidos,
      this.state.apuestas
    );
    partidos = Object.keys(partidos1).map(key => {
      if (apuestas1 != null) {
        if (typeof apuestas1[key] !== "undefined") {
          if (typeof apuestas1[key].golesA !== "undefined") {
            golA = apuestasm[key].golesA;
          } else {
            golA = "null";
          }
        } else {
          golA = "null";
        }

        if (typeof apuestas1[key] !== "undefined") {
          if (typeof apuestas1[key].golesB !== "undefined") {
            golB = apuestasm[key].golesB;
          } else {
            golB = "null";
          }
        } else {
          golB = "null";
        }
      } else {
        golA = "null";
        golB = "null";
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
      };
    });

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View>{this.activa()}</View>

          <Text style={styles.buttonText}>
            Puedes modificar tus apuestas hasta 30 min antes que empiece cada
            juego
          </Text>

          <View style={styles.cuerpo}>
            <FlatList
              data={partidos}
              renderItem={({ item }) => this.renderRow(item)}
              onEndReachedThershold={0}
              ref={ref => {
                this.listRef = ref;
              }}
            />
          </View>
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
          <View>{this.menustatus()}</View>
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
};

export default connect(mapStateToProps, {
  buscarApuestas,
  buscarPartidos,
  buscarHora,
  modificarApuestasBD,
  escribirHora,
  bloquearPartido
})(Apuestas);
