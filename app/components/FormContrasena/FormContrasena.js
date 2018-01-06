import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

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

        <TouchableOpacity style={styles.button} onPress={() => this.registrar()}>
          {this.renderSpinner()}
        </TouchableOpacity>
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
