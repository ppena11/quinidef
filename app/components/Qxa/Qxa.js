import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './styles';

class Qxa extends Component {
  render() {
    const { name } = this.props.quiniela;
    return <Text>{name}</Text>;
  }
}

export default Qxa;
