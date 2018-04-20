import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Card } from '../Card';
import banderas from '../../components/Logo/images/banderas';
import { pais3letras } from '../../comun/pais';
import styles from './styles';
import color from '../../comun/colors';

import { modificarApuestas } from '../../actions';

class Pronostico extends Component {
  presseda(e) {
    const re = this.props.partidos;

    if (e == '') {
      re[this.props.partido.key].golesA = 'null';
      console.log(re[this.props.partido.key]);
      this.props.modificarApuestas(re);
    } else {
      const k = Number(e);
      if (!isNaN(k) && Number.isInteger(k)) {
        if (k >= 0) {
          //  console.log('GUARDALO');
          //  console.log(this.props.regla.key);
          re[this.props.partido.key].golesA = k;

          console.log(re[this.props.partido.key]);
          this.props.modificarApuestas(re);
          //   console.log(re);
        }
      }
    }

    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  pressedb(e) {
    const re = this.props.partidos;

    if (e == '') {
      re[this.props.partido.key].golesB = 'null';
      console.log(re[this.props.partido.key]);
      this.props.modificarApuestas(re);
    } else {
      const k = Number(e);
      if (!isNaN(k) && Number.isInteger(k)) {
        if (k >= 0) {
          //  console.log('GUARDALO');
          //  console.log(this.props.regla.key);
          re[this.props.partido.key].golesB = k;

          console.log(re[this.props.partido.key]);
          this.props.modificarApuestas(re);
          // this.props.modificarReglas(re);
          //   console.log(re);
        }
      }
    }
    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.containerFecha}>
          <Text style={styles.fecha}>{`${this.props.grupoFase} - ${this.props.fecha}`}</Text>
        </View>
        <View style={styles.containerNombreEquipos}>
          <Text style={styles.text}>{pais3letras(this.props.equipoA)}</Text>
          <Text style={styles.text}>{pais3letras(this.props.equipoB)}</Text>
        </View>
        <View style={styles.containerBanderasMarcadores}>
          <View style={styles.containerImageA}>
            <Image style={styles.image} source={banderas[`$${this.props.equipoA}`]} />
          </View>
          <View style={styles.containerMarcador}>
            <TextInput
              style={styles.marcador}
              selectionColor={color.$selectionColor}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              placeholder={
                this.props.golesA.toString() == 'null' ? ' - ' : this.props.golesA.toString()
              }
              textAlign="center"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={q => this.presseda(q)}
            />
            <Text style={styles.text}> - </Text>
            <TextInput
              style={styles.marcador}
              selectionColor={color.$selectionColor}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              placeholder={
                this.props.golesB.toString() == 'null' ? ' - ' : this.props.golesB.toString()
              }
              textAlign="center"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={q => this.pressedb(q)}
            />
          </View>
          <View style={styles.containerImageB}>
            <Image style={styles.image} source={banderas[`$${this.props.equipoB}`]} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  const partidos = state.partidos;
  return { partidos };
};

export default connect(mapStateToProps, { modificarApuestas })(withNavigation(Pronostico));
