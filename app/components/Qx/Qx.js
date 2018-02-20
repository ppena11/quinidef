import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { Card } from '../Card';
import { CardSection } from '../CardSection';
import styles from './styles';

class Qx extends Component {
  touch(text) {
    alert(text);
  }

  render() {
    const { uid, nick, status } = this.props.quiniela;
    const {
      headerContentStyle,
      headerTextStyle,
      headerTextStyle2,
      thumbnailStyle,
      thumbnailContainerStyle,
    } = styles;

    return (
      <TouchableOpacity onPress={() => this.touch(uid + " - " + nick)}>
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image style={thumbnailStyle} source={require('../Logo/images/copa1.png')} />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{uid}</Text>
            <Text style={headerTextStyle2}>{nick} - {status?"Activado":"No Activado"}</Text>
          </View>
        </CardSection>
      </Card>
      </TouchableOpacity>
    );
  }
}

export default Qx;
