import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './styles';

class Qxa extends Component {
  render() {
    const { quinielaNombre } = this.props.quiniela;
    return <Text>{quinielaNombre}</Text>;
  }
}

export default Qxa;
