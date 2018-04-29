import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import styles from "./styles";
import { modificarquiniela } from "../../actions";

class PosicionesItem extends Component {
  /*   touch(text) {
    alert(text);
  }
 */

  detalleQuiniela() {
    this.props.modificarquiniela(this.props.posicion);
    this.props.navigation.navigate("Apuesta", {
      posicion: this.props.posicion
    });
  }
  render() {
    const {
      uid,
      nombreapuesta,
      activo,
      torneo,
      quinielaNombre,
      puntos
    } = this.props.posicion;
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle
    } = styles;

    return (
      <TouchableOpacity onPress={() => this.detalleQuiniela()}>
        <Card>
          <CardSection>
            <View style={thumbnailContainerStyle}>
              <Text
                style={thumbnailStyle}
                source={require("../Logo/images/copa1.png")}
              >
                {puntos}
              </Text>
            </View>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{nombreapuesta}</Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { modificarquiniela })(
  withNavigation(PosicionesItem)
);
