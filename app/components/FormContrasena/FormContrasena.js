import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import styles from './styles';

import { emailChanged, recuperarEmail, salirSistema } from '../../actions';

import { Spinner } from '../Spinner';

class FormContrasena extends Component<{}> {
  constructor() {
    super();
    this.registrar = this.registrar.bind(this);
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
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={this.props.placeholder}
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
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
          <TouchableOpacity style={styles.button} onPress={() => this.registrar()}>
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
