import React, { Component } from 'react';
import { StatusBar, ListView, Keyboard, View, ScrollView, FlatList, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  buscarQuinielasAdministradas,
  buscarQuinielasAdministradasMax,
  buscarQuinielasAdministradasT,
  buscarQuinielasAdministradasMaxT,
  ultimaQuinielasAdministrada,
  ultimaQuinielasLlego,
  resetQuinielasAdmin,
  reloadedQuinielasAdmin,
  reloadingQuinielas,
  ultimaQuinielasLlegoNo,
  mostrarMenu,
  esconderMenu,
  BuscarQuinielaTexto,
  irTusQuinielas,
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

  constructor(props) {
    super(props);

    this.state = {
      menu: 'yes',
    };
  }

  componentWillMount() {
    this.props.buscarQuinielasAdministradas(); // Busca las quinielas administradas :)
    this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);

    //  this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`llegoalfinal NEXT1 ${nextProps.llegoalfinal}`);
    // console.log(`llegoalfinal this ${this.props.llegoalfinal}`);

    if (nextProps.reload == 'yes') {
      // this.listRef.scrollToIndex({ index: 0, viewPosition: 0, animated: true }); // Coloca la lista al principio del scroll
      nextProps.ultimaQuinielasLlegoNo(); // Resetea el indicador para continaur con la proxima bsuqueda
      nextProps.reloadedQuinielasAdmin(); // Reinicia el indicador para evitar que se realice la carga de la primera quiniela y borra el estado de busqueda
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

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  crear() {
    // console.log('TEST');

    this.props.navigation.navigate('CreaciondeQuiniela');
  }

  keyboardWillShow = () => {
    this.props.esconderMenu();
  };

  keyboardWillHide = () => {
    this.props.mostrarMenu();
  };

  pressed(e) {
    Keyboard.dismiss();
  }

  filtrarQuinielas(qi) {
    this.props.BuscarQuinielaTexto(qi);
    const text = this.props.buscarTexto;

    if (qi.length > 0) {
      this.props.buscarQuinielasAdministradasT(qi);
    }
    if (qi.length == 0) {
      this.props.buscarQuinielasAdministradas();
    }
  }

  filterList() {
    let users = this.state.users;
    const q = this.state.q;

    users = users.filter(user => user.Name.toLowerCase().indexOf(q) != -1);
    this.setState({ filteredUsers: users });
  }

  tusquinielas() {
    // console.log('TEST2');
    this.props.reloadingQuinielas();
    this.props.irTusQuinielas();
    // this.props.navigation.goBack();
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
        if (this.props.buscarTexto.length == 0) {
          this.props.buscarQuinielasAdministradasMax(this.props.ultima);
        } else {
          // console.log(`BUSCANDO MAS --- APUNTADOR ${this.props.ultima} ---- TEXTO --- ${
          //  this.props.buscarTexto
          // }`);
          this.props.buscarQuinielasAdministradasMaxT(this.props.ultima, this.props.buscarTexto);
        }
      }
    }

    // this.props.buscarQuinielasAdministradasMax(this.props.ultima);
  };

  menustatus() {
    if (this.props.mostrarMenus === 'yes') {
      return (
        <View>
          <BotonPrincipal onPress={() => this.crear()}>Organizar Quiniela</BotonPrincipal>
          <BotonPrincipal onPress={() => this.tusquinielas()}>Tus Quinielas</BotonPrincipal>
        </View>
      );
    }
    return <View />;
  }

  render() {
    // console.log('PORQUE ENTRA AQUI QUINIELAS ADMINISTRADAS???');

    // this.props.ultimaQuinielasAdministrada('2342354345');
    // console.log(`EPALE.... ${this.props.ultima}`);
    // console.log(`RENDER TT1 ${this.props.tt1}`);
    // console.log(`llegoalfinal this render ${this.props.llegoalfinal}`);

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

          <View style={styles2.conta}>
            <View style={styles2.vire} />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid={color.$underlineColorAndroid}
              placeholder="Buscar..."
              placeholderTextColor={color.$placeholderTextColor}
              selectionColor={color.$selectionColor}
              autoCapitalize="characters"
              onSubmitEditing={() => this.pressed()}
              onChangeText={q => this.filtrarQuinielas(q)}
            />
            <View style={styles2.vire} />
          </View>

          <View style={styles.cuerpo}>
            <FlatList
              data={this.props.quinielas}
              keyExtractor={item => item.adminr}
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
  form: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  titulo: {
    padding: 5,
  },
  cuerpo: {
    flex: 1,
  },
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
  const tt = _.map(state.quinielasadmin, (val, uid) => ({ ...val, uid }));
  const tt1 = tt; // console.log(tt);
  // console.log(state.quinielasadmin);

  // const quinielas = tt;

  const quinielas = _.orderBy(tt, ['uid'], ['desc']);

  // const quinielas = tt;

  return {
    tt1,
    quinielas,
    ultima: state.quinielalast.last,
    llegoalfinal: state.quinielalast.ultima,
    reload: state.quinielalast.reload,
    mostrarMenus: state.quinielalast.mostrarMenu,
    buscarTexto: state.quinielalast.buscar,
  };
};

export default connect(mapStateToProps, {
  buscarQuinielasAdministradas,
  ultimaQuinielasAdministrada,
  buscarQuinielasAdministradasT,
  buscarQuinielasAdministradasMaxT,
  buscarQuinielasAdministradasMax,
  ultimaQuinielasLlego,
  resetQuinielasAdmin,
  reloadedQuinielasAdmin,
  ultimaQuinielasLlegoNo,
  mostrarMenu,
  esconderMenu,
  BuscarQuinielaTexto,
  reloadingQuinielas,
  irTusQuinielas,
})(QuinielasAdministradas);
