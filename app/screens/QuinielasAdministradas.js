import React, { Component } from 'react';
import { StatusBar, ListView, View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { connect } from 'react-redux';
import { buscarQuinielasAdministradas } from '../actions';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';

import { Qxa } from '../components/Qxa';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.buscarQuinielasAdministradas();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    this.createDataSource(nextProps);
    console.log(nextProps);
  }

  createDataSource({ quinielas }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(quinielas);
  }

  crear(navigate) {
    // console.log('TEST');
    navigate('CreaciondeQuiniela');
  }

  tusquinielas(navigate) {
    // console.log('TEST2');
    navigate('TusQuinielas');
  }

  renderRow(quiniela) {
    return <Qxa quiniela={quiniela} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#00244f" />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>QUINIELAS ADMINISTRADAS</Titulo>
          </View>

          <ScrollView style={styles.cuerpo}>
            <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
          </ScrollView>

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.crear(navigate)}>
              Crear una nueva quiniela
            </BotonPrincipal>
            <BotonPrincipal onPress={() => this.tusquinielas(navigate)}>
              Tus Quinielas
            </BotonPrincipal>
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

  const quinielas = _.orderBy(tt, ['quinielaNombre'], ['asc']);

  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielasAdministradas })(TusQuinielas);
