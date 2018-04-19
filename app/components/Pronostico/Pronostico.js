import React from 'react';
import { View, Image, Text, TextInput } from 'react-native';

import { Card } from '../Card';
// import banderas from '../../images/banderas/';
import { pais3letras } from '../../comun/pais';
import styles from './styles';
import color from '../../comun/colors';

const Pronostico = props => (
  <View style={styles.container}>
    <View style={styles.containerFecha}>
      <Text style={styles.fecha}>{`${props.grupoFase} - ${props.fecha}`}</Text>
    </View>
    <View style={styles.containerNombreEquipos}>
      <Text style={styles.text}>{pais3letras(props.equipoA)}</Text>
      <Text style={styles.text}>{pais3letras(props.equipoB)}</Text>
    </View>
    <View style={styles.containerBanderasMarcadores}>
      <View style={styles.containerImageA}>
        <Image style={styles.image} source={banderas[`$${props.equipoA}`]} />
      </View>
      <View style={styles.containerMarcador}>
        <TextInput
          style={styles.marcador}
          selectionColor={color.$selectionColor}
          placeholderTextColor={color.$placeholderTextColor}
          underlineColorAndroid={color.$underlineColorAndroid}
          textAlign="center"
          maxLength={2}
          keyboardType="numeric"
        />
        <Text />
        <TextInput
          style={styles.marcador}
          selectionColor={color.$selectionColor}
          placeholderTextColor={color.$placeholderTextColor}
          underlineColorAndroid={color.$underlineColorAndroid}
          textAlign="center"
          maxLength={2}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.containerImageB}>
        <Image style={styles.image} source={banderas[`$${props.equipoB}`]} />
      </View>
    </View>
  </View>
);

export default Pronostico;
