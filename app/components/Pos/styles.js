import EStyleSheet from "react-native-extended-stylesheet";
import color from "../../comun/colors";

export default EStyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerContentStyle1: {
    flex: 1,
    justifyContent: "center"
  },
  headerTextStyle: {
    fontSize: 16,
    color: color.$qxaHeaderTextStyle,
    padding: 12,
    textAlign: "center"
  },
  headerTextStyleUser: {
    fontSize: 16,
    color: color.$posiciones,
    padding: 12,
    textAlign: "center"
  },
  headerTextStyle2: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle2
  },
  thumbnailStyle: {
    fontSize: 18
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
