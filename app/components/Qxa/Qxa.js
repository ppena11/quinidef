import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import { CardSectionText } from '../CardSectionText';
import { Buttonb } from '../Buttonb';
import color from '../../comun/colors';

class Qxa extends Component {
  onRowPress() {
    this.props.navigation.navigate('DetalleQuinielaAdministrada', {
      quiniela: this.props.quiniela,
    });
  }

  onReglasPress() {
    this.props.navigation.navigate('ReglasAdmin', {
      quiniela: this.props.quiniela,
    });
  }

  render() {
    const { quinielaNombre, torneo, codigoq } = this.props.quiniela;

    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
      cardSectionStyle,
      headerContentStyle1,
    } = styles;
    return (
      <Card>
        <CardSection>
          <TouchableOpacity onPress={() => this.onRowPress()} style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={require('../Logo/images/copa1.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>
              {quinielaNombre} - Código: {codigoq}
            </Text>
            <Text style={headerTextStyle2}>{torneo}</Text>
          </TouchableOpacity>
        </CardSection>
        <CardSectionText>
          <TouchableOpacity style={headerContentStyle}>
            <Text style={headerTextStyle}>Activaciones: 1/41</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onReglasPress()} style={headerContentStyle}>
            <Text style={headerTextStyle}>Modificar reglas</Text>
          </TouchableOpacity>
        </CardSectionText>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerContentStyle1: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
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
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

export default withNavigation(Qxa);
