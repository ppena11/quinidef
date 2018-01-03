import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const RecuperarContrasena = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

RecuperarContrasena.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func,
};

export default RecuperarContrasena;
