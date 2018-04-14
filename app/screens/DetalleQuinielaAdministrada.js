import React, { Component } from 'react';
import firebase from 'firebase';
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  ListView,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  buscarJugadoresAdministradas,
  buscarJugadoresAdministradasT,
  buscarJugadoresAdministradasMaxT,
  buscarJugadoresAdministradasMax,
  BuscarJugadorTexto,
  reloadingJugadores,
  buscarDisponibles,
  irAdministradas,
  buscarPorActivar,
  buscarActivos,
} from '../actions';
import { Container } from '../components/Container';
import { BotonPrincipal } from '../components/BotonPrincipal';
import { Titulo } from '../components/Titulo';
import { QuinielaAdminItem } from '../components/QuinielaAdminItem';
import color from '../comun/colors';

class DetalleQuinielaAdministrada extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      users: _.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({
        ...val,
        uid,
      })),
      filteredUsers: _.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({
        ...val,
        uid,
      })),
      q: '',
      menu: 'yes',
    };
  }

  componentDidMount() {
    // Buscar los jugaroes de la quiniela y su estado
    // this.createDataSource(this.props);
    // const { quinielaNombre, torneo } = this.props.quiniela;
    // console.log(_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({ ...val, uid })));
    this.props.buscarDisponibles(this.props.navigation.state.params.quiniela.uid);
    // this.props.buscarPorActivar(this.props.navigation.state.params.quiniela.uid);
    // this.props.buscarActivos(this.props.navigation.state.params.quiniela.uid);
    this.props.buscarJugadoresAdministradas(this.props.navigation.state.params.quiniela.uid);
    this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    // this.createDataSource(nextProps);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    firebase
      .database()
      .ref(`/quinielas/${this.props.navigation.state.params.quiniela.uid}/info/quinielasDisponibles`)
      .off();
    firebase
      .database()
      .ref(`/quinielas/${this.props.navigation.state.params.quiniela.uid}/info/quinielasPorActivar`)
      .off();
    firebase
      .database()
      .ref(`/quinielas/${this.props.navigation.state.params.quiniela.uid}/info/quinielasActivos`)
      .off();
  }

  keyboardWillShow = () => {
    this.setState({ menu: 'no' });
  };

  keyboardWillHide = () => {
    this.setState({ menu: 'yes' });
  };

  createDataSource({ quinielas }) {
    // const ds = new ListView.DataSource({
    //  rowHasChanged: (r1, r2) => r1 !== r2,
    // });
    // this.dataSource = ds.cloneWithRows(quinielas);
  }

  crear(navigate) {
    // console.log('TEST');
    // navigate('EliminarApuesta');
  }

  tusquinielas() {
    // console.log('TEST2');
    this.props.reloadingJugadores();
    this.props.irAdministradas();
    // this.props.navigation.goBack();
  }

  renderRow(jugador) {
    return (
      <QuinielaAdminItem
        jugador={jugador}
        quiniela={this.props.navigation.state.params.quiniela.uid}
        quinielan={this.props.navigation.state.params.quiniela.quinielaNombre}
        codigo={this.props.navigation.state.params.quiniela.codigoq}
        info={this.props.info}
      />
    );
  }

  pressed(e) {
    Keyboard.dismiss();
  }

  filtrarJugadores(qi) {
    this.props.reloadingJugadores();
    this.props.BuscarJugadorTexto(qi);
    const text = this.props.buscarTexto;

    if (qi.length > 0) {
      this.props.buscarJugadoresAdministradasT(qi, this.props.navigation.state.params.quiniela.uid);
    }
    if (qi.length == 0) {
      this.props.buscarJugadoresAdministradas(this.props.navigation.state.params.quiniela.uid);
    }
  }

  filterList() {
    let users = this.state.users;
    const q = this.state.q;

    users = users.filter(user => user.Name.toLowerCase().indexOf(q) != -1);
    this.setState({ filteredUsers: users });
  }

  handleLoadMore = () => {
    if (Object.keys(this.props.jugadores).length !== 0) {
      // console.log('Llego al finalllllllll');
      // console.log(`tamano llego al final ${Object.keys(this.props.quinielas).length}`);

      // console.log(this.props.quinielas);
      // this.props.buscarQuinielasAdministradasMax(this.props.ultima);

      if (this.props.llegoalfinal != 'yes') {
        // console.log(this.props.quinielas);
        if (this.props.buscarTexto.length == 0) {
          this.props.buscarJugadoresAdministradasMax(
            this.props.ultima,
            this.props.navigation.state.params.quiniela.uid,
          );
        } else {
          // console.log(`BUSCANDO MAS --- APUNTADOR ${this.props.ultima} ---- TEXTO --- ${
          //  this.props.buscarTexto
          // }`);
          this.props.buscarJugadoresAdministradasMaxT(
            this.props.ultima,
            this.props.buscarTexto,
            this.props.navigation.state.params.quiniela.uid,
          );
        }
      }
    }

    // this.props.buscarQuinielasAdministradasMax(this.props.ultima);
  };

  menustatus() {
    if (this.state.menu === 'yes') {
      return (
        <View>
          {/* <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal> */}
          <BotonPrincipal onPress={() => this.tusquinielas()}>Comprar...</BotonPrincipal>
          <BotonPrincipal onPress={() => this.tusquinielas()}>Regresar</BotonPrincipal>
        </View>
      );
    }
    return <View />;
  }

  render() {
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle1,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      cardSectionStyle,
      headerContentStyle1,
      containerStyle,
    } = styles;

    // console.log(this.props.info.quinielasActivos);
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>
              {this.props.navigation.state.params.quiniela.quinielaNombre}
              {'\n'}Código: {this.props.navigation.state.params.quiniela.codigoq}
            </Titulo>
          </View>
          {/*    <View style={containerStyle}>
            <Text headerTextStyle1>
              Codigo: {this.props.navigation.state.params.quiniela.codigoq}
            </Text>
          </View> */}
          <View style={containerStyle}>
            <TouchableOpacity onPress={() => this.onReglasPress()} style={headerContentStyle}>
              <Text style={headerTextStyle1}>ACTIVOS</Text>
              <Text style={headerTextStyle}>{this.props.info.quinielasActivos}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onReglasPress()} style={headerContentStyle}>
              <Text style={headerTextStyle1}>POR ACTIVAR</Text>
              <Text style={headerTextStyle}>{this.props.info.quinielasPorActivar}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={headerContentStyle}>
              <Text style={headerTextStyle1}>DISPONIBLES</Text>
              <Text style={headerTextStyle}>{this.props.info.quinielasDisponibles}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles2.conta}>
            <View style={styles2.vire} />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid={color.$underlineColorAndroid}
              placeholder="Buscar usuario..."
              placeholderTextColor={color.$placeholderTextColor}
              selectionColor={color.$selectionColor}
              autoCapitalize="characters"
              onSubmitEditing={() => this.pressed()}
              onChangeText={q => this.filtrarJugadores(q)}
            />

            <View style={styles2.vire} />
          </View>

          <View style={styles.cuerpo}>
            <FlatList
              data={this.props.jugadores}
              keyExtractor={item => item.uid}
              renderItem={({ item }) => this.renderRow(item)}
              onEndReached={this.handleLoadMore}
              onEndReachedThershold={0}
              ref={(ref) => {
                this.listRef = ref;
              }}
            />
          </View>

          <View style={styles.bottom}>{this.menustatus()}</View>
        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },

  containerStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  headerTextStyle: {
    fontSize: 16,
    color: color.$qxaHeaderTextStyle,
    alignContent: 'center',
  },

  headerTextStyle1: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle,
    alignContent: 'center',
    fontWeight: '500',
  },
  form: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titulo: {
    padding: 10,
  },
  cuerpo: { flex: 1 },
  bottom: {
    padding: 20,
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10,
  },
});

const styles2 = EStyleSheet.create({
  conta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vire: {
    flex: 1,
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});
const mapStateToProps = (state) => {
  const tt = _.map(state.jugadoresadmin, (val, uid) => ({ ...val, uid }));

  const jugadores = _.orderBy(tt, ['nombre'], ['asc']);

  return {
    jugadores,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar,
    info: state.activacion,
    // poractivar: state.activacion.poractivar,
    // activos: state.activacion.activos,
  };
};

export default connect(mapStateToProps, {
  buscarJugadoresAdministradas,
  buscarJugadoresAdministradasT,
  buscarJugadoresAdministradasMaxT,
  buscarJugadoresAdministradasMax,
  BuscarJugadorTexto,
  reloadingJugadores,
  buscarDisponibles,
  irAdministradas,
  buscarPorActivar,
  buscarActivos,
})(DetalleQuinielaAdministrada);
