import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

import { Spinner } from '../Spinner';

export default class Form extends Component<{}> {
  constructor() {
    super();
    this.registrar = this.registrar.bind(this);
  }

  registrare(email) {
    const credenciales = {
      email: email,
      password: this.props.password,
    };
    this.props.actualizar(credenciales);
  }

  registrarp(password) {
    const credenciales = {
      email: this.props.email,
      password: password,
    };
    this.props.actualizar(credenciales);
  }

  registrar() {
    this.props.singUp();
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
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={this.props.placeholderc}
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          onSubmitEditing={() => this.registrar()}
          ref={input => (this.password = input)}
          onChangeText={password => this.registrarp(password)}
          value={this.props.password}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.registrar()}>
          {this.renderSpinner()}
        </TouchableOpacity>
      </View>
    );
  }
}
