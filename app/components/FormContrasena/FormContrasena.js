import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import styles from './styles';

import { emailChanged, recuperarEmail, salirSistema } from '../../actions';
import { Spinner } from '../Spinner';
import color from '../../comun/colors';

class FormContrasena extends Component {
  constructor() {
    super();
    this.registrar = this.registrar.bind(this);
    this.state = {
      botonesDeshabilitados: false
    }
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 1999);
    funcion();
  }

  registrare(email) {
    this.props.emailChanged(email);
  }

  registrar() {
    const { email } = this.props;
    if (this.props.type === 'Salir del sistema') {
      this.props.salirSistema();
    } else {
      this.props.recuperarEmail(email);
    }

    Keyboard.dismiss();
  }

  renderSpinner() {
    if (this.props.authenticating) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return <Text style={styles.buttonText}>{this.props.type}</Text>;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid = {color.$underlineColorAndroid}
            placeholder={this.props.placeholder}
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            keyboardType="email-address"
            autoCapitalize="none"
            ref={input => (this.email = input)}
            onChangeText={email => this.registrare(email)}
            value={this.props.email}
          />
          <View style={styles2.vire} />
        </View>

        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TouchableOpacity
            style={styles.button}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.registrar())}
          >
            {this.renderSpinner()}
          </TouchableOpacity>
          <View style={styles2.vire} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  placeholder: state.auth.placeholder,
  authenticating: state.auth.authenticating,
});

export default connect(mapStateToProps, { emailChanged, recuperarEmail, salirSistema })(FormContrasena);

const styles2 = EStyleSheet.create({
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vire: {
    flex: 1,
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
