import React, { Component } from 'react';
import { StatusBar, ListView, View, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { connect } from 'react-redux';
import { buscarQuinielas } from '../actions';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';

import { Qx } from '../components/Qx';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.buscarQuinielas();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  createDataSource({ quinielas }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(quinielas);
  }

  test(navigate) {
    console.log('TEST');
    // navigate('Home');
  }

  crear(navigate) {
    navigate('QuinielasAdministradas');
  }

  renderRow(quiniela) {
    return <Qx quiniela={quiniela} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#00244f" />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>MIS QUINIELAS</Titulo>
          </View>

          <ScrollView style={styles.cuerpo}>
            <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
          </ScrollView>

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.test()}>Unirse a una Quiniela</BotonPrincipal>
            <BotonPrincipal onPress={() => this.crear(navigate)}>Crea tu Quiniela</BotonPrincipal>
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
  const quinielas = _.map(state.quinielas, (val, uid) => ({ ...val, uid }));
  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielas })(TusQuinielas);
