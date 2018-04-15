import React, { Component } from 'react';

import { Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import color from '../../comun/colors';

import { cambiarEstatusQuiniela, manejarDisponibles } from '../../actions';

class QuinielaAdminItem extends Component {
  constructor(props) {
    super(props);
    this.state = { toggled: false, actualizando: false };
  }

  onRowPress() {
    this.props.navigation.navigate('EliminarApuesta', {
      jugador: this.props.jugador,
      jugadores: this.props.jugadores,
      quiniela: this.props.quiniela,
      quinielan: this.props.quinielan,
      codigo: this.props.codigo,
    });
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    const {
      activo, puntos, nombre, uid,
    } = this.props.jugador;
    this.setState({ toggled: this.props.jugadores[uid].activo });
  }

  pressed(e) {
    if (this.props.info.quinielasDisponibles == 0 && e) {
      alert('Debes adquinir mas quinielas');
    } else {
      const {
        activo, puntos, nombre, uid, jid,
      } = this.props.jugador;
      if (!this.state.actualizando && !this.props.jugadores[uid].cargando) {
        this.setState({ actualizando: true });
        if (e != this.props.jugadores[uid].activo) {
          this.run(this.props.jugador, this.props.quiniela, e, uid);
        }
      }
    }
  }

  run = async (jug, qu, e1, uid) => {
    try {
      // const { currentUser } = firebase.auth();
      // this.setState({ validando: true });
      // await Promise.all([someCall(), anotherCall()]);

      // const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1);
      // this.setState({ toggled: this.props.jugadores[uid].activo });
      // console.log(test);
      const test1 = await this.props.manejarDisponibles(qu, e1);
      // console.log(test1);
      if (test1.committed) {
        const test = await this.props.cambiarEstatusQuiniela(jug, qu, e1, test1.snapshot.val());
        console.log(`TESXXXXXXXXXXXXXXXXXXXXXXXXXXXTTTTTTTTT ${test}`);
        this.setState({ toggled: this.props.jugadores[uid].activo });
        this.setState({ actualizando: false });
      }

      // this.setState({ validando: false });
    } catch (e) {
      // console.log(e);
      // this.setState({ validando: false });
    }
  };

  iconstatus(uid) {
    if (!this.props.jugadores[uid].activo) {
      return <Image style={styles.thumbnailStyle} source={require('../Logo/images/borrar1.png')} />;
    }
    return <Image style={styles.thumbnailStyle} />;
  }

  render() {
    const {
      activo, puntos, nombreapuesta, uid,
    } = this.props.jugador;
    // console.log(this.props.jugadores[uid].cargando);
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
            <Text style={headerTextStyle}>{nombreapuesta}</Text>
            <Switch
              style={switchStyle}
              onValueChange={value => this.pressed(value)}
              value={this.state.toggled}
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

export default connect(mapStateToProps, {
  manejarDisponibles,
  cambiarEstatusQuiniela,
})(withNavigation(QuinielaAdminItem));
