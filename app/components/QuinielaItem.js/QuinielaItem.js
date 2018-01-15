import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

class QuinielaItem extends Component {
  render() {
    return <Text>this.props.quiniela.nombre</Text>;
  }
}

export default QuinielaItem;
