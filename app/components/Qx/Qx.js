import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './styles';

class Qx extends Component {
  render() {
    const { name } = this.props.quiniela;
    return <Text>{name}</Text>;
  }
}

export default Qx;
