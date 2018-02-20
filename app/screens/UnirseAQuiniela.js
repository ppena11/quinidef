import React, { Component } from 'react';
import { StatusBar, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
//import firebase from 'firebase';

import { Container } from '../components/Container';
import { Titulo } from '../components/Titulo';
import { InputLetra } from '../components/InputLetra';
import { BotonPrincipal } from '../components/BotonPrincipal';
import color from '../comun/colors';

class UnirseAQuiniela extends Component {
  static navigationOptions = {
    header: null,
  };

  buscarCodigo () {
    alert("Aquí se debe buscar el código");
  }

  cancelar (navigate) {
    navigate('TusQuinielas');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />

        <View style={styles.titulo}>
          <Titulo>UNIRSE A QUINIELA</Titulo>
        </View>

        <View>
          <Text style={styles.texto}>
            Introduzca el{'\n'}Código de Activación:
          </Text>
        </View>

        <View style={styles.view1}>
          <InputLetra/>
          <InputLetra/>
          <InputLetra/>
          <InputLetra/>
        </View>

        <View>
          <BotonPrincipal onPress={() => this.buscarCodigo()}>
            Ok
          </BotonPrincipal>
        </View>

        <View>
          <BotonPrincipal onPress={() => this.cancelar(navigate)}>
            Cancelar
          </BotonPrincipal>
        </View>

      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  titulo: {
    padding: 20,
  },
  texto: {
    fontSize: 20,
    color: color.$tituloTextColor,
    fontWeight: '300',
    textAlign: 'center',
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
}
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, {})(UnirseAQuiniela);