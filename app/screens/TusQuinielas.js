import React, { Component } from "react";
import {
  StatusBar,
  ListView,
  View,
  FlatList,
  Text,
  BackHandler,
  Image,
  Alert,
  NetInfo,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import { connect } from "react-redux";
import firebase from "firebase";
import { NavigationActions } from "react-navigation";

import {
  buscarQuinielas,
  salir,
  irAdministradas,
  salirSistema
} from "../actions";
import { Container } from "../components/Container";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Titulo } from "../components/Titulo";
import { Qx } from "../components/Qx";
import { Spinner } from "../components/Spinner";
import { HeaderText } from '../components/HeaderText';
import { iconos } from "../comun/imagenes";
import color from "../comun/colors";

class TusQuinielas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validando: false,
      qu: {},
      botonesDeshabilitados: false
    };

    this.loading = this.loading.bind(this);
    this.run = this.run.bind(this);
    this.handleBackButtonTusQuinielas = this.handleBackButtonTusQuinielas.bind(this);
    // this.alertLogout = this.alertLogout.bind(this);
    this2 = this;
  }

  static navigationOptions = {
    headerTitle: <HeaderText texto="Tus Quinielas"/>,
    headerLeft: (
      <TouchableOpacity onPress={() => this2.alertLogout()}>
        <Image
          style={{
            height: 30,
            aspectRatio: 1,
            padding: 0,
            margin: 10,
            tintColor: color.$headerImageTintColor,
          }}
          source={iconos['$masopciones']}
        />
      </TouchableOpacity>
    ),
    headerRight: (<TouchableOpacity/>),
  };

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 5000);
    funcion();
  }

  componentDidMount() {
    this.run();
    console.log("(TusQuinielas) componentDidMount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonTusQuinielas);
  }

  componentWillUnmount() {
    console.log("(TusQuinielas) componentWillUnmount");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonTusQuinielas);
  }

  handleBackButtonTusQuinielas() {
    Alert.alert(
      "Confirmación...",
      "¿Deseas salir?",
      [
        // {text: 'Cerrar Sesión', onPress: () => this.props.salirSistema()},
        {text: 'Sí', onPress: () => BackHandler.exitApp()},
        {text: 'Cancelar', onPress: () => {return true}},
      ],
      { cancelable: false }
    );
    return true;
  }

  alertLogout() {
    Alert.alert(
      'Confirmación...',
      '¿Deseas cerrar la sesión?',
      [
        {text: 'Sí', onPress: () => this.props.salirSistema()},
        {text: 'Cancelar', onPress: () => { return true }},
      ],
      { cancelable: true }
    );
  }

  run = async () => {
    try {
      const { currentUser } = firebase.auth();
      this.setState({ validando: true });
      const test = await this.props.buscarQuinielas(currentUser.uid);
      const tt1 = test.toJSON();
      //   console.log(`TESTTTTTSTSTSTS ${test}`);
      this.setState({ qu: tt1 });
      this.setState({ validando: false });
    } catch (e) {
      //console.log(e);
      this.setState({ validando: false });
    }
  };

  unirseAQuiniela() {
    this.props.navigation.navigate("UnirseAQuiniela");
  }

  logout2(navigate) {
    // firebase.auth().signOut();
    this.props.salirSistema();
    // navigate('CargandoHome');
  }

  logout = async navigate => {
    try {
      await firebase.auth().signOut();
      navigate("CargandoHome");
    } catch (e) {
      console.error(e);
    }
  };

  crear() {
    // this.props.irAdministradas();
    this.props.navigation.navigate("QuinielasAdministradas");
  }

  _renderItem = ({ item }) => <Qx quiniela={item}/>;
  _keyExtractor = item => item.uid + item.nombreapuesta;

  loading(tt) {
    if (this.state.validando) {
      return (
        <Container>
          <Spinner size="large" />
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
          <FlatList
            data={tt}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />

          <View style={styles.bottom}>
            <BotonPrincipal
              botonDeshabilitado={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.unirseAQuiniela())}
            >
              {/* Unirse a una Quiniela */}
              Unirse a Quiniela Existente
            </BotonPrincipal>
            <BotonPrincipal
              botonDeshabilitado={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.crear())}
            >
              {/* Organiza una Quiniela */}
              Quinielas Administradas
            </BotonPrincipal>
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
    return this.loading(this.props.quinielas);
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  titulo: {
    padding: 20,
  },
  // cuerpo: {
  //   flex: 1,
  // },
  bottom: {
    padding: 10,
  },
  // viewImgStyle: {
  //   flex: 3,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // imgStyle: {
  //   height: 200,
  //   width: 200,
  // },
  // viewStyle: {
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

const mapStateToProps = state => {
  const tt = _.map(state.quinielas, (val, uid) => ({ ...val, uid }));
  const quinielas = _.orderBy(tt, ["nombreapuesta"], ["asc"]);
  // console.log(quinielas);
  return { quinielas };
};

export default connect(mapStateToProps, {
  buscarQuinielas,
  salir,
  irAdministradas,
  salirSistema
})(TusQuinielas);
