import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Logo } from '../components/Logo';
import { FormContrasena } from '../components/FormContrasena';
import { TextIndication } from '../components/TextIndication';

class ReiniciarContrasena extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.onPressReiniciarContrasena = this.onPressReiniciarContrasena.bind(this);
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

  onPressReiniciarContrasena() {
    this.setState({
      authenticating: true,
      indication: '',
    });

    const auth = firebase.auth();
    const emailAddress = this.state.email;
    const { password } = this.state;

    auth

      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.setState({
          authenticating: false,
        });

        this.setState({
          indication:
            'Revisa tu correo electrónico y sigue las intrucciones para reiniciar tu contraseña',
        });

        const { navigate } = this.props.navigation;
        navigate('ConfirmacionCorreo');
      })
      .catch((error) => {
        // Handle Errors here.

        const errorCode = error.code;

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
          case 'auth/email-already-in-use':
            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              email: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'El correo electrónico no es válido, ya se encuentra registrado',
            });
            break;

          case 'auth/weak-password':
            this.setState({
              placeholderc: 'Contraseña...',
              password: '',
              authenticating: false,
              placeholder: 'Ingresa tu correo electrónico...',
              indication: 'El password debe tener al menos 6 carcacteres',
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

  actualizarCredenciales(credenciales) {
    this.setState({
      email: credenciales.email,
      password: credenciales.password,
    });
    // this.onPressSingIn();
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1c313a" />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <FormContrasena
              type="Reiniciar contraseña"
              singUp={this.onPressReiniciarContrasena}
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
    width: 300,
    backgroundColor: '#1c313a',
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

export default ReiniciarContrasena;
