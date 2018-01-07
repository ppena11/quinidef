import React, { Component } from 'react';
import { TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { Container } from '../components/Container';

import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';
import { Form } from '../components/Form';

import { limpiarFormularioLogin } from '../actions';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  reiniciar(navigate) {
    this.props.limpiarFormularioLogin();
    navigate('ReiniciarContrasena');
  }

  crear(navigate) {
    // this.props.limpiarFormularioLogin();
    navigate('CrearCuenta');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
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
      </Container>
    );
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

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { limpiarFormularioLogin })(Login);
