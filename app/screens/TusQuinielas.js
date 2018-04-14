import React, { Component } from 'react';
import { StatusBar, ListView, View, FlatList, Text, BackHandler, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { buscarQuinielas, salir, irAdministradas } from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { Qx } from '../components/Qx';
import color from '../comun/colors';
import { Spinner } from '../components/Spinner';

class TusQuinielas extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      validando: false,
      qu: {},
    };

    this.loading = this.loading.bind(this);
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    this.run();
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }

  run = async () => {
    try {
      const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      const test = await this.props.buscarQuinielas(currentUser.uid);
      const tt1 = test.toJSON();
      //   console.log(`TESTTTTTSTSTSTS ${test}`);
      this.setState({ qu: tt1 });
      // this.setState({ validando: false });
    } catch (e) {
      //   console.log(e);
      // this.setState({ validando: false });
    }
  };

  unirseAQuiniela() {
    this.props.navigation.navigate('UnirseAQuiniela');
  }

  logout2(navigate) {
    firebase.auth().signOut();
    // navigate('CargandoHome');
  }

  logout = async (navigate) => {
    try {
      await firebase.auth().signOut();
      navigate('CargandoHome');
    } catch (e) {
      console.error(e);
    }
  };

  crear() {
    this.props.irAdministradas();
    // this.props.navigation.navigate('QuinielasAdministradas');
  }

  _renderItem = ({ item }) => <Qx quiniela={item} />;
  _keyExtractor = item => item.uid + item.nombreapuesta;

  loading(tt) {
    if (this.state.validando) {
      return (
        <Container>
          <View style={styles.viewImgStyle}>
            <Image
              style={styles.imgStyle}
              source={require('../components/Logo/images/copa1.png')}
            />
          </View>
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
          <View style={styles.viewStyle} />
        </Container>
      );
    }
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <BotonPrincipal onPress={() => this.logout2()}>Salir</BotonPrincipal>

          <View style={styles.titulo}>
            <Titulo>MIS QUINIELAS</Titulo>
          </View>

          <FlatList data={tt} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />

          <View style={styles.bottom}>
            <BotonPrincipal onPress={() => this.unirseAQuiniela()}>
              Unirse a una Quiniela
            </BotonPrincipal>
            <BotonPrincipal onPress={() => this.crear()}>Organiza una Quiniela</BotonPrincipal>
          </View>
        </View>
      </Container>
    );
  }

  render() {
    // const { navigate } = this.props.navigation;
    // console.log('PORQUE ENTRA AQUI TUS QUINIELAS???');
    const tt = _.map(this.state.qu, (val, uid) => ({ ...val, uid }));
    // console.log(`ttttttttttttttttttttttttttttttttttttttttttttttttttttttt ${tt}`);
    // console.log(`VALIDANDO TUS QUINIELAS ${this.state.validando}`);
    return this.loading(tt);
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
  viewImgStyle: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: 200,
    width: 200,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const tt = _.map(state.quinielas, (val, uid) => ({ ...val, uid }));
  const quinielas = _.orderBy(tt, ['uid'], ['desc']);
  // console.log(quinielas);
  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielas, salir, irAdministradas })(TusQuinielas);
