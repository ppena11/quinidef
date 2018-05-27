import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  BackHandler,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';
import { Form } from '../components/Form';
import { Spinner } from '../components/Spinner';
import { limpiarFormularioLogin, usuarioRegistrado, loginUser1, logeddUser1 } from '../actions';
import color from '../comun/colors';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.log("(Login) componentDidMount")
    BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
  }

  componentWillUnmount() {
    console.log("(Login) componentWillUnmount")
    BackHandler.removeEventListener('hardwareBackPress', () => BackHandler.exitApp());
  }

  // componentWillReceiveProps(nextProps) {
  // nextPropos are the next set of props that this componnet will receive
  // this.props is still the old set of props
  // const { navigate } = this.props.navigation;
  //  if (nextProps.user != '') {
  //    navigate('TusQuinielas'); // Ir al menu de las quinielas del usuario
  // }
  // }

  reiniciar(navigate) {
    this.props.limpiarFormularioLogin();
    navigate('ReiniciarContrasena');
  }

  crear(navigate) {
    // this.props.limpiarFormularioLogin();
    navigate('CrearCuenta');
  }

  //  renderSpinner(navigate) {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <View style={styles.form}>
          <StatusBar
            translucent={false}
            barStyle="light-content"
            backgroundColor={color.$statusBarBackgroundColor}
          />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <Form type="Entrar" />
          </KeyboardAvoidingView>

          <TextIndication description={this.props.error} />

          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={() => this.reiniciar(navigate)}>
              <Text style={styles.signupText}>Recuperar contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.crear(navigate)}>
              <Text style={styles.signupButton}> Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
  /*
  render() {
    const { navigate } = this.props.navigation;
    let render = 'no';

    if (!this.props.init) {
      // Inicalizada la aplicacion
      if (this.props.user == '') {
        // El usuario no esta registrado
        render = 'yes'; // Desplegar el login
      }
    }

    if (render != 'yes') {
      return (
        <Container>
          <Spinner style={styles.buttonText} size="large" />
        </Container>
      );
    }
    return <Container>{this.renderSpinner(navigate)}</Container>;
  }
*/
}

const styles = EStyleSheet.create({
  form: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: '500',
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: '500',
  },
});

const mapStateToProps = state => ({
  error: state.auth.error,
  init: state.auth.init,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  limpiarFormularioLogin,
  usuarioRegistrado,
  loginUser1,
  logeddUser1,
})(Login);
