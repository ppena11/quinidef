import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { gotohome } from '../actions';
import { Logo } from '../components/Logo';
import { FormContrasena } from '../components/FormContrasena';
import { TextIndication } from '../components/TextIndication';
import color from '../comun/colors';

class ReiniciarContrasena extends Component<{}> {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.confirmar = this.confirmar.bind(this);
  }

  confirmar(navigate) {
    this.props.gotohome(); // Limpiar el formulario
    navigate('Login');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <FormContrasena type="Reiniciar contraseña" />
          </KeyboardAvoidingView>

          <TextIndication description={this.props.error} />

          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={() => this.confirmar(navigate)}>
              <Text style={styles.signupButton}>Entrar</Text>
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
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
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
  button: {
    width: 300,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  containerb: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { gotohome })(ReiniciarContrasena);
