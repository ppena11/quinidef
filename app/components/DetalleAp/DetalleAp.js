import React, { Component } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Card } from "../Card";
import banderas from "../../components/Logo/images/banderas";
import { pais3letras } from "../../comun/pais";
import styles from "./styles";
import color from "../../comun/colors";

import { modificarApuestas } from "../../actions";

class DetalleAp extends Component {
  presseda(e) {
    const re = this.props.partidos;

    if (e == "") {
      re[this.props.partido.key].golesA = "null";
      // console.log(re[this.props.partido.key]);
      this.props.modificarApuestas(
        re[this.props.partido.key],
        this.props.partido.key
      );
    } else {
      const k = Number(e);
      if (!isNaN(k) && Number.isInteger(k)) {
        if (k >= 0) {
          //  console.log('GUARDALO');
          //  console.log(this.props.regla.key);
          re[this.props.partido.key].golesA = k;

          //  console.log(re[this.props.partido.key]);
          this.props.modificarApuestas(
            re[this.props.partido.key],
            this.props.partido.key
          );
          //   console.log(re);
        }
      }
    }

    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  pressedb(e) {
    const re = this.props.partidos;

    if (e == "") {
      re[this.props.partido.key].golesB = "null";
      // console.log(re[this.props.partido.key]);
      this.props.modificarApuestas(
        re[this.props.partido.key],
        this.props.partido.key
      );
    } else {
      const k = Number(e);
      if (!isNaN(k) && Number.isInteger(k)) {
        if (k >= 0) {
          //  console.log('GUARDALO');
          //  console.log(this.props.regla.key);
          re[this.props.partido.key].golesB = k;

          //    console.log(re[this.props.partido.key]);
          this.props.modificarApuestas(
            re[this.props.partido.key],
            this.props.partido.key
          );
          // this.props.modificarReglas(re);
          //   console.log(re);
        }
      }
    }
    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  render() {
    console.log(this.props.partido);
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.containerFecha}>
          <Text style={styles.fecha}>{`${this.props.grupoFase} - ${
            this.props.fecha
          }`}</Text>
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
            <Text style={styles.text}>
              {this.props.partido.golesA.toString() == "null"
                ? " - "
                : this.props.partido.golesA.toString()}
            </Text>
            <Text style={styles.text}> - </Text>
            <Text style={styles.text}>
              {this.props.partido.golesB.toString() == "null"
                ? " - "
                : this.props.partido.golesB.toString()}
            </Text>
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
  const partidos = state.partidos;

  return { partidos };
};

export default connect(mapStateToProps, { modificarApuestas })(
  withNavigation(DetalleAp)
);
