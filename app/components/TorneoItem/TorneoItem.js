import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './styles';

class TorneoItem extends Component {
  render() {
    const { info } = this.props.torneo;
    return <Text>{info.nombre}</Text>;
  }
}

export default TorneoItem;
