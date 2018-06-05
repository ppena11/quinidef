import React from "react";
import { View } from "react-native";

import color from "../../comun/colors";

const CardT = props => (
  <View style={styles.containerStyle}>{props.children}</View>
);

const styles = {
  containerStyle: {
    elevation: 1,
    marginTop: 10
  }
};
export default CardT;
