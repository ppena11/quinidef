import React, { Component } from "react"
import { connect } from "react-redux"
import { Text, View, TextInput, TouchableOpacity, Keyboard } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import PropTypes from "prop-types"

import {
  emailChanged,
  passwordChanged,
  loginUser,
  createUser,
  nombreChanged,
  createUserFaileded
} from "../../actions"
import styles from "./styles"
import { Spinner } from "../Spinner"
import color from "../../comun/colors"

class Form extends Component {
  constructor(props) {
    super()
    this.registrar = this.registrar.bind(this)
    this.state = {
      botonDeshabilitado: props.botonDeshabilitado
    }
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonDeshabilitado: true});
    setTimeout(() => {
      this.setState({botonDeshabilitado: false});
    }, 1999);
    funcion();
  }

  registrarEmail(email) {
    this.props.emailChanged(email)
  }

  registrarNombre(nombre) {
    this.props.nombreChanged(nombre)
  }

  registrarPassword(password) {
    this.props.passwordChanged(password)
  }

  registrar() {
    Keyboard.dismiss()
    const { email, password, nombre } = this.props

    if (this.props.type === "Entrar") {
      //  console.log('AJAXSX');
      this.props.loginUser({ email, password })
    }

    if (this.props.type === "Registrarse") {
      if (nombre.length > 0 && nombre.length < 21) {
        this.props.createUser({ email, password, nombre })
      } else {
        this.props.createUserFaileded()
      }
    }
  }

  status() {
    // console.log('(Form: ', this.props.type, ') this.state.botonesDeshabilitados: ', this.state.botonesDeshabilitados);
    if (this.props.authenticating) {
      return <Spinner style={styles.buttonText} size="small" />
    }
    return <Text style={styles.buttonText}>{this.props.type}</Text>
  }
  nombre() {
    if (this.props.type === "Registrarse") {
      return (
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid={color.$underlineColorAndroid}
            placeholder={this.props.placeholdern}
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => this.email.focus()}
            onChangeText={nombre => this.registrarNombre(nombre)}
            value={this.props.nombre}
          />
          <View style={styles2.vire} />
        </View>
      )
    }
    return <View />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.nombre()}
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid={color.$underlineColorAndroid}
            placeholder={this.props.placeholder}
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => this.password.focus()}
            ref={input => (this.email = input)}
            onChangeText={email => this.registrarEmail(email)}
            value={this.props.email}
          />
          <View style={styles2.vire} />
        </View>
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid={color.$underlineColorAndroid}
            placeholder={this.props.placeholderc}
            secureTextEntry
            placeholderTextColor={color.$placeholderTextColor}
            selectionColor={color.$selectionColor}
            autoCapitalize="none"
            // onSubmitEditing={() => this.registrar()}
            ref={input => (this.password = input)}
            onChangeText={password => this.registrarPassword(password)}
            value={this.props.password}
          />
          <View style={styles2.vire} />
        </View>
        <View style={styles2.conta}>
          <View style={styles2.vire} />
          <TouchableOpacity
            style={styles.button}
            disabled={this.state.botonDeshabilitado}
            onPress={() => this.evitaMultiTouches(() => this.registrar())}
          >
            {this.status()}
          </TouchableOpacity>
          <View style={styles2.vire} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  nombre: state.auth.nombre,
  password: state.auth.password,
  placeholder: state.auth.placeholder,
  placeholderc: state.auth.placeholderc,
  placeholdern: state.auth.placeholdern,
  error: state.auth.error,
  authenticating: state.auth.authenticating
})

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
    createUser,
    nombreChanged,
    createUserFaileded
  }
)(Form)

const styles2 = EStyleSheet.create({
  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  vire: {
    flex: 1
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  }
})
