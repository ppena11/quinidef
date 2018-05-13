import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Card } from "../Card";
import { CardSection } from "../CardSection";
import banderas from "../../components/Logo/images/banderas";

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
            source={banderas[`$${menu.imagen}`]}
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
    alignItems: "flex-start"
  },
  headerContentStyle1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTextStyle: {
    fontSize: 18,
    color: color.$qxaHeaderTextStyle,
    justifyContent: "center",
    alignItems: "center"
  },
  switchStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  headerTextStyle2: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2
  },
  thumbnailStyle: {
    height: 30,
    width: 30
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  }
};
