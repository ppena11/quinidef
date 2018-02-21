import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import color from '../../comun/colors';

const CardSection = props => (
  <TouchableOpacity>
    <View style={styles.containerStyle}>{props.children}</View>
  </TouchableOpacity>
);

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,

    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: color.$cardSectionBorderColor,
    position: 'relative',
  },
};
export default CardSection;
