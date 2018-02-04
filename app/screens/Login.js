import React, { Component } from 'react';
import { TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Container } from '../components/Container';

import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';
import { Form } from '../components/Form';
import { Spinner } from '../components/Spinner';

import { limpiarFormularioLogin, usuarioRegistrado, loginUser1, logeddUser1 } from '../actions';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.logeddUser1();
        console.log('Usuario auth');
        navigate('QuinielasAdministradas');
        // this.props.usuarioRegistrado();
      } else {
        // No user is signed in.
        // this.props.loginUser1();
        this.props.logeddUser1();
        console.log('Usuario desauth');
      }
    });
  }

  reiniciar(navigate) {
    this.props.limpiarFormularioLogin();
    navigate('ReiniciarContrasena');
  }

  crear(navigate) {
    // this.props.limpiarFormularioLogin();
    navigate('CrearCuenta');
  }

  renderSpinner(navigate) {
    if (this.props.init) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return (
      <View style={styles.form}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1c313a" />

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
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return <Container>{this.renderSpinner(navigate)}</Container>;
  }
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
    color: '$white',
    fontSize: 16,
    fontWeight: '500',
  },
  signupButton: {
    color: '$white',
    fontSize: 16,
    fontWeight: '500',
  },
});

const mapStateToProps = state => ({
  error: state.auth.error,
  init: state.auth.init,
});

export default connect(mapStateToProps, {
  limpiarFormularioLogin,
  usuarioRegistrado,
  loginUser1,
  logeddUser1,
})(Login);
