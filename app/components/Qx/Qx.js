import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Card } from '../Card';
import { CardSection } from '../CardSection';
import styles from './styles';

class Qx extends Component {
  /*   touch(text) {
    alert(text);
  }
 */

  detalleQuiniela() {
    this.props.navigation.navigate('DetalleQuiniela', {
      quiniela: this.props.quiniela,
    });
  }
  render() {
    const {
      uid, nombreapuesta, activo, torneo, quinielaNombre,
    } = this.props.quiniela;
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
    } = styles;

    return (
      <TouchableOpacity onPress={() => this.detalleQuiniela()}>
        <Card>
          <CardSection>
            <View style={thumbnailContainerStyle}>
              <Image style={thumbnailStyle} source={require('../Logo/images/copa1.png')} />
            </View>
            <View style={headerContentStyle}>
              <Text style={headerTextStyle}>{nombreapuesta}</Text>
              <Text style={headerTextStyle2}>
                {torneo} - {quinielaNombre} - {activo ? 'Activado' : 'No Activado'}
              </Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(withNavigation(Qx));
