import React, { Component } from 'react';
import {
  StatusBar,
  ListView,
  View,
  TextInput,
  Picker,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  nombreQuinielaCambio,
  buscarTorneos,
  crearQuiniela,
  nombreTorneoCambio,
  idTorneoCambio,
  reloadedQuinielasAdmin,
  reloadingQuinielas,
  crearCodigoQuiniela,
  buscarReglas,
} from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { TorneoItem } from '../components/TorneoItem';
import color from '../comun/colors';
import { generarCodigo } from '../comun/helper';
import { Spinner } from '../components/Spinner';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      validando: false,
    };
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    this.props.buscarTorneos();
    this.createDataSource(this.props);
    Object.keys(this.props.torneos).map((key) => {
      if (this.props.torneos[key].info.selected == true) {
        this.registrart(this.props.torneos[key].info.nombre);
        this.registrartID(this.props.torneos[key].uid);
        // console.log(`WILL MOUNT....  ${this.props.torneos[key].info.nombre}`);
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

        if (this.props.torneo == 'Rusia 2018') {
          this.registrart(nextProps.torneos[key].info.nombre);
          this.registrartID(nextProps.torneos[key].uid);
        }
      }
    });
  }

  createDataSource({ torneos }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(torneos);
  }

  run = async (goBack, codigo, quinielaNombre, torneo, torneoid) => {
    try {
      this.setState({ validando: true });
      const code = await this.props.crearCodigoQuiniela(codigo);
      const regla = await this.props.buscarReglas(torneoid);
      const newCodigo = generarCodigo();
      // const link4 = link3.codigo;
      // console.log(link4);
      const items = code.snapshot.toJSON();
      console.log(regla);
      const reglas = regla.toJSON();
      console.log(typeof items);
      //  codigoq = items[Object.keys(items)[Object.keys(items).length - 1]];

      if (typeof items !== 'object') {
        const codigoq = items;

        this.props.crearQuiniela({
          quinielaNombre,
          torneo,
          torneoid,
          codigoq,
          reglas,
        });
        this.props.reloadingQuinielas();
        this.setState({ validando: false });
        goBack();
      } else {
        console.log(newCodigo);
        this.run(newCodigo, quinielaNombre, torneo, torneoid);
      }
    } catch (e) {
      this.setState({ validando: false });
      console.log(e);
    }
  };

  crear(goBack) {
    Keyboard.dismiss();
    const codigo = generarCodigo();

    const { quinielaNombre, torneo, torneoid } = this.props;

    // const code = this.props.crearCodigoQuiniela(codigo);

    console.log(`quinielaNombre.length ${quinielaNombre.length}`);
    console.log(`quinielaNombre ${quinielaNombre}`);
    if (quinielaNombre != '') {
      this.run(goBack, codigo, quinielaNombre.toUpperCase(), torneo, torneoid);
    } else {
      goBack();
    }
  }

  cancelar(goBack) {
    Keyboard.dismiss();
    goBack();
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

  registrartID(idTorneo) {
    this.props.idTorneoCambio(idTorneo);

    // <ScrollView style={styles.cuerpo}>
    // <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
    // </ScrollView>
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return <Text style={styles.buttonText}>Crear....</Text>;
  }

  render() {
    // Object.keys(this.props.torneos).map(key => console.log(this.props.torneos[key].info.nombre)); // if you have a bunch of keys value pair

    const { navigate, goBack } = this.props.navigation;

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
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
                onValueChange={(itemValue, x, y) => {
                  this.registrart(itemValue);
                  this.registrartID(this.props.torneos[x].uid);
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
                underlineColorAndroid={color.$underlineColorAndroid}
                placeholder="Nombre de la quiniela..."
                placeholderTextColor={color.$placeholderTextColor}
                selectionColor={color.$selectionColor}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={nombreQuiniela => this.registrare(nombreQuiniela)}
                value={this.props.email}
              />
              <View style={styles2.vire} />
            </View>
          </View>
          <View style={styles.bottom}>
            <Text>{this.props.error}</Text>
            <View style={styles.conta}>
              <View style={styles.vire} />
              <TouchableOpacity style={styles.button} onPress={() => this.crear(goBack)}>
                {this.status()}
              </TouchableOpacity>
              <View style={styles.vire} />
            </View>
            <BotonPrincipal onPress={() => this.cancelar(goBack)}>Cancelar</BotonPrincipal>
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
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11,
  },
  vire: {
    flex: 0.5,
  },
  inputBox1: {
    flex: 8,

    color: color.$formInputBoxColor,
    marginVertical: 10,
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
  titulo: {
    padding: 20,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: color.$formButtonTextColor,
    textAlign: 'center',
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
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => {
  // console.log(state.torneos);
  const torneos = _.map(state.torneos, (val, uid) => ({ ...val, uid }));
  const tt = _.orderBy(torneos, ['info.nombre'], ['des']);

  return {
    torneos,
    quinielaNombre: state.creacionquinielas.nombreQuiniela,
    torneo: state.creacionquinielas.torneo,
    torneoid: state.creacionquinielas.torneoid,
    codigo: state.creacionquinielas.codigo,
    error: state.creacionquinielas.error,
    selected: state.selected,
  };
};

export default connect(mapStateToProps, {
  buscarTorneos,
  nombreQuinielaCambio,
  nombreTorneoCambio,
  idTorneoCambio,
  crearQuiniela,
  reloadedQuinielasAdmin,
  reloadingQuinielas,
  crearCodigoQuiniela,
  buscarReglas,
})(TusQuinielas);
