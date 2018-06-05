import EStyleSheet from "react-native-extended-stylesheet";
import color from "../../comun/colors";

export default EStyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContentStyle1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  headerContentStyle2: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  headerTextStyle: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle,
    textAlign: "center",
  },
  headerTextStyleUser: {
    fontSize: 12,
    color: color.$posiciones,
    textAlign: "center",
  },
  thumbnailContainerStyle: {
    flexDirection: "row",
  },
  thumbnailStyle: {
    height: 20,
    width: 20,
    marginRight: 5,
    tintColor: color.$iconLupa,
  },
});
