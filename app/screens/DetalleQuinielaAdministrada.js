import React, { Component } from "react"
import firebase from "firebase"
import {
  StatusBar,
  Keyboard,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  BackHandler,
  Switch
} from "react-native"
import { Spinner } from "../components/Spinner"
import EStyleSheet from "react-native-extended-stylesheet"
import _ from "lodash"
import { connect } from "react-redux"
import { NavigationActions, HeaderBackButton } from "react-navigation"
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
  buscarCodigos,
  manejarActivacion
} from "../actions"
import { Container } from "../components/Container"
import { BotonPrincipal } from "../components/BotonPrincipal"
import { CardSectionT } from "../components/CardSectionT"
import { Titulo } from "../components/Titulo"
import { QuinielaAdminItem } from "../components/QuinielaAdminItem"
import { HeaderText } from "../components/HeaderText"
import color from "../comun/colors"

class DetalleQuinielaAdministrada extends Component {
  static this2 = null
  constructor(props) {
    super(props)
    this.state = {
      cargo: false,
      toggled: false,
      actualizando: false,
      menu: "yes",
      refdb: firebase
        .database()
        .ref(
          `/quinielas/${this.props.navigation.state.params.quiniela.uid}/info/`
        ),
      refdbj: firebase
        .database()
        .ref(
          `/quinielas/${
            this.props.navigation.state.params.quiniela.uid
          }/clasificacion/`
        )
    }

    this.run1 = this.run1.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
    this2 = this
  }

  static navigationOptions = {
    headerTitle: <HeaderText texto="Administración de Grupo" />,
    headerLeft: (
      <HeaderBackButton
        onPress={() => this2.cancelar()}
        tintColor={color.$headerImageTintColor}
      />
    )
  }

  componentDidMount() {
    // Buscar los jugaroes de la quiniela y su estado
    // this.createDataSource(this.props);
    // const { quinielaNombre, torneo } = this.props.quiniela;
    // console.log(_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({ ...val, uid })));
    this.run1()
    this.props.buscarDisponibles(
      this.props.navigation.state.params.quiniela.uid,
      this.state.refdb
    )
    // this.props.buscarPorActivar(this.props.navigation.state.params.quiniela.uid);
    // this.props.buscarActivos(this.props.navigation.state.params.quiniela.uid);

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    )

