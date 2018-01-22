import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './styles';

class TorneoItem extends Component {
  render() {
    const { uid } = this.props.torneo;
    return <Text>{uid}</Text>;
  }
}

export default TorneoItem;
