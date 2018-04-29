import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';
import color from '../../comun/colors';

const InputLetra = ({ onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholderTextColor={color.$placeholderTextColor}
      underlineColorAndroid={color.$underlineColorAndroid}
      textAlign="center"
      autoCapitalize="characters"
      placeholder="X"
      maxLength={1}
      onChangeText={onChangeText}
    />
  </View>
);

export default InputLetra;
