import React, { Component } from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { Form } from '../components/Form';
import { TextIndication } from '../components/TextIndication';
import { gotohome } from '../actions';
import { HeaderText } from '../components/HeaderText';
import color from '../comun/colors';

class CrearCuenta extends Component {
  static navigationOptions = {
    headerTitle: <HeaderText texto="Crear Cuenta"/>,
  };

  constructor() {
    super();
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    console.log("(CrearCuenta) componentDidMount")
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    console.log("(CrearCuenta) componentWillUnmount")
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    this.props.navigation.goBack();
    return true;
  }

  confirmar(navigate) {
    this.props.gotohome(); // Limpiar el formulario
    this.props.navigation.goBack();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <Form type="Registrarse" />
          </KeyboardAvoidingView>

          <TextIndication description={this.props.error} />

          {/* <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={() => this.confirmar(navigate)}>
              <Text style={styles.signupButton}>Entrar</Text>
            </TouchableOpacity>
          </View> */}
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
});

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, { gotohome })(CrearCuenta);
