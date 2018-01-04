import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { FormContrasena } from '../components/FormContrasena';
import { TextIndication } from '../components/TextIndication';
import { manejarError } from '../comun/helper';

class ConfirmacionCorreo extends Component {
  aceptar() {
    console.log('EPALE');
  }

  render() {
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1c313a" />

          <Logo />

          <TextIndication description="Revisa tu correo electrónico y sigue las intrucciones para reiniciar tu contraseña" />
          <View style={styles.containerb}>
            <TouchableOpacity style={styles.button} onPress={() => this.aceptar()}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupTextCont}>
            <TouchableOpacity>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  containerb: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfirmacionCorreo;
