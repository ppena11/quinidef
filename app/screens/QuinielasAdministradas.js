import React, { Component } from 'react';
import { StatusBar, ListView, View, ScrollView, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  buscarQuinielasAdministradas,
  buscarQuinielasAdministradasMax,
  ultimaQuinielasAdministrada,
  ultimaQuinielasLlego,
  resetQuinielasAdmin,
  reloadedQuinielasAdmin,
  ultimaQuinielasLlegoNo,
} from '../actions';

import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { Qxa } from '../components/Qxa';
import color from '../comun/colors';

class QuinielasAdministradas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.buscarQuinielasAdministradas(); // Busca las quinielas administradas :)

    //  this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`llegoalfinal NEXT1 ${nextProps.llegoalfinal}`);
    // console.log(`llegoalfinal this ${this.props.llegoalfinal}`);

    if (nextProps.reload == 'yes') {
      // this.listRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true }); // Coloca la lista al principio del scroll
      nextProps.ultimaQuinielasLlegoNo(); // Resetea el indicador para continaur con la proxima bsuqueda
      nextProps.reloadedQuinielasAdmin(); // Reinicia el indicador para evitar que se realice la carga de la primera quiniela
      nextProps.resetQuinielasAdmin(); // Borra todas las quinielas existentes anteriormente
      nextProps.buscarQuinielasAdministradas(); // Busca nuevamente las quinielas administradas :)
    }

    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    //  this.createDataSource(nextProps);
    // console.log(`WILL RECEIVE PROPS TT1 ${nextProps.tt1}`);
    // console.log(`nextProps.tt1  ${nextProps.tt1}`);
    // console.log(`thisProps. ${this.props.navigation}`);
    // console.log(`nextProps. ${nextProps.navigation}`);
    // console.log(`tamanoProps ${Object.keys(this.props.quinielas).length}`);
    // if (Object.keys(this.props.quinielas).length > 15) {
    //  this.listRef.scrollToIndex({ index: 13, animated: true });
    // }
  }

  crear(navigate) {
    // console.log('TEST');
    navigate('CreaciondeQuiniela');
  }

  tusquinielas(goBack) {
    // console.log('TEST2');
    goBack();
  }

  renderRow(quiniela) {
    return <Qxa quiniela={quiniela} />;
  }

  handleLoadMore = () => {
    if (Object.keys(this.props.quinielas).length !== 0) {
      // console.log('Llego al finalllllllll');
      // console.log(`tamano llego al final ${Object.keys(this.props.quinielas).length}`);

      // console.log(this.props.quinielas);
      // this.props.buscarQuinielasAdministradasMax(this.props.ultima);

      if (this.props.llegoalfinal != 'yes') {
        // console.log(this.props.quinielas);

        this.props.buscarQuinielasAdministradasMax(this.props.ultima);
      }
    }

    // this.props.buscarQuinielasAdministradasMax(this.props.ultima);
  };

  render() {
    const { navigate, goBack } = this.props.navigation;

    // this.props.ultimaQuinielasAdministrada('2342354345');
    // console.log(`EPALE.... ${this.props.ultima}`);
    // console.log(`RENDER TT1 ${this.props.tt1}`);
    console.log(`llegoalfinal this render ${this.props.llegoalfinal}`);

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>QUINIELAS ADMINISTRADAS</Titulo>
          </View>

          <View style={styles.cuerpo}>
            <FlatList
              data={this.props.quinielas}
              keyExtractor={item => item.adminr}
              renderItem={({ item }) => this.renderRow(item)}
              onEndReached={this.handleLoadMore}
              onEndReachedThershold={0.99}
              ref={(ref) => {
                this.listRef = ref;
              }}
            />
          </View>

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.crear(navigate)}>
              Crear una nueva quiniela
            </BotonPrincipal>
            <BotonPrincipal onPress={() => this.tusquinielas(goBack)}>Tus Quinielas</BotonPrincipal>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titulo: {
    padding: 20,
  },
  cuerpo: {
    flex: 1,
  },
  bottom: {
    padding: 20,
  },
});

const mapStateToProps = (state) => {
  const tt = _.map(state.quinielasadmin, (val, uid) => ({ ...val, uid }));
  const tt1 = tt; // console.log(tt);

  if (state.quinielalast.ultima != 'yes') {
    if (tt != undefined) {
      const last = tt.pop();
      if (last != undefined) {
        // this.props.ultimaQuinielasAdministrada(last.adminr);
      }
    }
  }
  // const quinielas = tt;

  const quinielas = _.orderBy(tt, ['uid'], ['desc']);

  return {
    tt1,
    quinielas,
    ultima: state.quinielalast.last,
    llegoalfinal: state.quinielalast.ultima,
    reload: state.quinielalast.reload,
  };
};

export default connect(mapStateToProps, {
  buscarQuinielasAdministradas,
  ultimaQuinielasAdministrada,
  buscarQuinielasAdministradasMax,
  ultimaQuinielasLlego,
  resetQuinielasAdmin,
  reloadedQuinielasAdmin,
  ultimaQuinielasLlegoNo,
})(QuinielasAdministradas);
