import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
// import firebase from 'firebase';

import { Container } from '../components/Container';
import { Titulo } from '../components/Titulo';
import { BotonPrincipal } from '../components/BotonPrincipal';
import color from '../comun/colors';
import { Spinner } from '../components/Spinner';

import { buscarCodigos, agregarJugador } from '../actions';

class RegistrarQuiniela extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputfield: '',
      validando: false,
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  run = async (navigate) => {
    try {
      const {
        torneo,
        torneoid,
        quinielaNombre,
        quinielaID,
      } = this.props.navigation.state.params.quiniela;
      const test = await this.props.agregarJugador(
        quinielaID,
        this.state.inputfield.toUpperCase(),
        torneo,
        torneoid,
        quinielaNombre,
      );
      navigate('TusQuinielas');
      this.setState({ validando: false });
    } catch (e) {
      console.log(e);
      this.setState({ validando: false });
    }
  };

  pressed(navigate) {
    if (!this.state.validando) {
      this.setState({ validando: true });
      Keyboard.dismiss();
      if (this.state.inputfield.length > 0) {
        this.run(navigate);
      } else {
        alert('Por favor introduce un nombre valido');
        this.setState({ validando: false });
      }
    }
  }
  cancelar(navigate) {
    this.props.navigation.goBack();
  }

  updateInputValue(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');

    this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return <Text style={styles.buttonText}>Registrate..</Text>;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.titulo}>
          <Titulo>Selecciona un nombre de usuario para tu quiniela</Titulo>
        </View>
        <View style={styles.conta}>
          <View style={styles.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid={color.$underlineColorAndroid}
            placeholder="Nombre de usuario..."
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => this.pressed()}
            onChangeText={q => this.updateInputValue(q)}
          />
          <View style={styles.vire} />
        </View>

        <View style={styles.cuerpo}>
          <Text style={styles.texto}>
            Nombre de la quiniela: {this.props.navigation.state.params.quiniela.quinielaNombre}
            {'\n'}
            Torneo: {this.props.navigation.state.params.quiniela.torneo}
            {'\n'}
            Código de Activación: {this.props.navigation.state.params.quiniela.codigoq}
            {'\n'}
            Administrador: {this.props.navigation.state.params.admin.nombre}
            {'\n'}
            Email del Administrador: {this.props.navigation.state.params.admin.email}
          </Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity style={styles.button} onPress={() => this.pressed(navigate)}>
              {this.status()}
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>

          <BotonPrincipal onPress={() => this.cancelar(navigate)}>Cancelar</BotonPrincipal>
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

  titulo: {
    padding: 10,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
  texto: {
    fontSize: 15,
    color: color.$tituloTextColor,
    fontWeight: '300',
    textAlign: 'center',
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  vire: {
    flex: 0.5,
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
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: color.$formButtonTextColor,
    textAlign: 'center',
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11,
  },
});

const mapStateToProps = state => ({
  error: state.codigos.codigoNoExiste,
  quiniela: state.codigos.quinielaID,
  aceptaAbonados: state.codigos.recibirAbonados,
});

export default connect(mapStateToProps, { buscarCodigos, agregarJugador })(RegistrarQuiniela);
