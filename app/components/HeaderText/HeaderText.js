import React from "react";
import { Text } from "react-native";

import styles from "./styles";

const HeaderText = ({texto}) => (
  <Text style={styles.textElement}>
    {texto}
  </Text>
);

export default HeaderText;