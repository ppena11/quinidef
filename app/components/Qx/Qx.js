import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { modificarquiniela } from "../../actions";
import color from "../../comun/colors";

class Qx extends Component {

  detalleQuiniela() {
    this.props.modificarquiniela(this.props.quiniela);
    this.props.navigation.navigate("Apuesta", {
      quiniela: this.props.quiniela
    });
  }

  borrarQuiniela() {
    this.props.navigation.navigate("EliminarQuiniela", {
      quiniela: this.props.quiniela,
      jugadores: this.props.jugadores
    });
  }

  render() {
    const {
      uid,
      nombreapuesta,
      activo,
      torneo,
      quinielaNombre
    } = this.props.quiniela;
    const {
      headerContentStyle,
      headerContentStyle1,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      thumbnailContainerStyle1
    } = styles;

    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={thumbnailContainerStyle}
            onPress={() => this.detalleQuiniela()}
          >
            <Image
              style={thumbnailStyle}
              source={require("../../images/logosTorneos/worldcup.png")}
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
    );
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
    marginRight: 5,
  }
};

const mapStateToProps = state => {
  const jugadores = state.jugadoresadmin;
  return { jugadores };
};

export default connect(mapStateToProps, { modificarquiniela })(
  withNavigation(Qx)
);