    console.log("(DetalleQuinielaAdministrada) componentDidMount")
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }

  componentWillReceiveProps(nextProps) {
    // nextPropos are the next set of props that this componnet will receive
    // this.props is still the old set of props
    // this.createDataSource(nextProps);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove()
    this.keyboardWillHideListener.remove()
    this.state.refdb.off()
    this.state.refdbj.off()
    this.setState({ cargo: false })
    this.props.reloadingJugadores()

    console.log("(DetalleQuinielaAdministrada) componentWillUnmount")
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
  }

  handleBackButton() {
    this.cancelar()
    return true
  }

  run1 = async () => {
    try {
      //console.log(this.props.quiniela.quiniela);
      //console.log(this.props.quiniela.nombreapuesta);
      const escribirHora = await this.props.buscarCodigos(
        this.props.navigation.state.params.quiniela.codigoq
      )
      const wait = await this.props.buscarJugadoresAdministradas(
        this.props.navigation.state.params.quiniela.uid,
        this.state.refdbj
      )

      this.setState({ cargo: true })

      // console.log(r1);
    } catch (e) {
      //   console.log(e);
    }
  }

  keyboardWillShow = () => {
    this.setState({ menu: "no" })
  }

  keyboardWillHide = () => {
    this.setState({ menu: "yes" })
  }

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

  cancelar() {
    // this.props.reloadingJugadores();
    //this.props.navigation.goBack();
    // Este reset es para poder cargar nuevamente las quinielas por activar
    // en la pagina quinielas administradas
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "QuinielasAdministradas" })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  comprar() {
    // console.log('TEST2');
    // this.props.reloadingJugadores();

    this.props.navigation.navigate("SolicitarPagos")
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
    )
  }

  pressed(e) {
    Keyboard.dismiss()
  }

  filtrarJugadores(qi) {
    this.props.reloadingJugadores()
    this.props.BuscarJugadorTexto(qi)
    const text = this.props.buscarTexto

    if (qi.length > 0) {
      this.props.buscarJugadoresAdministradasT(
        qi,
        this.props.navigation.state.params.quiniela.uid
      )
    }
    if (qi.length == 0) {
      this.props.buscarJugadoresAdministradas(
        this.props.navigation.state.params.quiniela.uid
      )
    }
  }

  filterList() {
    let users = this.state.users
    const q = this.state.q

    users = users.filter(user => user.Name.toLowerCase().indexOf(q) != -1)
    this.setState({ filteredUsers: users })
  }

  handleLoadMore = () => {
    if (Object.keys(this.props.jugadores).length !== 0) {
      // console.log('Llego al finalllllllll');
      // console.log(`tamano llego al final ${Object.keys(this.props.quinielas).length}`);

      // console.log(this.props.quinielas);
      // this.props.buscarQuinielasAdministradasMax(this.props.ultima);

      if (this.props.llegoalfinal != "yes") {
        // console.log(this.props.quinielas);
        if (this.props.buscarTexto.length == 0) {
          this.props.buscarJugadoresAdministradasMax(
            this.props.ultima,
            this.props.navigation.state.params.quiniela.uid
          )
        } else {
          // console.log(`BUSCANDO MAS --- APUNTADOR ${this.props.ultima} ---- TEXTO --- ${
          //  this.props.buscarTexto
          // }`);
          this.props.buscarJugadoresAdministradasMaxT(
            this.props.ultima,
            this.props.buscarTexto,
            this.props.navigation.state.params.quiniela.uid
          )
        }
      }
    }

    // this.props.buscarQuinielasAdministradasMax(this.props.ultima);
  }

  run = async e => {
    try {
      // const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      // await Promise.all([someCall(), anotherCall()]);

      // const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1);
      // this.setState({ toggled: this.props.jugadores[uid].activo });
      // console.log(test);
      // console.log(this.props.navigation.state.params.quiniela.codigoq)
      // console.log(e)
      const test1 = await this.props.manejarActivacion(
        this.props.navigation.state.params.quiniela.codigoq,
        e
      )
      // console.log(test1)
      if (test1.committed) {
        const test = await this.props.buscarCodigos(
          this.props.navigation.state.params.quiniela.codigoq
        )

        // console.log(`TESXXXXXXXXXXXXXXXXXXXXXXXXXXXTTTTTTTTT ${test}`);
        this.setState({ actualizando: false })
      }

      // this.setState({ validando: false });
    } catch (e) {
      // console.log(e)
      // this.setState({ validando: false });
    }
  }

  pressed1(e) {
    if (!this.state.actualizando) {
      this.setState({ actualizando: true })
      if (e != this.props.codigos.recibirAbonados) {
        this.run(e)
      }
    }
  }

  menustatus() {
    if (this.state.menu === "yes") {
      return (
        <View>
          {/* <BotonPrincipal onPress={() => this.crear(navigate)}>Eliminar quiniela</BotonPrincipal> */}
          <BotonPrincipal onPress={() => this.comprar()}>
            Comprar Activaciones
          </BotonPrincipal>
          {/* <BotonPrincipal onPress={() => this.cancelar()}>
            Regresar
          </BotonPrincipal> */}
        </View>
      )
    }
    return <View />
  }

  activa() {
    if (this.state.cargo) {
      return (
        <View style={styles.cuerpo}>
          <CardSectionT>
            <TouchableOpacity style={styles.headerContentStyle1}>
              <Text style={styles.headerTextStyle11}>
                {`    Permitir nuevas quinielas`}
              </Text>
              <Switch
                style={styles.switchStyle}
                onValueChange={value => this.pressed1(value)}
                value={this.props.codigos.recibirAbonados}
              />
            </TouchableOpacity>
          </CardSectionT>
          <View style={styles.containerStyle}>
            {/* <TouchableOpacity
              onPress={() => this.onReglasPress()}
              style={styles.headerContentStyle}
            >
              <Text style={styles.headerTextStyle1}>COMPRADAS</Text>
              <Text style={styles.headerTextStyle}>
                {this.props.info.quinielasCompradas}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              // onPress={() => this.onReglasPress()}
              style={styles.headerContentStyle}
            >
              <Text style={styles.headerTextStyle1}>ACTIVAS</Text>
              <Text style={styles.headerTextStyle}>
                {this.props.info.quinielasActivos}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => this.onReglasPress()}
              style={styles.headerContentStyle}
            >
              <Text style={styles.headerTextStyle1}>POR ACTIVAR</Text>
              <Text style={styles.headerTextStyle}>
                {this.props.info.quinielasPorActivar}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerContentStyle}>
              <Text style={styles.headerTextStyle1}>DISPONIBLES</Text>
              <Text style={styles.headerTextStyle}>
                {this.props.info.quinielasDisponibles}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles2.conta}>
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
          </View> */}

          <FlatList
            data={this.props.jugadores}
            keyExtractor={item => item.uid}
            renderItem={({ item }) => this.renderRow(item)}
            //onEndReached={this.handleLoadMore}
            onEndReachedThershold={0}
            ref={ref => {
              this.listRef = ref
            }}
          />
        </View>
      )
    } else {
      return <Spinner size="small" />
    }
  }

  render() {
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle11,
      headerTextStyle1,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      cardSectionStyle,
      headerContentStyle1,
      containerStyle,
      switchStyle
    } = styles
    // console.log(this.state.cargo)

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
              {"\n"}Código:{" "}
              {this.props.navigation.state.params.quiniela.codigoq}
            </Titulo>
          </View>
          {this.activa()}
          {/*    <View style={containerStyle}>
            <Text headerTextStyle1>
              Codigo: {this.props.navigation.state.params.quiniela.codigoq}
            </Text>
          </View> */}
        </View>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    alignItems: "center"
  },
  headerContentStyle1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTextStyle11: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  switchStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },

  containerStyle: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  headerTextStyle: {
    fontSize: 16,
    color: color.$qxaHeaderTextStyle,
    alignContent: "center"
  },

  headerTextStyle1: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle,
    alignContent: "center",
    fontWeight: "500"
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  titulo: {
    padding: 1,
    marginTop: 5
  },
  cuerpo: {
    flex: 14
  },
  bottom: {
    flex: 2,
    padding: 10,
    justifyContent: "flex-end"
  },
  inputBox: {
    flex: 8,
    backgroundColor: color.$fondoBotonInput,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.$formInputBoxColor,
    marginVertical: 10
  }
})

const styles2 = EStyleSheet.create({
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
  }
})
const mapStateToProps = state => {
  const tt = _.map(state.jugadoresadmin, (val, uid) => ({ ...val, uid }))

  const jugadores = _.orderBy(tt, ["nombre"], ["asc"])
  // console.log(jugadores)
  return {
    jugadores,
    ultima: state.jugadorlast.last,
    llegoalfinal: state.jugadorlast.ultima,
    reload: state.jugadorlast.reload,
    mostrarMenus: state.jugadorlast.mostrarMenu,
    buscarTexto: state.jugadorlast.buscar,
    info: state.activacion,
    codigos: state.codigos
    // poractivar: state.activacion.poractivar,
    // activos: state.activacion.activos,
  }
}

export default connect(
  mapStateToProps,
  {
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
    buscarCodigos,
    manejarActivacion
  }
)(DetalleQuinielaAdministrada)
