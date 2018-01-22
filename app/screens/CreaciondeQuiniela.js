import React, { Component } from 'react';
import { StatusBar, ListView, View, ScrollView, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import { connect } from 'react-redux';
import { buscarTorneos } from '../actions';
import { Container } from '../components/Container';

import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';

import { TorneoItem } from '../components/TorneoItem';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.props.buscarTorneos();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  createDataSource({ torneos }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(torneos);
  }

  crear(navigate) {
    console.log('TEST');
    // navigate('Home');
  }

  cancelar(navigate) {
    navigate('QuinielasAdministradas');
  }

  renderRow(torneo) {
    return <TorneoItem torneo={torneo} />;
  }

  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor="#00244f" />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>CREA TU QUINIELA</Titulo>
          </View>

          <ScrollView style={styles.cuerpo}>
            <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
          </ScrollView>

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Nombre de la quiniela"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => this.crear()}
          />

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.crear()}>Crear</BotonPrincipal>
            <BotonPrincipal onPress={() => this.cancelar(navigate)}>Cancelar</BotonPrincipal>
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
  // console.log(state.torneos);
  const torneos = _.map(state.torneos, (val, uid) => ({ ...val, uid }));
  return { torneos };
};

export default connect(mapStateToProps, { buscarTorneos })(TusQuinielas);
