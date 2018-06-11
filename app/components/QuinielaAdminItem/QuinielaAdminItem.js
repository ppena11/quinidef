import React, { Component } from "react"

import { Text, View, Image, Switch, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import { connect } from "react-redux"
import _ from "lodash"

import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { iconos } from "../../comun/imagenes";
import color from "../../comun/colors";

import {
  cambiarEstatusQuiniela,
  manejarDisponibles,
  buscarDisponibles,
  validarUsuario,
  reloadingJugadores
} from "../../actions"

class QuinielaAdminItem extends Component {
  constructor(props) {
    super(props)    
    this.state = {
      toggled: false,
      actualizando: false,
      botonesDeshabilitados: false
    }
    this.run = this.run.bind(this)
    this.onRowPress = this.onRowPress.bind(this)
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 4999);
    funcion();
  }

  detalleQuiniela(qu) {
    //this.props.reloadingJugadores()
    // this.props.irAdministradas();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "QuinielasAdministradas" })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onRowPress = async () => {
    const validarusuario1 = await this.props.validarUsuario(
      this.props.quiniela,
      this.props.jugador
    )
    const r1 = validarusuario1.toJSON()
    console.log(`USUARIO EXISTE {r1}`)
    if (r1 !== null) {
      this.props.navigation.navigate("EliminarApuesta", {
        jugador: this.props.jugador,
        jugadores: this.props.jugadores,
        quiniela: this.props.quiniela,
        quinielan: this.props.quinielan,
        codigo: this.props.codigo
      })
    }
  }

  componentDidMount() {
    const { activo, puntos, nombre, uid } = this.props.jugador
    // console.log(this.props.jugador)
    this.setState({ toggled: this.props.jugadores[uid].activo })
  }

  pressed(e) {
    // console.log(this.props.disponibles["quinielasDisponibles"]);
    // console.log(this.props.disponibles);
    // if (this.props.info.quinielasDisponibles == 0 && e) {
      if (this.props.disponibles["quinielasDisponibles"] <= 0 && e) {
      alert("Debes adquirir más quinielas");
    } else {
      const { activo, puntos, nombre, uid, jid } = this.props.jugador
      if (!this.state.actualizando && !this.props.jugadores[uid].cargando) {
        this.setState({ actualizando: true })
        if (e != this.props.jugadores[uid].activo) {
          this.setState({ toggled: this.props.jugadores[uid].activo })
          this.run(this.props.jugador, this.props.quiniela, e)
        }
      }
    }
  }

  run = async (jug, qu, e1) => {
    try {
      // const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      // await Promise.all([someCall(), anotherCall()]);

      // const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1);
      // this.setState({ toggled: this.props.jugadores[uid].activo });
      // console.log(test);
      // console.log(qu)
      // console.log(jug.nombreapuesta)

      const validarusuario1 = await this.props.validarUsuario(qu, jug)
      const r1 = validarusuario1.toJSON()
      // console.log(r1)
      if (r1 !== null) {
        const test1 = await this.props.manejarDisponibles(qu, e1)
        // console.log(test1);
        if (test1.committed) {
          const test = await this.props.cambiarEstatusQuiniela(
            jug,
            qu,
            e1,
            test1.snapshot.val()
          )
          // console.log(`TESXXXXXXXXXXXXXXXXXXXXXXXXXXXTTTTTTTTT ${test}`);
          this.setState({ actualizando: false })
        }
      } else {
        this.props.buscarDisponibles(qu)
        this.detalleQuiniela(qu)
      }

      // this.setState({ validando: false });
    } catch (e) {
      // console.log(e)
      // this.setState({ validando: false });
    }
  }

  iconstatus(uid) {
    if (!this.props.jugadores[uid].activo) {
      return (
        <Image
          style={styles.thumbnailStyle}
          source={iconos['$basura']}
        />
      )
    }
    return <View />
  }

  render() {
    const { activo, puntos, nombreapuesta, uid } = this.props.jugador
    // console.log(this.props.jugadores[uid].cargando);
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      switchStyle
    } = styles

    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={thumbnailContainerStyle}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.onRowPress())}
          >
            {this.iconstatus(uid)}
          </TouchableOpacity>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>{nombreapuesta}</Text>
            <Switch
              style={switchStyle}
              onValueChange={value => this.pressed(value)}
              value={this.props.jugadores[uid].activo}
            />
          </TouchableOpacity>
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  headerContentStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    justifyContent: "center",
    alignItems: "center"
  },
  switchStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  headerTextStyle2: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2
  },
  thumbnailStyle: {
    height: 25,
    width: 25,
    tintColor: color.$iconDangerColor,
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  }
}

const mapStateToProps = state => {
  const jugadores = state.jugadoresadmin
  const disponibles = state.activacion
  return { jugadores, disponibles }
}

export default connect(mapStateToProps, {
  manejarDisponibles,
  cambiarEstatusQuiniela,
  buscarDisponibles,
  validarUsuario,
  reloadingJugadores
})(withNavigation(QuinielaAdminItem))
