import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import color from '../../comun/colors';

const Buttonb = ({ onPress, children }) => {
  const { containerStyle, bottonStyle } = styles;
  return (
    <TouchableOpacity style={bottonStyle} onPress={onPress}>
      <Text style={containerStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    color: color.$buttonbColor,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.$buttonbBorderColor,
    marginLeft: 5,
    marginRight: 5,
  },
};
export default Buttonb;
