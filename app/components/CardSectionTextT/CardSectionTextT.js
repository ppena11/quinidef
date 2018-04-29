import React from "react";
import { View, TouchableOpacity } from "react-native";

import color from "../../comun/colors";

const CardSectionTextT = ({ onPress, children }) => (
  <View onPress={onPress}>
    <View style={styles.containerStyle}>{children}</View>
  </View>
);

const styles = {
  containerStyle: {
    padding: 10,

    justifyContent: "space-around",
    flexDirection: "row",
    borderColor: color.$cardSectionBorderColor,
    position: "relative"
  }
};
export default CardSectionTextT;
