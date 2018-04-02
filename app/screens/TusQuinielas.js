import React, { Component } from 'react';
import { StatusBar, ListView, View, FlatList, Text, BackHandler } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';

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

  componentDidMount() {
    this.props.buscarQuinielas();
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  unirseAQuiniela(navigate) {
    navigate('UnirseAQuiniela');
  }

  logout2(navigate) {
    firebase.auth().signOut();
    navigate('CargandoHome');
  }

  logout = async (navigate) => {
    try {
      await firebase.auth().signOut();
      navigate('CargandoHome');
    } catch (e) {
      console.error(e);
    }
  };

  crear(navigate) {
    navigate('QuinielasAdministradas');
  }

  _renderItem = ({ item }) => <Qx quiniela={item} />;
  _keyExtractor = item => item.uid + item.nombreapuesta;

  render() {
    const { navigate } = this.props.navigation;
    console.log('PORQUE ENTRA AQUI TUS QUINIELAS???');

    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <BotonPrincipal onPress={() => this.logout2(navigate)}>Salir</BotonPrincipal>

          <View style={styles.titulo}>
            <Titulo>MIS QUINIELAS</Titulo>
          </View>

          {this.props.quinielas.length > 0 ? (
            <FlatList
              data={this.props.quinielas}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          ) : (
            <Text>No eres parte de ninguna quiniela</Text>
          )}

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.unirseAQuiniela(navigate)}>
              Unirse a una Quiniela
            </BotonPrincipal>
            <BotonPrincipal onPress={() => this.crear(navigate)}>
              Organiza una Quiniela
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
