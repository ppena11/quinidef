import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import { emailChanged, passwordChanged, loginUser, createUser } from '../../actions';

import styles from './styles';

import { Spinner } from '../Spinner';

class Form extends Component<{}> {
  constructor() {
    super();
    this.registrar = this.registrar.bind(this);
  }

  registrare(email) {
    this.props.emailChanged(email);
  }

  registrarp(password) {
    this.props.passwordChanged(password);
  }

  registrar() {
    const { email, password } = this.props;
    // this.props.singUp();
    Keyboard.dismiss();

    if (this.props.type === 'Entrar') {
      this.props.loginUser({ email, password });
    } else {
      this.props.createUser({ email, password });
    }
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
            onSubmitEditing={() => this.password.focus()}
            ref={input => (this.email = input)}
            onChangeText={email => this.registrare(email)}
            value={this.props.email}
          />
          <View style={styles2.vire} />
        </View>
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={this.props.placeholderc}
            secureTextEntry
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            onSubmitEditing={() => this.registrar()}
            ref={input => (this.password = input)}
            onChangeText={password => this.registrarp(password)}
            value={this.props.password}
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
  placeholderc: state.auth.placeholderc,
  error: state.auth.error,
  authenticating: state.auth.authenticating,
});

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  createUser,
})(Form);

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
