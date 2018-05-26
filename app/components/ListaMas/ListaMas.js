import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { iconos } from "../../comun/imagenes";

import { modificarquiniela } from "../../actions";
import color from "../../comun/colors";

const ListaMas = ({ onPress, children, menu }) => (
  <TouchableOpacity onPress={onPress}>
    <Card onPress={onPress}>
      <CardSection onPress={onPress}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.thumbnailContainerStyle}
        >
          <Image
            style={styles.thumbnailStyle}
            source={iconos[`$${menu.imagen}`]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{menu.titulo}</Text>
        </TouchableOpacity>
      </CardSection>
    </Card>
  </TouchableOpacity>
);

export default ListaMas;

const styles = {
  headerContentStyle: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    justifyContent: "center",
    alignItems: "center"
  },
  thumbnailStyle: {
    height: 30,
    width: 30,
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  }
};
