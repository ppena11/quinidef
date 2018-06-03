import EStyleSheet from "react-native-extended-stylesheet";
import color from "../../comun/colors";

export default EStyleSheet.create({
  textElement: {
    flex: 1,
    fontSize: 18,
    color: color.$headerTextColor,
    fontWeight: 'normal',
    textAlign: 'center'
  },
});
