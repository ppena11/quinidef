import React, { Component } from "react"
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { withNavigation } from "react-navigation"
import moment from "moment"
import _ from "lodash"
import { Card } from "../Card"
import { banderas } from "../../comun/imagenes"
import { pais3letras } from "../../comun/pais"
import styles from "./styles"
import color from "../../comun/colors"

//import { modificarApuestas, buscarReglasAdmin } from "../../actions"
import { PuntajePartido } from "../../comun/puntaje"

class DetalleAp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      regla: {}
    }
    this.run = this.run.bind(this)
    this.calcularPuntajeTotalJugador = this.calcularPuntajeTotalJugador.bind(
      this
    )
  }

  componentDidMount() {
    this.run()
  }

  run = async () => {
    try {
      const r1 = this.props.reglas
      this.setState({ regla: r1 })
      // console.log(r1);
    } catch (e) {
      // console.log(e);
    }
  }

  calcularPuntajeTotalJugador() {
    //  const re = this.props.partidos
    //    const reglas = Object.keys(this.state.regla).map(key => ({
    //      key,
    //      value: this.state.regla[key]
    //    }));
    //const reglas = _.map(this.state.regla, (val, uid) => ({ ...val, uid }));

    reglas = this.props.reglas

    return PuntajePartido(this.props.apuesta, this.props.partido, reglas)
  }

  apuestaA() {
    if (this.props.partido.bloqueado) {
      return (
        <Text style={styles.text2}>
          {this.props.apuesta.golesA.toString() == "null"
            ? " - "
            : this.props.apuesta.golesA.toString()}
        </Text>
      )
    } else {
      return <Text style={styles.text2}> X </Text>
    }
  }

  apuestaB() {
    if (this.props.partido.bloqueado) {
      return (
        <Text style={styles.text2}>
          {this.props.apuesta.golesB.toString() == "null"
            ? " - "
            : this.props.apuesta.golesB.toString()}
        </Text>
      )
    } else {
      return <Text style={styles.text2}> X </Text>
    }
  }

  block1() {
    if (this.props.partido.bloqueado) {
      return (
        <Text style={styles.fecha2}>
          {`PUNTOS OBTENIDOS EN ESTE PARTIDO: ${
            this.props.partido.golesA.toString() == "null"
              ? " - "
              : this.calcularPuntajeTotalJugador()
          }`}
        </Text>
      )
    } else {
      return <View />
    }
  }

  block2() {
    if (this.props.partido.bloqueado) {
      return <Text style={styles.fecha1}>Resultado</Text>
    } else {
      return <View />
    }
  }

  block3() {
    if (this.props.partido.bloqueado) {
      return (
        <Text style={styles.text}>
          {this.props.partido.golesA.toString() == "null"
            ? " - "
            : this.props.partido.golesA.toString()}{" "}
          -{" "}
          {this.props.partido.golesB.toString() == "null"
            ? " - "
            : this.props.partido.golesB.toString()}
        </Text>
      )
    } else {
      return <View />
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.containerFecha}>
          <Text style={styles.fecha2}>{`${this.props.grupoFase} - ${
            this.props.fecha
          }`}</Text>
        </View>

        <View style={styles.containerNombreEquipos}>
          <Text style={styles.textx}>
            {pais3letras(this.props.partido.idA)}
          </Text>
          <Text style={styles.fechax}>Pronóstico</Text>
          <Text style={styles.textx}>
            {pais3letras(this.props.partido.idB)}
          </Text>
        </View>
        <View style={styles.containerBanderasMarcadores}>
          <View style={styles.containerImageA}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.partido.idA}`]}
            />
          </View>
          <View style={styles.containerMarcador}>
            <View style={styles.containerMarcadorY}>
              <View style={styles.containerMarcador}>
                <Text style={styles.text}>{this.apuestaA()}</Text>
                <Text style={styles.text}> - </Text>
                <Text style={styles.text}>{this.apuestaB()}</Text>
              </View>
              <View style={styles.containerMarcador}>{this.block2()}</View>
              <View style={styles.containerMarcador}>{this.block3()}</View>
            </View>
          </View>
          <View style={styles.containerImageB}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.partido.idB}`]}
            />
          </View>
        </View>
        <View style={styles.containerFecha}>{this.block1()}</View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  const reglas = state.creacionquinielas.reglas

  return { reglas }
}

export default connect(
  mapStateToProps,
  {}
)(withNavigation(DetalleAp))
