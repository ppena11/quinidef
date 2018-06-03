import React, { Component } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"
import { connect } from "react-redux"
import { Card } from "../Card"
import { CardSection } from "../CardSection"
import { NavigationActions } from "react-navigation"

import { modificarquiniela, validarUsuario } from "../../actions"
import color from "../../comun/colors"

class Qx extends Component {
  constructor(props) {
    super(props)
    this.detalleQuiniela = this.detalleQuiniela.bind(this)
    this.state = {
      validando: false
    }
  }
  detalleQuiniela = async () => {
    this.setState({ validando: true })
    console.log(this.props.quiniela.quiniela)
    console.log(this.props.quiniela.nombreapuesta)
    const validarusuario1 = await this.props.validarUsuario(
      this.props.quiniela.quiniela,
      this.props.quiniela
    )
    this.setState({ validando: false })
    const r1 = validarusuario1.toJSON()
    console.log(`USUARIO EXISTE ${r1}`)
    if (!this.state.validando) {
      if (r1 !== null) {
        console.log(`SALTA.... ${r1}`)
        this.props.modificarquiniela(this.props.quiniela)
        this.props.navigation.navigate("Apuesta", {
          quiniela: this.props.quiniela
        })
      } else {
        // const resetAction = NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //      NavigationActions.navigate({
        //        routeName: "TusQuinielas"
        //      })
        //     ]
        //   })
        //   this.props.navigation.dispatch(resetAction)
      }
    } else {
      this.setState({ validando: false })
    }
  }

  borrarQuiniela() {
    this.props.navigation.navigate("EliminarQuiniela", {
      quiniela: this.props.quiniela,
      jugadores: this.props.jugadores
    })
  }

  render() {
    const {
      uid,
      nombreapuesta,
      activo,
      torneo,
      quinielaNombre
    } = this.props.quiniela
    const {
      headerContentStyle,
      headerContentStyle1,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      thumbnailContainerStyle1
    } = styles

    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={thumbnailContainerStyle}
            onPress={() => this.detalleQuiniela()}
          >
            <Image
              style={thumbnailStyle}
              source={require("../Logo/images/copa1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={headerContentStyle}
            onPress={() => this.detalleQuiniela()}
          >
            <Text style={headerTextStyle}>{nombreapuesta}</Text>
            <Text style={headerTextStyle2}>
              {torneo} - {quinielaNombre} -{" "}
              {activo ? "Activado" : "No Activado"}
            </Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  headerContentStyle: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  headerContentStyle1: {
    flex: 1,
    flexDirection: "column",
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
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  }
}

const mapStateToProps = state => {
  const jugadores = state.jugadoresadmin
  return { jugadores }
}

export default connect(mapStateToProps, { modificarquiniela, validarUsuario })(
  withNavigation(Qx)
)
