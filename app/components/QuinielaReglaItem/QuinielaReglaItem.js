import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import _ from "lodash";

import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { CardSectionText } from "../CardSectionText";

import color from "../../comun/colors";

import { cambiarEstatusQuiniela, modificarReglas } from "../../actions";

class QuinielaReglaItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      regla: {}
    };
  }

  onRowPress() {
    this.props.navigation.navigate("EliminarApuesta", {
      jugador: this.props.jugador,
      jugadores: this.props.jugadores,
      quiniela: this.props.quiniela,
      quinielan: this.props.quinielan,
      codigo: this.props.codigo
    });
  }

  onSubmit() {
    Keyboard.dismiss();
  }

  pressed(e) {
    const k = Number(e);
    if (!isNaN(k) && Number.isInteger(k)) {
      if (k >= 0) {
        //  console.log('GUARDALO');
        const re = this.props.reglas;
        //console.log(this.props.regla.uid);
        //console.log(re[this.props.regla.uid]);

        re[this.props.regla.uid].puntos = k;
        this.props.modificarReglas(re);
        //   console.log(re);
      }
    } else if (e == "") {
      //  console.log(this.props.regla.value.toString());
    }
    //  console.log();
    // this.props.modificarReglas(this.props.regla.key,e);
  }

  render() {
    const {
      headerContentStyleR,
      headerContentStyleL,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      switchStyle,
      input
    } = styles;

    return (
      <TouchableOpacity>
        <Card>
          <CardSectionText>
            <TouchableOpacity style={headerContentStyleR}>
              <Text style={headerTextStyle}>{this.props.regla.nombre}</Text>
            </TouchableOpacity>
            <View style={headerContentStyleL}>
              <TextInput
                style={input}
                selectionColor={color.$selectionColor}
                placeholderTextColor={color.$placeholderTextColor}
                underlineColorAndroid={color.$underlineColorAndroid}
                textAlign="center"
                placeholder={this.props.regla.puntos.toString()}
                maxLength={3}
                // value={this.props.regla.value.toString()}
                keyboardType="numeric"
                onSubmitEditing={() => this.onSubmit()}
                onChangeText={q => this.pressed(q)}
              />
            </View>
          </CardSectionText>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  headerContentStyleR: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: 250
  },
  input: {
    backgroundColor: color.$fondoBotonInput,

    fontSize: 16,
    color: color.$formInputBoxColor
  },
  headerContentStyleL: {
    flexDirection: "row",
    justifyContent: "center",

    width: 60
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle
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
    width: 25
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
  const reglas = state.creacionquinielas.reglas;
  return { jugadores, reglas };
};

export default connect(mapStateToProps, {
  cambiarEstatusQuiniela,
  modificarReglas
})(withNavigation(QuinielaReglaItem));
