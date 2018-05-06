import React, { Component } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { Card } from "../Card";
import banderas from "../../components/Logo/images/banderas";
import { pais3letras } from "../../comun/pais";
import styles from "./styles";
import color from "../../comun/colors";

import { modificarApuestas, buscarReglasAdmin } from "../../actions";
import { PuntajePartido } from "../../comun/puntaje";

class DetalleAp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regla: {}
    };
    this.run = this.run.bind(this);
    this.calcularPuntajeTotalJugador = this.calcularPuntajeTotalJugador.bind(
      this
    );
  }

  componentDidMount() {
    this.run();
  }

  run = async () => {
    try {
      const regla = await this.props.buscarReglasAdmin(
        this.props.quiniela.quiniela
      );
      const r1 = regla.toJSON();
      this.setState({ regla: r1 });
      // console.log(r1);
    } catch (e) {
      console.log(e);
    }
  };

  calcularPuntajeTotalJugador() {
    const re = this.props.partidos;
    const reglas = Object.keys(this.state.regla).map(key => ({
      key,
      value: this.state.regla[key]
    }));

    return PuntajePartido(
      this.props.partido,
      re[this.props.partido.uid],
      reglas
    );
  }

  apuestaA() {
    const re = this.props.partidos;

    const k = moment.utc(re[this.props.partido.uid].inicioGMT0);
    const y = moment(this.props.hora.hora);

    k.subtract(1800, "seconds");
    if (moment(y).isAfter(k)) {
      re[this.props.partido.uid].bloqueado = true;
    } else {
      re[this.props.partido.uid].bloqueado = false;
    }

    if (re[this.props.partido.uid].bloqueado) {
      return (
        <Text style={styles.text2}>
          {this.props.partido.golesA.toString() == "null"
            ? " - "
            : this.props.partido.golesA.toString()}
        </Text>
      );
    } else {
      return <Text style={styles.text2}> X </Text>;
    }
  }

  apuestaB() {
    const re = this.props.partidos;
    const k = moment.utc(re[this.props.partido.uid].inicioGMT0);
    const y = moment(this.props.hora.hora);

    k.subtract(1800, "seconds");
    if (moment(y).isAfter(k)) {
      re[this.props.partido.uid].bloqueado = true;
    } else {
      re[this.props.partido.uid].bloqueado = false;
    }

    if (re[this.props.partido.uid].bloqueado) {
      return (
        <Text style={styles.text2}>
          {this.props.partido.golesB.toString() == "null"
            ? " - "
            : this.props.partido.golesB.toString()}
        </Text>
      );
    } else {
      return <Text style={styles.text2}> X </Text>;
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.containerFecha}>
          <Text style={styles.fecha}>{`${this.props.grupoFase} - ${
            this.props.fecha
          }`}</Text>
        </View>
        <View style={styles.containerFecha}>
          <Text
            style={styles.fecha}
          >{`PUNTOS OBTENIDOS EN ESTE PARTIDO: ${this.calcularPuntajeTotalJugador()}`}</Text>
        </View>
        <View style={styles.containerNombreEquipos}>
          <Text style={styles.text}>{pais3letras(this.props.partido.idA)}</Text>
          <Text style={styles.text}>{pais3letras(this.props.partido.idB)}</Text>
        </View>
        <View style={styles.containerBanderasMarcadores}>
          <View style={styles.containerImageA}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.partido.idA}`]}
            />
          </View>
          <View style={styles.containerMarcador}>
            <Text style={styles.text}>{this.apuestaA()}</Text>
            <Text style={styles.text}> - </Text>
            <Text style={styles.text}>{this.apuestaB()}</Text>
          </View>
          <View style={styles.containerImageB}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.partido.idB}`]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  const quiniela = state.quini;
  const partidos = state.partidos;
  const hora = state.hora;
  const apuestast = state.apuestas;

  return { partidos, hora, quiniela };
};

export default connect(mapStateToProps, {
  modificarApuestas,
  buscarReglasAdmin
})(withNavigation(DetalleAp));
