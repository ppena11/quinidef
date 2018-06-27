import React, { Component } from "react"
import {
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  View,
  BackHandler,
  Text
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { connect } from "react-redux"

import {
  buscarDetalleAdmin,
} from "../actions"
import { Container } from "../components/Container"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { Titulo } from "../components/Titulo"
import { QuinielaReglau } from "../components/QuinielaReglau"
import color from "../comun/colors"
import { Spinner } from "../components/Spinner"

class DatosAdmin extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = {
      menu: "yes",
      validando: false,
      admin: {}
    }
    this.run = this.run.bind(this)
    this.run2 = this.run2.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentDidMount() {
    this.run()

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    )

    console.log("(DatosAmin) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillUnmount() {
    this.setState({ validando: false })
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()

    console.log("(DatosAmin) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    console.log("(DatosAmin) handleBackButton")
    console.log("(DatosAmin) this.props ", this.props)
    this.props.screenProps.rootNavigation.goBack()
    // this.props.navigation.goBack();
    return true
  }

  cancelar() {
    this.props.navigation.goBack()
  }

  run = async () => {
    try {
      //   console.log(this.props.navigation.state.params.quiniela.uid);
      this.setState({ validando: true })
      const admin1 = await this.props.buscarDetalleAdmin(this.props.admin)
      const r1 = admin1.toJSON()
      this.setState({ admin: r1 })
      this.setState({ validando: false })
      // console.log(r1);
    } catch (e) {
      //    console.log(e);
      this.setState({ validando: false })
    }
  }

  run2 = async () => {
    try {
      this.setState({ validando: true })
      const test = await this.props.modifarReglasBD(
        this.props.quiniela.uid,
        this.props.reglast
      )
      //   console.log(test);
      this.run()
      this.setState({ validando: false })
      this.props.navigation.goBack()
    } catch (e) {
      //   console.log(e);
      this.setState({ validando: false })

      this.props.navigation.goBack()
    }
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" })
  }

  keyboardWillHide = () => {
    this.setState({ menu: "yes" })
  }

  // createDataSource({ quinielas }) {
  //   const ds = new ListView.DataSource({
  //    rowHasChanged: (r1, r2) => r1 !== r2,
  //   });
  //   this.dataSource = ds.cloneWithRows(quinielas);
  // }

  crear() {
    this.run2()
    // console.log('TEST');
    // navigate('EliminarApuesta');
  }

  tusquinielas() {
    // console.log('TEST2');
    this.run()
    this.props.navigation.goBack()
  }

  renderRow(regla) {
    return (
      <QuinielaReglau
        regla={regla}
        quiniela={this.props.quiniela.uid}
        quinielan={this.props.quiniela.quinielaNombre}
        codigo={this.props.quiniela.codigoq}
      />
    )
  }

  pressed(e) {
    Keyboard.dismiss()
  }

  // menustatus() {
  //   if (this.state.menu === "yes") {
  //     return (
  //       <View style={styles.bottom}>
  //         <View style={styles.conta}>
  //           <View style={styles.vire} />
  //           <TouchableOpacity
  //             style={styles.button}
  //             onPress={() => this.crear()}
  //           >
  //             {this.status()}
  //           </TouchableOpacity>
  //           <View style={styles.vire} />
  //         </View>

  //         <BotonPrincipal onPress={() => this.tusquinielas()}>
  //           Cancelar
  //         </BotonPrincipal>
  //       </View>
  //     );
  //   }
  //   return <View />;
  // }

  // status() {
  //   if (this.state.validando) {
  //     return <Spinner style={styles.buttonText} size="small" />;
  //   }
  //   return <Text style={styles.buttonText}>Guargar cambios..</Text>;
  // }

  loading(reglas) {
    if (this.state.validando) {
      return <Spinner size="large" />
    }
    return (
      <View>
        <Text style={styles.subText}>Nombre de usuario del administrador:</Text>
        <Text style={styles.subText}>{this.state.admin.nombre}</Text>
        <Text style={styles.subText}>
          Nombre del grupo: {this.props.quiniela.quinielaNombre}
        </Text>
        <Text style={styles.subText}>Torneo: {this.props.quiniela.torneo}</Text>
        <Text style={styles.subText}>
          Código del grupo: {this.props.quiniela.codigoq}
        </Text>
      </View>
    )
  }

  render() {
    //  const reglas = Object.keys(this.state.regla).map(key => ({
    //    key,
    //     value: this.state.regla[key]
    //    }));
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={color.$statusBarBackgroundColor}
        />
        <View style={styles.titulo}>
          <Titulo>Administrador</Titulo>
        </View>
        <View style={styles.form}>
          <View style={styles.cuerpo}>{this.loading()}</View>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <BotonPrincipal onPress={() => this.cancelar()}>
            Regresar
          </BotonPrincipal>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  form: {
    flex: 1,

    justifyContent: "space-between",
    flexDirection: "column"
  },
  titulo: {
    padding: 20
  },
  cuerpo: { flex: 1 },
  bottom: {
    padding: 20
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10
  },
  button: {
    flex: 8,
    backgroundColor: color.$fondoBotonPrincipal,
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 11
  },

  conta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  vire: {
    flex: 1
  },
  signupText: {
    color: color.$signupTextColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  },
  signupButton: {
    color: color.$signupButtonColor,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center"
  },
  subText: {
    fontSize: 13,
    fontWeight: "500",
    color: color.$formButtonTextColor,
    textAlign: "center"
  }
})
const mapStateToProps = state => {
  const reglast = state.creacionquinielas.reglas
  const reglas = Object.keys(reglast).map(key => ({
    key,
    value: reglast[key]
  }))

  return {
    quiniela: state.quini,
    admin: state.admin.admin
  }
}

export default connect(
  mapStateToProps,
  {
    buscarDetalleAdmin
  }
)(DatosAdmin)
