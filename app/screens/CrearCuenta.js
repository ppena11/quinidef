import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { Container } from '../components/Container';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
// import { Logo } from '../components/Logo';
import { TextIndication } from '../components/TextIndication';

class CrearCuenta extends Component {
  state = {
    usuario: '',
    password: '',
    email: '',
    authenticating: false,
    indication: '',
  };

  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBTNTx1cp-bZ3SquR9d6btC974MUnsPMb0',
      authDomain: 'react-native-firebase-20f8d.firebaseapp.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  onPressCrearCuenta() {
    this.setState({
      authenticating: true,
      indication: '',
    });
    console.log('hola mundo');
    const auth = firebase.auth();
    const emailAddress = this.state.email;
    const password = this.state.password;

    auth
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        this.setState({
          authenticating: false,
        });
        console.log('Request para crear usuario enviado'); // Request sent.
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.setState({
              authenticating: false,
              indication: 'El correo electrónico no es válido, ya se encuentra registrado',
            });
            break;
          case 'auth/invalid-email':
            this.setState({
              authenticating: false,
              indication: 'El correo electrónico no tiene un formato válido',
            });
            break;
          case 'auth/weak-password':
            this.setState({
              authenticating: false,
              indication: 'El password debe tener al menos 6 carcacteres',
            });
            break;
          default:
            this.setState({
              authenticating: false,
              indication: errorCode,
            });
          // etc
        }

        // ...
        console.log(errorMessage);
        console.log(errorCode);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" />
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.form}>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding">
          <Input
            placeholder="Usuario"
            label="Usuario"
            onChangeText={usuario => this.setState({ usuario })}
            autoCapitalize="none"
            underlineColorAndroid="#4f6d7a"
          />
          <Input
            placeholder="Ingresa tu correo electrónico..."
            label="Correo electrónico"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="#4f6d7a"
          />
          <Input
            onChangeText={password => this.setState({ password })}
            placeholder="Ingresa tu contraseña..."
            label="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            underlineColorAndroid="#4f6d7a"
          />
          <Button onPress={() => this.onPressCrearCuenta()}>Crear cuenta</Button>
          <TextIndication description={this.state.indication} />
        </KeyboardAvoidingView>
      </View>
    );
  }
  render() {
    return <Container>{this.renderCurrentState()}</Container>;
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
  },
});

export default CrearCuenta;
