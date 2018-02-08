import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import { Buttonb } from '../Buttonb';
import color from '../../comun/colors';

class Qxa extends Component {
  render() {
    const { quinielaNombre, torneo } = this.props.quiniela;
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
    } = styles;
    return (
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={require('../Logo/images/copa1.png')} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{quinielaNombre}</Text>
            <Text style={headerTextStyle2}>{torneo}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Buttonb onPress={() => console.log(quinielaNombre)}>Configurar...</Buttonb>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
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
export default Qxa;
