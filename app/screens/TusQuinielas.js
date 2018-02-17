import React, { Component } from 'react';
import { StatusBar, ListView, View, FlatList, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import firebase from 'firebase';

import { connect } from 'react-redux';
import { buscarQuinielas } from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { Qx } from '../components/Qx';
import color from '../comun/colors';

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
    this.DataSource = _.values(quinielas);
  }

  unirseAQuiniela(navigate) {
    //navigate('UnirseAQuiniela');
  }

  logout (navigate) {
    firebase.auth().signOut();
  }

  crear(navigate) {
    navigate('QuinielasAdministradas');
  }

  _renderItem = ({item}) => (<Qx quiniela={item}/>);
  _keyExtractor = (item) => item.uid + item.nick;

  render() {
    const { navigate } = this.props.navigation;
    if(this.DataSource.length == 0) console.log("No eres parte de ninguna quiniela");

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={color.$statusBarBackgroundColor} />
        <View style={styles.form}>
          <BotonPrincipal onPress={() => this.logout(navigate)}>
            Salir
          </BotonPrincipal>
          
          <View style={styles.titulo}>
            <Titulo>MIS QUINIELAS</Titulo>
          </View>

          <FlatList
            data = {this.DataSource}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.unirseAQuiniela(navigate)}>
              Unirse a una Quiniela
            </BotonPrincipal>
            <BotonPrincipal onPress={() => this.crear(navigate)}>
              Crea tu Quiniela
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
  const quinielas = _.map(state.quinielas, (val, uid) => ({ ...val, uid }));
  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielas })(TusQuinielas);
