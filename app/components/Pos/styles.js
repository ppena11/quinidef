import EStyleSheet from "react-native-extended-stylesheet";
import color from "../../comun/colors";

export default EStyleSheet.create({
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerContentStyle1: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    padding: 12
  },
  headerContentStyle2: {
    flexDirection: "row",
    flex: 1,

    padding: 12
  },
  headerTextStyle: {
    fontSize: 12,
    color: color.$qxaHeaderTextStyle,

    textAlign: "center"
  },
  headerTextStyleUser: {
    fontSize: 12,
    color: color.$posiciones,

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
    flexDirection: "row"
  },
  thumbnailStyle: {
    height: 20,
    width: 20,
    marginRight: 24
  }
});
