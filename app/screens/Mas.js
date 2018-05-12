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
      menu: "yes"
    };
    this.run = this.run.bind(this);
    this.run2 = this.run2.bind(this);
    this.renderRow = this.renderRow.bind(this);
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
    fechaHoraGMT0 = fechaHoraGMT0.replace(/-/g, "/");
    const diahora = new Date(`${fechaHoraGMT0} UTC`);
    const dia =
      diahora.getDate() < 10 ? `0${diahora.getDate()}` : diahora.getDate();
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
    return `${dia}/${mes}/${diahora.getFullYear()} ${hora}:${minutos}`;
  }

  grupofasetext(grupoFase) {
    let resultado = "";
    if (grupoFase.length == 1) resultado = `Grupo ${grupoFase}`;
    else resultado = grupoFase;
    return resultado;
  }

  renderRow(partidos) {
    //console.log(this.props.navigation);
    return (
      <ListaMas
        nav={this.props.navigation}
        quiniela={this.props.quiniela}
        menu={partidos}
      />
    );
  }

  render() {
    let menu = [{ imagen: "basura", titulo: "Eliminar quiniela" }];

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
})(Mas);
