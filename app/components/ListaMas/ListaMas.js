import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import { iconos } from "../../comun/imagenes";

import { modificarquiniela } from "../../actions";
import color from "../../comun/colors";

const ListaMas = ({ onPress, children, menu, botonDeshabilitado }) => (
  <TouchableOpacity
    disabled={botonDeshabilitado}
    onPress={onPress}
  >
    <Card onPress={onPress}>
      <CardSection onPress={onPress}>
        <TouchableOpacity
          style={styles.thumbnailContainerStyle}
          disabled={botonDeshabilitado}
          onPress={onPress}
        >
          <Image
            style={menu.imagen == 'basura' ? styles.dangerThumbnailStyle : styles.thumbnailStyle}
            source={iconos[`$${menu.imagen}`]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerContentStyle}
          disabled={botonDeshabilitado}
          onPress={onPress}
        >
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
    tintColor: color.$iconListaMas,
  },
  dangerThumbnailStyle: {
    height: 30,
    width: 30,
    tintColor: color.$iconDangerColor,
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  }
};
