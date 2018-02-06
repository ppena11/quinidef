import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

const Titulo = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.lateral} />
    <TouchableOpacity style={styles.centro}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
    <View style={styles.lateral} />
  </View>
);

export default Titulo;
