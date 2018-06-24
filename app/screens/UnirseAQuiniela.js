import React, { Component } from "react";
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  Keyboard,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import firebase from "firebase";

import { Container } from "../components/Container";
import { BotonPrincipal } from "../components/BotonPrincipal";
import { Spinner } from "../components/Spinner";
import { HeaderText } from '../components/HeaderText';
import color from "../comun/colors";

import {
  buscarCodigos,
  buscarActivacionesDB,
  agregarJugador,
  buscarQuiniela,
  buscarAdmin,
  buscarQuinielasAdminQuiniela
} from "../actions";

class UnirseAQuiniela extends Component {
  static navigationOptions = {
    headerTitle: <HeaderText texto="Unirse a Grupo"/>,
  };

  constructor(props) {
    super(props);

    this.state = {
      inputfield: [],
      validando: false,
      botonesDeshabilitados: false
    };

    this.updateInputValue1 = this.updateInputValue1.bind(this);
    this.updateInputValue2 = this.updateInputValue2.bind(this);
    this.updateInputValue3 = this.updateInputValue3.bind(this);
    this.updateInputValue4 = this.updateInputValue4.bind(this);
    this.run = this.run.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    this.handleBackButton = this.handleBackButton.bind(this);
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 2999);
    funcion();
  }

  componentDidMount() {
    console.log("(UnirseAQuinielas) componentDidMount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    console.log("(UnirseAQuinielas) componentWillUnmount");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    this.props.navigation.goBack();
    return true;
  }

  run = async uid1 => {
    try {
      const test = await this.props.buscarCodigos(
        this.state.inputfield.join("").toUpperCase()
      );

      const items = test.toJSON();

      if (items != null && items.recibirAbonados) {
        const test1 = await this.props.buscarQuiniela(items.quinielaID);
        const items2 = test1.toJSON();

        const maxi = await this.props.buscarActivacionesDB(items2.torneoid);
        const max = maxi.toJSON();

        const quinielasAdmini = await this.props.buscarQuinielasAdminQuiniela(
          items.quinielaID,
          uid1
        );

        if (quinielasAdmini.toJSON() === null) {
          const test2 = await this.props.buscarAdmin(items2.admin);

          const items3 = test2.toJSON();
          //    console.log(`${items2.admin}`);
          //    console.log(`items 3 ${items3}`);

          this.props.navigation.navigate("RegistrarQuiniela", {
            quiniela: items2,
            admin: items3
          });
          this.setState({ validando: false });
        } else {
          if (Object.keys(quinielasAdmini.toJSON()).length < max) {
            const test2 = await this.props.buscarAdmin(items2.admin);

            const items3 = test2.toJSON();
            //    console.log(`${items2.admin}`);
            //    console.log(`items 3 ${items3}`);

            this.props.navigation.navigate("RegistrarQuiniela", {
              quiniela: items2,
              admin: items3
            });
            this.setState({ validando: false });
          } else {
            alert(
              // "No puedes registrar nuevos usuarios en esta quiniela, debes eliminar un usuario para crear otra apuesta"
              "No puedes crear más quinielas en este grupo, has alcanzado el máximo permitido"
            );
            this.setState({ validando: false });
          }
        }
      } else {
        this.setState({ validando: false });
        // alert("Por favor introduce un código válido de 4 caracteres");
        alert("Código inválido o no existente");
      }
    } catch (e) {
      //    console.log(e);
      this.setState({ validando: true });
    }
  };

  buscarCodigo(uid1) {
    if (!this.state.validando) {
      this.setState({ validando: true });
      Keyboard.dismiss();
      if (this.state.inputfield.join("").length >= 4) {
        this.run(uid1);
      } else {
        this.setState({ validando: false });
        // alert("Por favor introduce un código válido de 4 caracteres");
        alert("Código inválido o no existente");
      }
    }
  }

  generaCodigo() {
    const caracteresPosibles = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ]; // Combinaciones posibles: 1.679.616
    let codigo;
    codigo = this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    codigo += this.elementoAleatorio(caracteresPosibles);
    return codigo;
  }

  elementoAleatorio(array) {
    const max = array.length;
    const valorAleatorio = Math.floor(Math.random() * max);
    return array[valorAleatorio];
  }

  cancelar() {
    this.props.navigation.goBack();
  }

  updateInputValue1(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    let arr = [];
    arr = this.state.inputfield;
    arr[0] = t;
    //  console.log(`arr0000 : ${arr}`);
    this.setState({ inputfield: arr });
    // this.setState({ warning: 'no' });
    //   console.log(`ttttttttttttttttttttttttttt : ${t}`);
    //   console.log(`ttttttttttttttttttttttttttt : ${this}`);
    if (t != "") {
      this.focusNextField("two");
    }
  }

  updateInputValue2(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[1] = t;
    //   console.log(`arr1111 : ${arr}`);

    this.setState({ inputfield: arr });
    // console.log(`ttttttttttttttttttttttttttt : ${t}`);
    // console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
    if (t != "") {
      this.focusNextField("three");
    }
  }
  updateInputValue3(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[2] = t;
    // console.log(`arr22222 : ${arr}`);

    this.setState({ inputfield: arr });
    //  console.log(`ttttttttttttttttttttttttttt : ${t}`);
    //  console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
    if (t != "") {
      this.focusNextField("four");
    }
  }
  updateInputValue4(t) {
    // console.log('TEST');
    // navigate('CreaciondeQuiniela');
    // this.setState({ inputfield: t });
    // this.setState({ warning: 'no' });
    let arr = [];
    arr = this.state.inputfield;
    arr[3] = t;
    // console.log(`arr3333 : ${arr}`);

    this.setState({ inputfield: arr });
    //  console.log(`ttttttttttttttttttttttttttt : ${t}`);
    //  console.log(`ttttttttttttttttttttttttttt : ${this.state.inputfield}`);
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  status() {
    if (this.state.validando) {
      return <Spinner style={styles.buttonText} size="small" />;
    }
    return <Text style={styles.buttonText}>Validar código</Text>;
  }

  render() {
    // const { navigate } = this.props.navigation;
    // console.log(this.props.quiniela);
    //  console.log(`this.u2) ${this.u2}`);

    const { currentUser } = firebase.auth();
    let uid1 = currentUser.uid;
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />

        <View>
          <Text style={styles.texto}>
            Introduzca{"\n"}Código de Grupo:
          </Text>
        </View>

        <View style={styles.view1}>
          <View style={styles.container}>
            <TextInput
              onChangeText={t => this.updateInputValue1(t)}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("two");
              }}
              returnKeyType="next"
              style={styles.input}
              ref={input => {
                this.inputs.one = input;
              }}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              textAlign="center"
              autoCapitalize="characters"
              placeholder="X"
              maxLength={1}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              onChangeText={t => this.updateInputValue2(t)}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("three");
              }}
              returnKeyType="next"
              style={styles.input}
              ref={input => {
                this.inputs.two = input;
              }}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              textAlign="center"
              autoCapitalize="characters"
              placeholder="X"
              maxLength={1}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              onChangeText={t => this.updateInputValue3(t)}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField("four");
              }}
              returnKeyType="next"
              style={styles.input}
              ref={input => {
                this.inputs.three = input;
              }}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              textAlign="center"
              autoCapitalize="characters"
              placeholder="X"
              maxLength={1}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              onChangeText={t => this.updateInputValue4(t)}
              blurOnSubmit
              returnKeyType="done"
              style={styles.input}
              ref={input => {
                this.inputs.four = input;
              }}
              placeholderTextColor={color.$placeholderTextColor}
              underlineColorAndroid={color.$underlineColorAndroid}
              textAlign="center"
              autoCapitalize="characters"
              placeholder="X"
              maxLength={1}
              // onSubmitEditing={() => {
              //   this.buscarCodigo(uid1);
              // }}
            />
          </View>
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={styles.conta}>
            <View style={styles.vire} />
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.buscarCodigo(uid1))}
            >
              {this.status()}
            </TouchableOpacity>
            <View style={styles.vire} />
          </View>

          <View>
            <BotonPrincipal
              botonDeshabilitado={this.state.botonesDeshabilitados}
              onPress={() => this.evitaMultiTouches(() => this.cancelar())}
            >
              Cancelar
            </BotonPrincipal>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    margin: 10,
    width: "15%",
    borderColor: color.$inputContainerBorderColor,
    borderBottomWidth: 3,
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    color: color.$inputColor,
    fontSize: 25,
    fontWeight: "700",
    width: "100%",
  },
  titulo: {
    padding: 20,
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vire: {
    flex: 1,
  },
  texto: {
    fontSize: 20,
    color: color.$tituloTextColor,
    fontWeight: "300",
    textAlign: "center",
  },
  view1: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center",
  }
});

const mapStateToProps = state => ({
  error: state.codigos.codigoNoExiste,
  quiniela: state.codigos.quinielaID,
  aceptaAbonados: state.codigos.recibirAbonados
});

export default connect(mapStateToProps, {
  buscarQuiniela,
  buscarAdmin,
  buscarCodigos,
  agregarJugador,
  buscarActivacionesDB,
  buscarQuinielasAdminQuiniela
})(UnirseAQuiniela);
