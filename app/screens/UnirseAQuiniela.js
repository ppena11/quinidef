import React, { Component } from 'react';
import { StatusBar, View, Text, BackHandler } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
// import firebase from 'firebase';

import { Container } from '../components/Container';
import { Titulo } from '../components/Titulo';
import { InputLetra } from '../components/InputLetra';
import { BotonPrincipal } from '../components/BotonPrincipal';
import color from '../comun/colors';

import { buscarCodigos, agregarJugador } from '../actions';

class UnirseAQuiniela extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      inputfield: [],
    };

    this.updateInputValue1 = this.updateInputValue1.bind(this);
    this.updateInputValue2 = this.updateInputValue2.bind(this);
    this.updateInputValue3 = this.updateInputValue3.bind(this);
    this.updateInputValue4 = this.updateInputValue4.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  buscarCodigo() {
    const link1 = this.props.buscarCodigos;
    const link3 = this.props.agregarJugador;
    const link2 = this.state.inputfield;
    async function run() {
      const test = await link1(link2.join(''));
      const items = test.toJSON();

      if (items != null && items.recibirAbonados) {
        alert('A registrar el usuario');

        const test2 = await link3(items.quinielaID);

        console.log(test2);
      } else {
        alert('Por favor introduce un código válido de 4 caracteres');
      }
    }
    if (this.state.inputfield.join('').length >= 4) {
      run();
    } else {
      alert('Por favor introduce un código válido de 4 caracteres');
    }
  }

  generaCodigo() {
    const caracteresPosibles = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ]; // Combinaciones posibles: 1.679.616
    let codigo;
    codigo = this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    return codigo;
  }

  elementoAleatorio(array) {
    const max = array.length;
    const valorAleatorio = Math.floor(Math.random() * max);
    return array[valorAleatorio];
  }

  cancelar(navigate) {
    this.props.navigation.goBack();
  }

  updateInputValue1(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    let arr = [];
    arr = this.state.inputfield;
    arr[0] = t;
    console.log(`arr0000 : ${arr}`);
    this.setState({ inputfield: arr });
    // this.setState({ warning: 'no' });
    console.log(`ttttttttttttttttttttttttttt : ${t}`);
    console.log(`ttttttttttttttttttttttttttt : ${this}`);
  }

  updateInputValue2(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[1] = t;
    console.log(`arr1111 : ${arr}`);

    this.setState({ inputfield: arr });
    console.log(`ttttttttttttttttttttttttttt : ${t}`);
    console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
  }
  updateInputValue3(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[2] = t;
    console.log(`arr22222 : ${arr}`);

    this.setState({ inputfield: arr });
    console.log(`ttttttttttttttttttttttttttt : ${t}`);
    console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
  }
  updateInputValue4(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[3] = t;
    console.log(`arr3333 : ${arr}`);

    this.setState({ inputfield: arr });
    console.log(`ttttttttttttttttttttttttttt : ${t}`);
    console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
  }
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.quiniela);

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />

        <View style={styles.titulo}>
          <Titulo>UNIRSE A QUINIELA</Titulo>
        </View>

        <View>
          <Text style={styles.texto}>Introduzca el{'\n'}Código de Activación:</Text>
        </View>

        <View style={styles.view1}>
          <InputLetra onChangeText={t => this.updateInputValue1(t)} />
          <InputLetra onChangeText={t => this.updateInputValue2(t)} />
          <InputLetra onChangeText={t => this.updateInputValue3(t)} />
          <InputLetra onChangeText={t => this.updateInputValue4(t)} />
        </View>

        <View>
          <BotonPrincipal onPress={() => this.buscarCodigo()}>Ok</BotonPrincipal>
        </View>

        <View>
          <BotonPrincipal onPress={() => this.cancelar(navigate)}>Cancelar</BotonPrincipal>
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
  },
});

const mapStateToProps = state => ({
  error: state.codigos.codigoNoExiste,
  quiniela: state.codigos.quinielaID,
  aceptaAbonados: state.codigos.recibirAbonados,
});

export default connect(mapStateToProps, { buscarCodigos, agregarJugador })(UnirseAQuiniela);
