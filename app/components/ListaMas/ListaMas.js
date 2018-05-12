import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";

import { modificarquiniela } from "../../actions";
import color from "../../comun/colors";

class ListaMas extends Component {
  /*   touch(text) {
    alert(text);
  }
 */

  detalleQuiniela() {
    this.props.modificarquiniela(this.props.quiniela);
    this.props.navigation.navigate("Apuesta", {
      quiniela: this.props.quiniela,
      nav: this.props.nav
    });
  }

  borrarQuiniela() {
    this.props.navigation.navigate("EliminarQuiniela", {
      quiniela: this.props.quiniela,
      jugadores: this.props.jugadores,
      nav: this.props.nav
    });
  }

  render() {
    const { imagen, titulo } = this.props.menu;
    const {
      headerContentStyle,
      headerContentStyle1,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      thumbnailContainerStyle1
    } = styles;
    let action = "";
    let img = "";

    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={thumbnailContainerStyle}
            onPress={() => this.borrarQuiniela()}
          >
            <Image
              style={thumbnailStyle}
              source={require("../Logo/images/borrar1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>{titulo}</Text>
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
    height: 30,
    width: 30
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  }
};

const mapStateToProps = state => {
  const jugadores = state.jugadoresadmin;
  return { jugadores };
};

export default connect(mapStateToProps, { modificarquiniela })(
  withNavigation(ListaMas)
);
