import React, { Component } from 'react';
import { Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import color from '../../comun/colors';

import { cambiarEstatusQuiniela } from '../../actions';

class QuinielaAdminItem extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false };
  }

  onRowPress() {
    this.props.navigation.navigate('EliminarApuesta', {
      jugador: this.props.jugador,
      jugadores: this.props.jugadores,
      quiniela: this.props.quiniela,
      quinielan: this.props.quinielan,
      codigo: this.props.codigo,
    });
  }

  componentDidMount() {
    const {
      activo, puntos, nombre, uid,
    } = this.props.jugador;
    this.setState({ toggled: this.props.jugadores[uid].activo });
  }

  pressed(e) {
    const {
      activo, puntos, nombre, uid, jid,
    } = this.props.jugador;
    this.props.cambiarEstatusQuiniela(this.props.jugador, this.props.quiniela, e);

    this.setState({ toggled: this.props.jugadores[uid].activo });
  }

  iconstatus(uid) {
    if (!this.props.jugadores[uid].activo) {
      return <Image style={styles.thumbnailStyle} source={require('../Logo/images/borrar1.png')} />;
    }
    return <Image style={styles.thumbnailStyle} />;
  }

  render() {
    const {
      activo, puntos, nombre, uid,
    } = this.props.jugador;

    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      switchStyle,
    } = styles;

    return (
      <Card>
        <CardSection>
          <TouchableOpacity style={thumbnailContainerStyle} onPress={() => this.onRowPress()}>
            {this.iconstatus(uid)}
          </TouchableOpacity>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>{nombre}</Text>
            <Switch
              style={switchStyle}
              onValueChange={value => this.pressed(value)}
              value={this.props.jugadores[uid].activo}
            />
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextStyle2: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2,
  },
  thumbnailStyle: {
    height: 25,
    width: 25,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
};

const mapStateToProps = (state) => {
  const jugadores = state.jugadoresadmin;
  return { jugadores };
};

export default connect(mapStateToProps, { cambiarEstatusQuiniela })(withNavigation(QuinielaAdminItem));
