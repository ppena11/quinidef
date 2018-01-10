import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';

import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';

class ConfirmacionCorreo extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1c313a" />

          <Logo />

          <TextIndication description="Revisa tu correo electrónico y sigue las intrucciones para reiniciar tu contraseña" />
          <View style={styles.containerb}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Home')}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={() => navigate('Home')}>
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
    color: '$white',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  signupButton: {
    color: '$white',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    width: 300,
    backgroundColor: '$fondoBotonPrincipal',
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '$white',
    textAlign: 'center',
  },
  containerb: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfirmacionCorreo;
