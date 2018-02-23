import React, { Component } from 'react';
import { StatusBar, View, Text, BackHandler } from 'react-native';
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack())
  }
 
  buscarCodigo () {
    alert("Aquí se debe buscar el código. Generado Aleatorio: " + this.generaCodigo());
    console.error (this.props.navigation);
  }

  generaCodigo () {
    var caracteresePosibles = ['A','B','C','D','E','F','G','H','I','J',
                               'K','L','M','N','O','P','Q','R','S','T',
                               'U','V','W','X','Y','Z','0','1','2','3',
                               '4','5','6','7','8','9'];    // Combinaciones posibles: 1.679.616
    var codigo;
    codigo = this.elementoAleatorio(caracteresePosibles);
    codigo += this.elementoAleatorio(caracteresePosibles);
    codigo += this.elementoAleatorio(caracteresePosibles);
    codigo += this.elementoAleatorio(caracteresePosibles);
    return codigo;
  }

  elementoAleatorio (array) {
    var max = array.length;
    var valorAleatorio = Math.floor (Math.random() * max);
    return array[valorAleatorio];
  }

  cancelar (navigate) {
    //navigate('TusQuinielas');
    this.props.navigation.goBack();
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