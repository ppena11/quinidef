import React, { Component } from 'react';
import { StatusBar, ListView, View, TextInput, Picker, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { connect } from 'react-redux';
import { nombreQuinielaCambio, buscarTorneos, crearQuiniela, nombreTorneoCambio } from '../actions';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';

import { TorneoItem } from '../components/TorneoItem';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.buscarTorneos();
    this.createDataSource(this.props);
    Object.keys(this.props.torneos).map((key) => {
      if (this.props.torneos[key].info.selected == true) {
        this.registrart(this.props.torneos[key].info.nombre);
        console.log(`WILL MOUNT....  ${this.props.torneos[key].info.nombre}`);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    this.createDataSource(nextProps);
    Object.keys(nextProps.torneos).map((key) => {
      if (nextProps.torneos[key].info.selected == true) {
        // this.registrart(nextProps.torneos[key].info.nombre);
        console.log(`THIS PRPOS TORNEO....  ${this.props.torneo}`);

        if (this.props.torneo == 'Rusia 2018') {
          this.registrart(nextProps.torneos[key].info.nombre);
        }
        console.log(`NEXT PROPS....  ${nextProps.torneos[key].info.nombre}`);
      }
    });
  }

  createDataSource({ torneos }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(torneos);
  }

  crear(navigate) {
    Keyboard.dismiss();

    const { quinielaNombre, torneo } = this.props;
    this.props.crearQuiniela({ quinielaNombre, torneo });
    navigate('QuinielasAdministradas');
  }

  cancelar(navigate) {
    navigate('QuinielasAdministradas');
  }

  renderRow(torneo) {
    return <TorneoItem torneo={torneo} />;
  }

  registrare(nombreQuiniela) {
    this.props.nombreQuinielaCambio(nombreQuiniela);
  }

  registrart(nombreTorneo) {
    this.setState({ selected: nombreTorneo });
    this.props.nombreTorneoCambio(nombreTorneo);

    // <ScrollView style={styles.cuerpo}>
    // <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
    // </ScrollView>
  }

  render() {
    // Object.keys(this.props.torneos).map(key => console.log(this.props.torneos[key].info.nombre)); // if you have a bunch of keys value pair

    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#00244f" />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>CREA TU QUINIELA</Titulo>
          </View>

          <View>
            <View style={styles2.conta}>
              <View style={styles2.vire} />
              <Picker
                style={styles.inputBox1}
                selectedValue={this.props.torneo}
                onValueChange={(itemValue) => {
                  console.log(itemValue);
                  this.registrart(itemValue);
                }}
              >
                {Object.keys(this.props.torneos).map(key => (
                  <Picker.Item
                    label={this.props.torneos[key].info.nombre}
                    value={this.props.torneos[key].info.nombre}
                    key={key}
                  />
                ))}
              </Picker>
              <View style={styles2.vire} />
            </View>

            <View style={styles2.conta}>
              <View style={styles2.vire} />

              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Nombre de la quiniela"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={nombreQuiniela => this.registrare(nombreQuiniela)}
                value={this.props.email}
              />
              <View style={styles2.vire} />
            </View>
          </View>
          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.crear()}>Crear</BotonPrincipal>
            <BotonPrincipal onPress={() => this.cancelar(navigate)}>Cancelar</BotonPrincipal>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  inputBox1: {
    flex: 8,

    color: '#FFF',
    marginVertical: 10,
  },
  inputBox: {
    flex: 8,
    backgroundColor: '$fondoBotonInput',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '$white',
    marginVertical: 10,
  },
  titulo: {
    padding: 20,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
});

const styles2 = EStyleSheet.create({
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vire: {
    flex: 1,
  },
  signupText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => {
  // console.log(state.torneos);
  const torneos = _.map(state.torneos, (val, uid) => ({ ...val, uid }));
  const tt = _.orderBy(torneos, ['info.nombre'], ['des']);
  console.log(tt);
  return {
    torneos,
    quinielaNombre: state.creacionquinielas.nombreQuiniela,
    torneo: state.creacionquinielas.torneo,
    selected: state.selected,
  };
};

export default connect(mapStateToProps, {
  buscarTorneos,
  nombreQuinielaCambio,
  nombreTorneoCambio,
  crearQuiniela,
})(TusQuinielas);
