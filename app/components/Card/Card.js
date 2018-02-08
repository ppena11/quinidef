import React from 'react';
import { View } from 'react-native';

import color from '../../comun/colors';

const Card = props => <View style={styles.containerStyle}>{props.children}</View>;

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: color.$cardBorderColor,
    borderBottomWidth: 0,
    shadowColor: color.$cardShadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};
export default Card;
