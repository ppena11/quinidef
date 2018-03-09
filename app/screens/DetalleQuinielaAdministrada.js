import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  ListView,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import { connect } from 'react-redux';

import { buscarQuinielasAdministradas } from '../actions';
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

  componentWillMount() {
    // this.props.buscarQuinielasAdministradas();
    // this.createDataSource(this.props);
    // const { quinielaNombre, torneo } = this.props.quiniela;
    // console.log(_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({ ...val, uid })));
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
    // navigate('CreaciondeQuiniela');
  }

  tusquinielas(goBack) {
    // console.log('TEST2');
    this.props.reloadingQuinielas();
    goBack();
  }

  renderRow(quiniela) {
    return <QuinielaAdminItem quiniela={quiniela} />;
  }

  pressed(e) {
    Keyboard.dismiss();
  }

  filtrarQuinielas(qi) {
    const q = qi.toLowerCase();
    this.setState({ q }, () => this.filterList());
  }

  filterList() {
    let users = this.state.users;
    const q = this.state.q;

    users = users.filter(user => user.Name.toLowerCase().indexOf(q) != -1);
    this.setState({ filteredUsers: users });
  }

  menustatus({ navigate, goBack }) {
    if (this.state.menu === 'yes') {
      return (
        <View>
          <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal>
          <BotonPrincipal onPress={() => this.tusquinielas(goBack)}>Tus Quinielas</BotonPrincipal>
        </View>
      );
    }
    return <View />;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.form}>
          <View style={styles.titulo}>
            <Titulo>{this.props.navigation.state.params.quiniela.quinielaNombre}</Titulo>
          </View>
          <View style={styles2.conta}>
            <View style={styles2.vire} />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid={color.$underlineColorAndroid}
              placeholder="Buscar..."
              placeholderTextColor={color.$placeholderTextColor}
              selectionColor={color.$selectionColor}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={() => this.pressed()}
              onChangeText={q => this.filtrarQuinielas(q)}
            />
            <View style={styles2.vire} />
          </View>

          <View style={styles.cuerpo}>
            <FlatList
              data={this.state.filteredUsers}
              renderItem={({ item }) => this.renderRow(item)}
            />
          </View>

          <View style={styles.bottom}>{this.menustatus({ navigate, goBack })}</View>
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
  const tt = _.map(state.quinielasadmin, (val, uid) => ({ ...val, uid }));

  const quinielas = _.orderBy(tt, ['quinielaNombre'], ['asc']);

  return { quinielas };
};

export default connect(mapStateToProps, { buscarQuinielasAdministradas })(DetalleQuinielaAdministrada);
