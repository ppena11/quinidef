import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

const BotonPrincipal = ({ onPress, children }) => (
  <View style={styles.container}>
    <View style={styles.lateral} />
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
    <View style={styles.lateral} />
  </View>
);

export default BotonPrincipal;
