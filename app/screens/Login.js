import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';
import { RecuperarContrasena } from '../components/RecuperarContrasena';
import { Form } from '../components/Form';

class Login extends Component {
  constructor() {
    super();
    this.onPressSingIn = this.onPressSingIn.bind(this);
    this.actualizarCredenciales = this.actualizarCredenciales.bind(this);
    this.state = {
      email: '',
      authenticating: false,
      password: '',
      indication: '',
      placeholder: 'Ingresa tu correo electrónico...',
      placeholderc: 'Contraseña...',
    };
  }
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0',
      authDomain: 'react-native-firebase-20f8d.firebaseapp.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  actualizarCredenciales(credenciales) {
    this.setState({
      email: credenciales.email,
      password: credenciales.password,
    });
    // this.onPressSingIn();
  }

  onPressSingIn() {
    this.setState({
      authenticating: true,
      placeholder: 'Ingresa tu correo electrónico...',
    });

    const auth = firebase.auth();
    const emailAddress = this.state.email;
    const password = this.state.password;

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        this.setState({
          authenticating: false,
        });
        console.log('Logueado...'); // //logueado
      })
      .catch((error) => {
        // con An error happened.

        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/user-disabled':
            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              email: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'El correo electrónico ha sido deshabilitado',
            });
            break;
          case 'auth/invalid-email':
            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              email: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'El correo electrónico no tiene un formato válido',
            });
            break;
          case 'auth/user-not-found':
            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              email: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'El correo electrónico no se encuentra registrado',
            });
            break;
          case 'auth/wrong-password':
            // this.inputCorreo.placeholder = emailAddress;

            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              authenticating: false,
              placeholder: emailAddress,
              indication: 'La contraseña es incorrecta',
            });
            break;

          case 'auth/network-request-failed':
            // this.inputCorreo.placeholder = emailAddress;

            this.setState({
              placeholderc: password,
              authenticating: false,
              placeholder: emailAddress,
              indication: 'Problema de conexión a internet',
            });
            break;

          case 'auth/too-many-requests':
            // this.inputCorreo.placeholder = emailAddress;

            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              email: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'Muchos intentos fallidos, intenta luego',
            });
            break;
          default:
            this.setState({
              authenticating: false,
              indication: errorCode,
            });
          // etc
        }
      });
  }

  render() {
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1c313a" />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <Form
              type="Entrar"
              singUp={this.onPressSingIn}
              actualizar={this.actualizarCredenciales}
              placeholder={this.state.placeholder}
              email={this.state.email}
              password={this.state.password}
              placeholderc={this.state.placeholderc}
              authenticating={this.state.authenticating}
            />
          </KeyboardAvoidingView>

          <TextIndication description={this.state.indication} />

          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Recuperar contraseña</Text>
            <TouchableOpacity>
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

export default Login;
