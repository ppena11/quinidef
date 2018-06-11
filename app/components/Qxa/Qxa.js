import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import firebase from "firebase";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { CardSectionText } from "../CardSectionText";
import { Buttonb } from "../Buttonb";
import color from "../../comun/colors";
import { iconos } from "../../comun/imagenes";

import { buscarDisponiblesq } from "../../actions";

class Qxa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disponibles: "",
      botonesDeshabilitados: false
    };
    this.run = this.run.bind(this);
  }

  evitaMultiTouches = (funcion) => {
    this.setState({botonesDeshabilitados: true});
    setTimeout(() => {
      this.setState({botonesDeshabilitados: false});
    }, 2999);
    funcion();
  }

  onRowPress() {
    this.props.navigation.navigate("DetalleQuinielaAdministrada", {
      quiniela: this.props.quiniela
    });
  }

  borrar() {
    this.props.navigation.navigate("EliminarQuinielaAdministrada", {
      quiniela: this.props.quiniela
    });
  }

  componentDidMount() {
    // Buscar los jugaroes de la quiniela y su estado
    // this.createDataSource(this.props);
    // const { quinielaNombre, torneo } = this.props.quiniela;
    // console.log(_.map(this.props.navigation.state.params.quiniela.Users, (val, uid) => ({ ...val, uid })));
    this.run();
  }

  componentWillUnmount() {
    const { quinielaNombre, torneo, codigoq, quinielaID } = this.props.quiniela;
  }

  run = async () => {
    try {
      const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      const {
        quinielaNombre,
        torneo,
        codigoq,
        quinielaID
      } = this.props.quiniela;

      // const test = await this.props.buscarDisponiblesq(this.props.quiniela);
      // const tt1 = test.toJSON();
      // console.log(`TESTTTTTSTSTSTS ${test}`);
      // this.setState({ disponibles: tt1 });
      // this.setState({ validando: false });
    } catch (e) {
      //   console.log(e);
      // this.setState({ validando: false });
    }
  };

  onReglasPress() {
    this.props.navigation.navigate("ReglasAdmin", {
      quiniela: this.props.quiniela
    });
  }

  render() {
    const {
      quinielaNombre,
      torneo,
      codigoq,
      quinielaID,
      quinielasDisponibles,
      quinielasPorActivar
    } = this.props.quiniela;
    // console.log(this.props.quinielasadmin[quinielaID]);
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      cardSectionStyle,
      headerContentStyle1
    } = styles;
    return (
      <Card>
        <CardSection>
          <TouchableOpacity
            style={thumbnailContainerStyle}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.borrar())}
          >
            <Image
              style={thumbnailStyle}
              source={iconos['$basura']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={headerContentStyle}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.onRowPress())}
          >
            <Text style={headerTextStyle}>{quinielaNombre}</Text>
            <Text style={headerTextStyle2}>{torneo} - Código: {codigoq}</Text>
          </TouchableOpacity>
        </CardSection>
        <CardSectionText>
          <TouchableOpacity
            style={headerContentStyle}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.onRowPress())}
          >
            <Text style={headerTextStyle}>
              Por activar: {quinielasPorActivar}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={headerContentStyle}
            disabled={this.state.botonesDeshabilitados}
            onPress={() => this.evitaMultiTouches(() => this.onReglasPress())}
          >
            <Text style={headerTextStyle}>
              Modificar reglas
            </Text>
          </TouchableOpacity>
        </CardSectionText>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  headerContentStyle1: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  cardSectionStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
  },
  headerTextStyle1: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
  },
  headerTextStyle2: {
    fontSize: 13,
    color: color.$qxaHeaderTextStyle2,
  },
  thumbnailStyle: {
    height: 30,
    width: 30,
    tintColor: color.$iconDangerColor,
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 10,
  }
};

const mapStateToProps = state => ({
  disponibles: state.disponible.disponibles,
  quinielasadmin: state.quinielasadmin
});

export default connect(mapStateToProps, {
  buscarDisponiblesq
})(withNavigation(Qxa));
