import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
    color: '#fff',
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
    borderColor: '#00244f',
    marginLeft: 5,
    marginRight: 5,
  },
};
export default Buttonb;
