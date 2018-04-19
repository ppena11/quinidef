import React, { Component } from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { buscarPartidos } from '../actions';
import { Container } from '../components/Container';
import { Titulo } from '../components/Titulo';
import { Pronostico } from '../components/Pronostico';
import { PuntajeJugador } from '../comun/puntaje';
import color from '../comun/colors';

class DetalleQuiniela extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      partidos: {},
    };
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    this.run();
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  run = async () => {
    try {
      const partidos = await this.props.buscarPartidos();
      const r1 = partidos.toJSON();
      this.setState({ partidos: r1 });
      console.log(r1);
    } catch (e) {
      console.log(e);
    }
  };

  fechaHoraDispositivo (fechaHoraGMT0) {
    let diahora = new Date(fechaHoraGMT0 + " UTC");
    let mes = (diahora.getMonth()+1)<10 ? "0"+(diahora.getMonth()+1) : (diahora.getMonth()+1);
    let hora = diahora.getHours()<10 ? "0"+diahora.getHours() : diahora.getHours();
    let minutos = diahora.getMinutes()<10 ? "0"+diahora.getMinutes() : diahora.getMinutes();
    return diahora.getDate() + "/" + mes +  "/" + diahora.getFullYear() + " " + hora + ":" + minutos;
  }

  grupofasetext (grupoFase) {
    let resultado = "";
    if (grupoFase.length == 1) resultado = "Grupo " + grupoFase;
    else resultado = grupoFase;
    return resultado;
  }

  renderRow(partidos) {
    return (
      <Pronostico
        equipoA={partidos.value.idA}
        equipoB={partidos.value.idB}
        fecha={this.fechaHoraDispositivo(partidos.value.inicioGMT0)}
        grupoFase={this.grupofasetext(partidos.value.grupofase)}
      />
    );
  }

  calcularPuntajeTotalJugador() {
    //data de prueba/ejemplo
    let apuestas = [
      [0, 1, 0],  // 10 pts
      [1, 1, 1],  //  8 pts
      [2, 2, 1],  //  1 pto
      [3, 2, 0]   //  6 pts
    ];
    let resultados = [
      [0, 1, 0],
      [1, 2, 2],
      [2, 0, 1],
      [3, 2, 1]
    ];
    let reglas = [5, 5, 3, 1];

    return PuntajeJugador(apuestas, resultados, reglas);
  }

  render() {
    const partidos = Object.keys(this.state.partidos).map(key => ({
      key,
      value: this.state.partidos[key],
    }));
    //console.error({partidos});

    return(
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />

        <View style={styles.titulo}>
          <Titulo>DETALLE QUINIELA</Titulo>
          <Titulo>{this.calcularPuntajeTotalJugador()} pts</Titulo>
        </View>

        <View style={styles.cuerpo}>
          <FlatList
            data={partidos}
            renderItem={({ item }) => this.renderRow(item)}
            onEndReachedThershold={0}
            ref={(ref) => {
              this.listRef = ref;
            }}
          />
        </View>
{/*     
        <View>
          <Pronostico equipoA="rus" equipoB="ksa"/>

          <Pronostico equipoA="egy" equipoB="uru"/>
          <Pronostico equipoA="mar" equipoB="irn"/>
          <Pronostico equipoA="por" equipoB="esp"/>

          <Pronostico equipoA="fra" equipoB="aus"/>
          <Pronostico equipoA="arg" equipoB="isl"/>
          <Pronostico equipoA="per" equipoB="din"/>
          <Pronostico equipoA="cro" equipoB="nga"/>
        </View>
 */}
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  titulo: {
    padding: 10,
  },
});

const mapStateToProps = state => {
  const partidos = state.partidos;
  
  return {
    partidos,
  };
};

export default connect(mapStateToProps, { buscarPartidos })(DetalleQuiniela);
