import React from "react";
import { View, TouchableOpacity } from "react-native";

import color from "../../comun/colors";

const CardSection = ({ onPress, children }) => (
  <View onPress={onPress}>
    <View style={styles.containerStyle}>{children}</View>
  </View>
);

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,

    flexDirection: "row",
    borderColor: color.$cardSectionBorderColor
  }
};
export default CardSection;
