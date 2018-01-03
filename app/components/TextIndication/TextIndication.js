import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const TextIndication = ({ description }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{description}</Text>
  </View>
);

TextIndication.propTypes = {
  description: PropTypes.string,
};

export default TextIndication;
