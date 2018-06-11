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
import { HeaderText } from '../components/HeaderText';
import color from '../comun/colors';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      botonesDeshabilitados: false
    }
  }

  static navigationOptions = {
    headerTitle: <HeaderText texto="Login"/>,
    headerLeft: (<TouchableOpacity/>),
  };

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    // console.log('(Login) Touch procesado, botonesDesabilitados: true');
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
      // console.log('(Login) Timeout -> botonesDesabilitados: false');
    }, 1999);
    funcion();
  }

  componentDidMount() {
    console.log("(Login) componentDidMount");
    BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
  }

  componentWillUnmount() {
    console.log("(Login) componentWillUnmount");
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
    navigate('CrearCuenta');
  }

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

          <TextIndication description={this.props.error} />

          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <Form type="Entrar" botonDeshabilitado={this.state.botonesDeshabilitados}/>
          </KeyboardAvoidingView>

          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.crear(navigate))}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>

          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.reiniciar(navigate))}
            >
              <Text style={styles.buttonText}>Recuperar Contraseña</Text>
            </TouchableOpacity>
            <View style={styles.vire} />
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
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: color.$formButtonTextColor,
    textAlign: 'center',
  },
  vire: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
