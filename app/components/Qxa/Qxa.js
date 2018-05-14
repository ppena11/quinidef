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

import { buscarDisponiblesq } from "../../actions";

class Qxa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disponibles: ""
    };
    this.run = this.run.bind(this);
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
            onPress={() => this.borrar()}
          >
            <Image
              style={thumbnailStyle}
              source={require("../Logo/images/borrar1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>
              {quinielaNombre} - Código: {codigoq}
            </Text>
            <Text style={headerTextStyle2}>{torneo}</Text>
          </TouchableOpacity>
        </CardSection>
        <CardSectionText>
          <TouchableOpacity
            onPress={() => this.onRowPress()}
            style={headerContentStyle}
          >
            <Text style={headerTextStyle}>
              Por activar: {quinielasPorActivar}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onReglasPress()}
            style={headerContentStyle}
          >
            <Text style={headerTextStyle}>Modificar reglas</Text>
          </TouchableOpacity>
        </CardSectionText>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  headerContentStyle1: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  cardSectionStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative"
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle
  },
  headerTextStyle1: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle
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
    marginLeft: 10,
    marginRight: 10
  }
};

const mapStateToProps = state => ({
  disponibles: state.disponible.disponibles,
  quinielasadmin: state.quinielasadmin
});

export default connect(mapStateToProps, {
  buscarDisponiblesq
})(withNavigation(Qxa));
