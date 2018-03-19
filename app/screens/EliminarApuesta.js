import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  ListView,
  View,
  TextInput,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  buscarJugadoresAdministradas,
  buscarJugadoresAdministradasT,
  buscarJugadoresAdministradasMaxT,
  buscarJugadoresAdministradasMax,
  BuscarJugadorTexto,
  reloadingJugadores,
  eliminarJugador,
} from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { QuinielaAdminItem } from '../components/QuinielaAdminItem';
import color from '../comun/colors';

class EliminarApuesta extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      users: _.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({
        ...val,
        uid,
      })),
      filteredUsers: _.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({
        ...val,
        uid,
      })),
      q: '',
      menu: 'yes',
    };
  }

  componentWillUnmount() {}

  keyboardWillShow = () => {
    this.setState({ menu: 'no' });
  };

  keyboardWillHide = () => {
    this.setState({ menu: 'yes' });
  };

  eliminar(goBack) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    const {
      jugador, quiniela, quinielan, jugadores,
    } = this.props.navigation.state.params;
    this.props.eliminarJugador(jugador, quiniela, quinielan, jugadores);
    goBack();
  }

  tusquinielas(goBack) {
    // console.log('TEST2');
    // this.props.reloadingJugadores();
    goBack();
  }

  pressed(e) {
    Keyboard.dismiss();
  }

  menustatus({ navigate, goBack }) {
    if (this.state.menu === 'yes') {
      return (
        <View>
          {/* <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal> */}
          <BotonPrincipal onPress={() => this.eliminar(goBack)}>Eliminar jugador...</BotonPrincipal>
          <BotonPrincipal onPress={() => this.tusquinielas(goBack)}>Cancelar</BotonPrincipal>
        </View>
      );
    }
    return <View />;
  }

  render() {
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
            <Titulo>{this.props.navigation.state.params.quinielan}</Titulo>
            <Text style={styles.subtitulo}>Eliminar jugador de la quiniela {'\n'} </Text>
            <Text style={styles.subtitulo1}>
              Introduce el codigo de activacion {'\n'}para eliminar este usuario {'\n'}
            </Text>
            <Text style={styles.subtitulo1}>
              Codigo de activacion: 1234 {'\n'}Jugador:{' '}
              {this.props.navigation.state.params.jugador.nombre}
            </Text>
          </View>

          <View style={styles.bottom}>{this.menustatus({ navigate, goBack })}</View>
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
  subtitulo: {
    fontSize: 15,
    fontWeight: '400',
    color: color.$tituloTextColor,
    textAlign: 'center',
  },
  subtitulo1: {
    padding: 10,
    fontSize: 15,
    fontWeight: '400',
    color: color.$tituloTextColor,
    textAlign: 'center',
  },
  titulo: {
    padding: 0,
    marginVertical: 0,
  },
  cuerpo: { flex: 1 },
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
  const tt = _.map(state.jugadoresadmin, (val, uid) => ({ ...val, uid }));

  const jugadores = _.orderBy(tt, ['nombre'], ['asc']);

  return {
    jugadores,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar,
  };
};

export default connect(mapStateToProps, { eliminarJugador })(EliminarApuesta);
