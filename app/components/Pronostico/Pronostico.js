import React, { Component } from "react"
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { Card } from "../Card";
import { banderas } from "../../comun/imagenes";
import { pais3letras } from "../../comun/pais";
import styles from "./styles";
import color from "../../comun/colors";

import { modificarApuestas, bloquearPartido } from "../../actions"

class Pronostico extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valuea: "",
      placeholdera: "",
      valueb: "",
      placeholderb: "",
      prevGolesA: "",
      prevGolesB: ""
    }

    this.presseda = this.presseda.bind(this)
    this.pressedb = this.pressedb.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevUserId in state so we can compare when props change.
    // Clear out any previously-loaded user data (so we don't render stale stuff).
    if (
      nextProps.golesA !== prevState.prevGolesA ||
      nextProps.golesB !== prevState.prevGolesB
    ) {
      const a =
        nextProps.golesA.toString() == "null"
          ? " - "
          : nextProps.golesA.toString()
      const b =
        nextProps.golesB.toString() == "null"
          ? " - "
          : nextProps.golesB.toString()
      return {
        prevGolesA: a,
        prevGolesB: b
      }
    }
  }

  presseda(e) {
    const re = this.props.partidos
    let ra = Object.assign({}, this.props.apuestas)
    delete ra.cargando
    this.setState({ valuea: e })
    if (e == " ") {
      // console.log("1 espacio");
      this.setState({ valuea: "" })
    }
    if (e == "") {
      // console.log("0 espacio");
      this.setState({ valuea: "" })
      re[this.props.partido.key].golesA = this.state.prevGolesA
      if (ra != null) {
        if (typeof ra[this.props.partido.key] !== "undefined") {
          re[this.props.partido.key].golesB = ra[this.props.partido.key].golesB
        }
      }
    } else {
      if (e == " ") {
        // console.log(re[this.props.partido.key]);
      } else {
        e = e.replace(/\D/g, "")
        this.setState({ valuea: e })
        if (e != "") {
          const k = Number(e)
          if (!isNaN(k) && Number.isInteger(k)) {
            if (k >= 0) {
              //  console.log('GUARDALO');
              //  console.log(this.props.regla.key);
              re[this.props.partido.key].golesA = k
              if (ra != null) {
                if (typeof ra[this.props.partido.key] !== "undefined") {
                  re[this.props.partido.key].golesB =
                    ra[this.props.partido.key].golesB
                }
              }
              //  console.log(re[this.props.partido.key]);
              this.props.modificarApuestas(
                re[this.props.partido.key],
                this.props.partido.key
              )
              //   console.log(re);
            }
          } else {
            this.setState({ valuea: "" })
          }
        }
      }
    }

    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  pressedb(e) {
    const re = this.props.partidos
    let ra = Object.assign({}, this.props.apuestas)
    delete ra.cargando
    this.setState({ valueb: e })
    if (e == " ") {
      // console.log("1 espacio");
      this.setState({ valueb: "" })
    }
    if (e == "") {
      // console.log("0 espacio");
      this.setState({ valueb: "" })
      re[this.props.partido.key].golesB = this.state.prevGolesB
      if (ra != null) {
        if (typeof ra[this.props.partido.key] !== "undefined") {
          re[this.props.partido.key].golesA = ra[this.props.partido.key].golesA
        }
      }
    } else {
      if (e == " ") {
        // console.log(re[this.props.partido.key]);
      } else {
        e = e.replace(/\D/g, "")
        this.setState({ valueb: e })
        console.log(e)
        if (e != "") {
          const k = Number(e)
          console.log(k)
          if (!isNaN(k) && Number.isInteger(k)) {
            if (k >= 0) {
              //  console.log('GUARDALO');
              //  console.log(this.props.regla.key);
              re[this.props.partido.key].golesB = k
              if (ra != null) {
                if (typeof ra[this.props.partido.key] !== "undefined") {
                  re[this.props.partido.key].golesA =
                    ra[this.props.partido.key].golesA
                }
              }
              //  console.log(re[this.props.partido.key]);
              this.props.modificarApuestas(
                re[this.props.partido.key],
                this.props.partido.key
              )
              //   console.log(re);
            }
          } else {
            this.setState({ valueb: "" })
          }
        }
      }
    }

    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  apuestaA() {
    const re = this.props.partidos

    const k = moment.utc(re[this.props.partido.key].inicioGMT0)
    const y = moment(this.props.hora.hora)

    k.subtract(1800, "seconds")
    if (moment(y).isAfter(k)) {
      if (!re[this.props.partido.key].bloqueado) {
        this.props.bloquearPartido(this.props.quiniela.torneoid)
      }
    }

    if (!re[this.props.partido.key].bloqueado) {
      let valor =
        this.state.valuea == "" ? this.state.prevGolesA : this.state.valuea
      return (
        // Con Teclado Numérico
        <TextInput
          style={styles.marcador}
          selectionColor={color.$selectionColor}
          placeholderTextColor={color.$placeholderTextColor}
          underlineColorAndroid={color.$underlineColorAndroid}
          placeholder={this.state.prevGolesA}
          textAlign="center"
          maxLength={1}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={q => this.presseda(q)}
          autoCapitalize="none"
          value={this.state.valuea}
        />

        // Con Picker
        // <View style={styles.viewPicker}>
        //   <Picker
        //     style={styles.picker}
        //     selectedValue={valor}
        //     mode={'dropdown'}
        //     onValueChange={itemValue => this.presseda(itemValue)}
        //   >
        //     <Picker.Item label='-' value="null" />
        //     <Picker.Item label='0' value='0' />
        //     <Picker.Item label='1' value='1' />
        //     <Picker.Item label='2' value='2' />
        //     <Picker.Item label='3' value='3' />
        //     <Picker.Item label='4' value='4' />
        //     <Picker.Item label='5' value='5' />
        //     <Picker.Item label='6' value='6' />
        //     <Picker.Item label='7' value='7' />
        //     <Picker.Item label='8' value='8' />
        //     <Picker.Item label='9' value='9' />
        //   </Picker>
        // </View>
      )
    } else {
      return (
        <Text style={styles.text2}>
          {this.props.golesA.toString() == "null"
            ? " - "
            : this.props.golesA.toString()}
        </Text>
      )
    }
  }

  apuestaB() {
    const re = this.props.partidos

    const k = moment.utc(re[this.props.partido.key].inicioGMT0)
    const y = moment(this.props.hora.hora)

    if (!re[this.props.partido.key].bloqueado) {
      let valor =
        this.state.valueb == "" ? this.state.prevGolesB : this.state.valueb
      return (
        // Con Teclado Numérico
        <TextInput
          style={styles.marcador}
          selectionColor={color.$selectionColor}
          placeholderTextColor={color.$placeholderTextColor}
          underlineColorAndroid={color.$underlineColorAndroid}
          placeholder={this.state.prevGolesB}
          textAlign="center"
          maxLength={1}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={q => this.pressedb(q)}
          value={this.state.valueb}
        />

        // Con Picker
        // <View style={styles.viewPicker}>
        //   <Picker
        //     style={styles.picker}
        //     selectedValue={valor}
        //     mode={'dropdown'}
        //     onValueChange={itemValue => this.pressedb(itemValue)}
        //   >
        //     <Picker.Item label='-' value="null" />
        //     <Picker.Item label='0' value='0' />
        //     <Picker.Item label='1' value='1' />
        //     <Picker.Item label='2' value='2' />
        //     <Picker.Item label='3' value='3' />
        //     <Picker.Item label='4' value='4' />
        //     <Picker.Item label='5' value='5' />
        //     <Picker.Item label='6' value='6' />
        //     <Picker.Item label='7' value='7' />
        //     <Picker.Item label='8' value='8' />
        //     <Picker.Item label='9' value='9' />
        //   </Picker>
        // </View>
      )
    } else {
      return (
        <Text style={styles.text2}>
          {this.props.golesB.toString() == "null"
            ? " - "
            : this.props.golesB.toString()}
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerFecha}>
          <Text style={styles.fecha}>{`${this.props.grupoFase} - ${
            this.props.fecha
          }`}</Text>
        </View>
        <View style={styles.containerNombreEquipos}>
          <Text style={styles.text}>{pais3letras(this.props.equipoA)}</Text>
          <Text style={styles.text}>{pais3letras(this.props.equipoB)}</Text>
        </View>
        <View style={styles.containerBanderasMarcadores}>
          <View style={styles.containerImageA}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.equipoA}`]}
            />
          </View>
          <View style={styles.containerMarcador}>
            {this.apuestaA()}
            <Text style={styles.text}> _ </Text>
            {this.apuestaB()}
          </View>
          <View style={styles.containerImageB}>
            <Image
              style={styles.image}
              source={banderas[`$${this.props.equipoB}`]}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const partidos = state.partidos
  const apuestas = state.apuestas
  const hora = state.hora
  const time = state.time
  const quiniela = state.quini

  return { partidos, apuestas, hora, time, quiniela }
}

export default connect(mapStateToProps, { modificarApuestas, bloquearPartido })(
  withNavigation(Pronostico)
)
