import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import styles from "./styles";
import { modificarquiniela } from "../../actions";

class Pos extends Component {
  /*   touch(text) {
    alert(text);
  }
 */

  detalleQuiniela() {
    //this.props.modificarquiniela(this.props.posicion);
    console.log(this.props.navigation);
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
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      headerTextStyleUser,
      headerContentStyle1,
      headerContentStyle2
    } = styles;
    if (uid == this.props.jugador) {
      styleUser = headerTextStyleUser;
    } else {
      styleUser = headerTextStyle;
    }
    return (
      <TouchableOpacity onPress={() => this.detalleQuiniela()}>
        <Card>
          <View style={headerContentStyle}>
            <View style={headerContentStyle2}>
              <View style={thumbnailContainerStyle}>
                <Image
                  style={thumbnailStyle}
                  source={require("../../comun/images/banderas1/lupa.png")}
                />
                <Text style={styleUser}>{`  ${index}`}</Text>
              </View>
            </View>

            <View style={headerContentStyle1}>
              <Text style={styleUser}>{nombreapuesta}</Text>
            </View>
            <View style={styles.headerContentStyle1}>
              <Text style={styleUser}>{puntos}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { modificarquiniela })(
  withNavigation(Pos)
);
