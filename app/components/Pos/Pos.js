import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardT } from "../CardT";
import { CardSection } from "../CardSection";
import styles from "./styles";
import { iconos } from "../../comun/imagenes";

import { modificarquiniela, buscarHora, escribirHora } from "../../actions";

class Pos extends Component {
  constructor(props) {
    super(props);

    this.runh = this.runh.bind(this);
  }
  /*   touch(text) {
    alert(text);
  }
 */

  runh = async () => {
    try {
      const escribirHora = await this.props.escribirHora();
      const Hora = await this.props.buscarHora();
    } catch (e) {
      //   console.log(e);
      // this.setState({ validando: false });
    }
  };

  detalleQuiniela() {
    //this.props.modificarquiniela(this.props.posicion);
    this.runh();
    //console.log(this.props.navigation);
    this.props.navigation.navigate("DetallesPosiciones", {
      posicion: this.props.posicion
    });
  }
  render() {
    let styleUser = "";
    const {
      uid,
      nombreapuesta,
      activo,
      torneo,
      quinielaNombre,
      puntos,
      index
    } = this.props.posicion;
    const {
      headerContentStyle,
      headerTextStyle,
      thumbnailStyle,
      thumbnailContainerStyle,
      headerTextStyleUser,
      headerContentStyle1,
      headerContentStyle2
    } = styles;
    if (nombreapuesta == this.props.jugador) {
      styleUser = headerTextStyleUser;
    } else {
      styleUser = headerTextStyle;
    }
    return (
      <TouchableOpacity onPress={() => this.detalleQuiniela()}>
        <CardT>
          <View style={headerContentStyle}>
            <View style={headerContentStyle1}>
              <View style={thumbnailContainerStyle}>
                <Image
                  style={thumbnailStyle}
                  source={iconos['$lupa']}
                />
                <Text style={styleUser}>{`${index}`}</Text>
              </View>
            </View>
            <View style={headerContentStyle2}>
              <Text style={styleUser}>{nombreapuesta}</Text>
            </View>
            <View style={headerContentStyle1}>
              <Text style={styleUser}>{puntos}</Text>
            </View>
          </View>
        </CardT>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  modificarquiniela,
  buscarHora,
  escribirHora
})(withNavigation(Pos));
