import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

const TituloTusQuinielas = ({ children }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.centro}>
      <Text style={styles.text}>Nombre</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.centro}>
      <Text style={styles.text}>Usuario</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.centro}>
      <Text style={styles.text}>Posicion</Text>
    </TouchableOpacity>
  </View>
);

export default TituloTusQuinielas;
