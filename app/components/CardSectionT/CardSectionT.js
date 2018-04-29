import React from "react";
import { View, TouchableOpacity } from "react-native";

import color from "../../comun/colors";

const CardSectionT = ({ onPress, children }) => (
  <View onPress={onPress}>
    <View style={styles.containerStyle}>{children}</View>
  </View>
);

const styles = {
  containerStyle: {
    padding: 5,

    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: color.$cardSectionBorderColor,
    position: "relative"
  }
};
export default CardSectionT;
