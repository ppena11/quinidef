import React, { Component } from 'react';
import { TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  test() {
    console.log('TEST');
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <BotonPrincipal onPress={() => this.test()}>Unirse a Quiniela existente...</BotonPrincipal>
        <BotonPrincipal onPress={() => this.test()}>Crea tu Quiniela...</BotonPrincipal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, {})(TusQuinielas);
