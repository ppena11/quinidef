import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { FormContrasena } from '../components/FormContrasena';
import { TextIndication } from '../components/TextIndication';
import { gotohome } from '../actions';
import color from '../comun/colors';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  confirmar() {
    this.props.gotohome();
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.form}>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />

          <Logo />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <FormContrasena type="Salir del sistema" />
          </KeyboardAvoidingView>

          <TextIndication description={this.props.user.email} />
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
  button: {
    width: 300,
    backgroundColor: color.$fondoBotonInput,
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

const mapStateToProps = state => ({
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { gotohome })(Home);
